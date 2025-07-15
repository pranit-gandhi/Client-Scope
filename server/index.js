const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const OpenAI = require("openai");
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const upload = multer(); // Keep files in memory
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.use(cors());
app.use(express.json());

app.post("/create-client-base", upload.array("files"), async (req, res) => {
  const { clientName } = req.body;

  if (!clientName || !clientName.trim()) {
    return res.status(400).json({ error: "Client name is required." });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded." });
  }

  const safeClientName = clientName.trim().replace(/[^a-zA-Z0-9_-]/g, "_");

  const results = [];

  for (const file of req.files) {
    const { originalname, buffer, mimetype } = file;

    const uniqueFilename = `client-bases/${safeClientName}/${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}-${originalname}`;

    const { error: storageError } = await supabase.storage
      .from("client-documents")
      .upload(uniqueFilename, buffer, {
        contentType: mimetype,
      });

    if (storageError) {
      console.error("Supabase upload error:", storageError);
      return res.status(500).json({ error: "Error uploading to Supabase." });
    }

    let extractedText = "";
    try {
      if (originalname.endsWith(".pdf")) {
        const pdfData = await pdfParse(buffer);
        extractedText = pdfData.text;
      } else if (originalname.endsWith(".docx")) {
        const result = await mammoth.extractRawText({ buffer });
        extractedText = result.value;
      } else {
        extractedText = "Unsupported file type.";
      }
    } catch (error) {
      console.error("Text extraction error:", error);
      extractedText = "Error extracting text.";
    }

    const paragraphs = extractedText.split(/\n\s*\n/).filter((p) => p.trim());
    const chunks = [];
    let currentChunk = "";

    for (const paragraph of paragraphs) {
      if ((currentChunk + paragraph).length < 10000) {
        currentChunk += paragraph + "\n\n";
      } else {
        if (currentChunk) chunks.push(currentChunk);
        currentChunk = paragraph + "\n\n";
      }
    }
    if (currentChunk) chunks.push(currentChunk);

    console.log(`Splitting into ${chunks.length} chunk(s)`);

    let allTexts = [];

    for (const [i, chunk] of chunks.entries()) {
      allTexts.push(`--- CHUNK ${i + 1}/${chunks.length} ---\n${chunk}`);
    }

    const fullTextToAnalyze = allTexts.join("\n\n");

    let summary = "";
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        temperature: 0.0,
        messages: [
          {
            role: "system",
            content: `
You are a senior consulting analyst. Your job is to extract **highly structured, critical information** about companies from their profiles or pitch decks.

You **must always respond with a valid JSON object** matching the EXACT schema shown below.
For each field, you **must only choose ONE of the predefined permitted values** exactly as written (no free text).

**Permitted Values:**

BusinessModelClarity: Clear, Moderate, Unclear  
MarketSizeEstimate: Large, Medium, Small  
CompetitiveDifferentiation: Strong, Moderate, Weak  
RevenueTraction: High, Medium, Low  
ClientConcentrationRisk: High Risk, Moderate Risk, Low Risk  
TeamCapability: Strong Team, Average Team, Weak Team  
OperationalScalability: High Scalability, Medium Scalability, Low Scalability  
TechnologyMaturity: Mature, Developing, Nascent  
RegulatoryExposure: High Exposure, Moderate Exposure, Low Exposure  
SupplyChainDependencies: High Dependency, Moderate Dependency, Low Dependency  
FundingStatus: Well Funded, Underfunded, Unknown  
PartnershipEcosystem: Strong Network, Average Network, Weak Network  
CustomerValidation: Validated, Partial Validation, No Validation  
GoToMarketStrategy: Clear Plan, Partial Plan, No Plan  
RisksAndRedFlags: Major Risks, Some Risks, No Risks

**Return only the following JSON object, with each field populated using one of the permitted values above:**

{
  "BusinessModelClarity": "",
  "MarketSizeEstimate": "",
  "CompetitiveDifferentiation": "",
  "RevenueTraction": "",
  "ClientConcentrationRisk": "",
  "TeamCapability": "",
  "OperationalScalability": "",
  "TechnologyMaturity": "",
  "RegulatoryExposure": "",
  "SupplyChainDependencies": "",
  "FundingStatus": "",
  "PartnershipEcosystem": "",
  "CustomerValidation": "",
  "GoToMarketStrategy": "",
  "RisksAndRedFlags": ""
}
            `,
          },
          {
            role: "user",
            content: `
Analyze the following combined content and return a single JSON object exactly as specified above, using only the permitted values:

${fullTextToAnalyze}
            `,
          },
        ],
      });

      summary = completion.choices[0].message.content;
    } catch (error) {
      console.error("OpenAI error:", error);
      summary = "Error generating summary.";
    }

    let summaryJson = null;
    try {
      summaryJson = JSON.parse(summary);
    } catch {
      console.warn("Summary could not be parsed as JSON.");
      summaryJson = { raw: summary };
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from("client-documents")
      .getPublicUrl(uniqueFilename);

    const publicUrl = publicUrlData.publicUrl;

    const { error: insertError } = await supabase.from("client_files").insert([
      {
        client_name: safeClientName,
        file_name: originalname,
        storage_path: uniqueFilename,
        public_url: publicUrl,
        summary_json: summaryJson,
      },
    ]);

    if (insertError) {
      console.error("Error inserting metadata into Supabase:", insertError);
    }

    results.push({
      filename: originalname,
      summary: summaryJson,
      filePath: uniqueFilename,
      publicUrl,
    });
  }

  res.json({
    clientName,
    files: results,
  });
});

app.get("/api/clients", async (req, res) => {
  // List "folders" in the client-bases directory
  const { data, error } = await supabase.storage
    .from("client-documents")
    .list("client-bases", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error: "Failed to fetch clients" });
  }

  if (!data) {
    return res.json([]);
  }

  // Each folder has name and id=null
  const folders = data.filter((item) => item.id === null);

  const clients = folders.map((folder) => ({
    id: folder.name,
    name: folder.name,
  }));

  res.json(clients);
});

app.get("/api/client/:clientId/files", async (req, res) => {
  const { clientId } = req.params;

  // Fetch metadata from the client_files table
  const { data: dbData, error: dbError } = await supabase
    .from("client_files")
    .select("*")
    .eq("client_name", clientId)
    .order("created_at", { ascending: true });

  if (dbError) {
    console.error("Supabase DB error:", dbError);
    return res
      .status(500)
      .json({ error: "Failed to fetch client file metadata." });
  }

  // If no files found, return empty
  if (!dbData || dbData.length === 0) {
    return res.json([]);
  }

  // Map each record into what your frontend expects
  const files = dbData.map((record) => ({
    id: record.id,
    file_name: record.file_name,
    public_url: record.public_url,
    summary_json: record.summary_json,
  }));

  res.json(files);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
