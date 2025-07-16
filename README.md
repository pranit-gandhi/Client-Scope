# ClientScope

## What Problem We’re Solving

Consulting and due diligence teams spend countless hours reviewing client documents—pitch decks, RFPs, company profiles—and manually extracting structured insights to evaluate viability, financial metrics, and business details. This process is slow, inconsistent, and highly resource-intensive.

## Our Idea

ClientScope is an AI-powered platform that streamlines this entire workflow:

- Users can **upload multiple client documents** (PDFs, DOCX) through a simple drag-and-drop interface.
- The backend uses **OpenAI GPT-4** to automatically extract:
  - Concise summaries
  - Detailed structured information (industry, revenue, business model, SWOT analysis, KPIs, etc.)
  - Viability recommendations
- Files are stored securely in **Supabase Storage** and metadata (JSON summaries) is saved to a Supabase database.
- Users can manage their knowledge base of clients, track approval status, and view key performance metrics in a unified dashboard.

In essence, we combine document storage, AI summarization, and consulting workflows into one platform.

## Tech Stack

- **Frontend:**

  - React + Vite
  - Chakra UI (for modern UI components)
  - Axios (API calls)

- **Backend:**
  - Node.js + Express
  - Multer (file uploads)
  - pdf-parse & mammoth (text extraction)
  - OpenAI GPT-4 API
  - Supabase (storage and metadata database)

## Impact of the Solution

ClientScope:

- **Reduces review time** per client profile from hours to minutes.
- **Improves consistency** and quality of insights extracted.
- Enables consulting teams to **scale up** their capacity without proportionally increasing headcount.
- Provides a **centralized dashboard** to track clients, document statuses, and decision metrics, enhancing collaboration and transparency.

In the long run, this solution empowers firms to serve more clients, deliver faster turnarounds, and focus human expertise where it matters most.
