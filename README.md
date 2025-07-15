# ClientScope

## An AI-powered Client Evaluation and Screening Platform

---

## Use Case

ClientScope helps consultancies and professional services firms to **systematically track, evaluate, and manage potential clients**.

When a company receives inbound requests or proactively targets new clients, ClientScope provides a single dashboard to:

- Store client profiles
- Record screening decisions (Approved, Under Review, Declined)
- Analyze industry distribution of leads
- Monitor potential revenue pipeline
- Maintain transparency and consistency in evaluation

---

## Why

Traditional client onboarding often happens in spreadsheets and scattered documents, making it difficult to maintain a consistent process. ClientScope solves this by:

- Centralizing client data
- Providing real-time status tracking
- Generating analytics on industries and revenue
- Ensuring standardized evaluation criteria
- Laying the foundation for compliance and due diligence

---

## Technologies Used

**Frontend**

- React (JavaScript) — UI rendering
- Chakra UI — Component styling
- React Router — Navigation

**Backend**

- Express.js — REST API server (or FastAPI if preferred)
- Node.js — Runtime
- PostgreSQL — Relational database

**Other Tools**

- Docker — Containerization
- OpenAI API — AI-based scoring or insights (planned)
- Supabase (optional) — Authentication or database

---

## Future Possibilities & Integrations

ClientScope is designed to evolve. Possible future enhancements include:

- Integration with CRM tools (Salesforce, HubSpot)
- AI-powered lead scoring and risk assessment
- Automated due diligence workflows
- Google Drive / Dropbox file ingestion for RFPs
- Email parsing for inbound requests
- Role-based access control and audit logs
- Slack notifications on client status changes

---

## Installation

### Prerequisites

- Node.js >= 18.x
- npm or yarn
- PostgreSQL instance (or Supabase)
- Docker (optional)

### Steps

1. Clone the repository by running `git clone https://github.com/your-org/ClientScope.git` and change into the project directory.
2. Navigate to the `server` folder and install backend dependencies using `npm install`.
3. Navigate to the `client` folder and install frontend dependencies using `npm install`.
4. In the `server` folder, create a `.env` file and set environment variables such as:

   - `OPENAI_KEY=your-key`
   - `(OPTIONAL) SUPABASE_PROJ_PASS=your-project-password`
   - `SUPABASE_KEY=your-anon`
   - `SUPABASE_URL=your-url`

5. Start the backend server by running `node index.js` inside the `server` folder.
6. In a new terminal, navigate to the `client` folder and start the frontend with `npm start`.
7. Open your browser and visit [http://localhost:3000](http://localhost:3000).

---

## Contact

Pranit Singh Gandhi

For issues, feature requests, or contributions, please open an issue or submit a pull request on GitHub.
