import cors from "cors";
import "dotenv/config";
import express from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isDatabaseConfigured, supabase, toDemoRequest, toLead } from "./db.js";
import { isEmailConfigured, sendProjectRequestEmail } from "./email.js";

const app = express();
const port = process.env.PORT || 4174;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "..", "dist");

app.use(cors());
app.use(express.json());

const leads = [
  {
    id: "lead-001",
    business: "Northline Dental",
    contact: "Dr. Mira Shah",
    category: "Healthcare",
    status: "Interested",
    lastTouch: "2026-05-20",
    useCase: "Automate intake, appointment reminders, and AI-assisted FAQ responses."
  },
  {
    id: "lead-002",
    business: "Cedar Law Group",
    contact: "Avery Chen",
    category: "Legal",
    status: "Opened",
    lastTouch: "2026-05-22",
    useCase: "Client intake assistant, document triage, and case status workflows."
  },
  {
    id: "lead-003",
    business: "Market Lane Grocers",
    contact: "Sam Patel",
    category: "Retail",
    status: "Drafted",
    lastTouch: "2026-05-24",
    useCase: "Inventory alerts, staff scheduling, and local promotion campaigns."
  }
];

const demoRequests = [];

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "BrazenBox API",
    database: isDatabaseConfigured ? "supabase" : "memory",
    email: isEmailConfigured ? "resend" : "not_configured"
  });
});

app.get("/api/leads", async (_req, res) => {
  if (!isDatabaseConfigured) {
    return res.json({ leads });
  }

  const { data, error } = await supabase
    .from("outreach_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ error: "Could not load outreach leads." });
  }

  res.json({ leads: data.map(toLead) });
});

app.post("/api/demo-requests", async (req, res) => {
  const { name, email, businessType, useCase } = req.body;

  if (!name || !email || !businessType || !useCase) {
    return res.status(400).json({ error: "Missing required demo request fields." });
  }

  if (isDatabaseConfigured) {
    const { data, error } = await supabase
      .from("demo_requests")
      .insert({
        name,
        email,
        business_type: businessType,
        use_case: useCase
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: "Could not save demo request." });
    }

    return res.status(201).json({ request: toDemoRequest(data) });
  }

  const request = {
    id: `request-${Date.now()}`,
    name,
    email,
    businessType,
    useCase,
    createdAt: new Date().toISOString()
  };

  demoRequests.unshift(request);
  res.status(201).json({ request });
});

app.post("/api/start-project", async (req, res) => {
  const { name, email, organization, project } = req.body;

  if (!name || !email || !project) {
    return res.status(400).json({ error: "Name, email, and project details are required." });
  }

  const businessType = organization || "V2 project request";
  const useCase = [
    "V2 Start a Project request",
    organization ? `Organization: ${organization}` : "Organization: Not provided",
    "",
    project
  ].join("\n");

  let request;

  if (isDatabaseConfigured) {
    const { data, error } = await supabase
      .from("demo_requests")
      .insert({
        name,
        email,
        business_type: businessType,
        use_case: useCase
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: "Could not save project request." });
    }

    request = toDemoRequest(data);
  } else {
    request = {
      id: `request-${Date.now()}`,
      name,
      email,
      businessType,
      useCase,
      createdAt: new Date().toISOString()
    };

    demoRequests.unshift(request);
  }

  const emailResult = await sendProjectRequestEmail({ name, email, organization, project });

  res.status(201).json({
    request,
    email: emailResult
  });
});

app.post("/api/cold-email", async (req, res) => {
  const { business, recipient, useCase } = req.body;

  if (!business || !recipient || !useCase) {
    return res.status(400).json({ error: "Business, recipient, and use case are required." });
  }

  if (isDatabaseConfigured) {
    const { data, error } = await supabase
      .from("outreach_leads")
      .insert({
        business,
        contact: recipient,
        category: "Local business",
        status: "Queued",
        use_case: useCase
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: "Could not save outreach lead." });
    }

    return res.status(201).json({ lead: toLead(data) });
  }

  const lead = {
    id: `lead-${Date.now()}`,
    business,
    contact: recipient,
    category: "Local business",
    status: "Queued",
    lastTouch: new Date().toISOString().slice(0, 10),
    useCase
  };

  leads.unshift(lead);
  res.status(201).json({ lead });
});

if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`BrazenBox listening on http://127.0.0.1:${port}`);
});
