import express from 'express';
import cors from 'cors';
import { TWidgetStatus } from '@eloquentai/types';

import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { Document } from '@langchain/core/documents';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { createStuffDocumentsChain } from '@langchain/classic/chains/combine_documents';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(cors());
app.use(express.json());

// Initialize Gemini Model
const model = new ChatGoogleGenerativeAI({
  model: 'gemini-3-pro-preview',
  maxOutputTokens: 2048,
  thinkingConfig: {
    thinkingLevel: 'LOW',
  }
});

// Initialize Vector Store
const vectorStore = new MemoryVectorStore(new GoogleGenerativeAIEmbeddings());

// Add sample documents
// @Note: This data is not complete, it's just for testing purposes
const documents = [
  {
    id: "eloquent_funding_002",
    pageContent: "Eloquent AI raised a $7.4 million seed round led by Foundation Capital to accelerate the deployment of AI Operators. The round was 12x oversubscribed and closed in 3 days. Other investors include EJF Capital, Duke Capital Partners, Zeno Ventures, and Y Combinator. This capital is dedicated to building the 'future operating system for financial services'.",
    metadata: {
      source_url: "https://www.eloquentai.co/fundraising",
      title: "Fundraising and Investors",
      category: "Corporate Profile",
      tags: ["funding", "investors", "seed round", "Foundation Capital"]
    }
  },

  // --- PRODUCT: FIXER ---
  {
    id: "prod_fixer_001",
    pageContent: "Fixer is the first enterprise-grade AI agent for customer service that delivers human-quality support at scale. It autonomously resolves up to 96% of customer inquiries. Key capabilities include: 1) Taking action (updating CRMs, processing refunds, triggering workflows), 2) Self-healing (optimizing performance via Evals Framework), and 3) Enterprise security. It is designed to reduce live agent workload and improve first-contact resolution.",
    metadata: {
      source_url: "https://www.eloquentai.co/",
      title: "Product: Fixer",
      category: "Products",
      tags: []
    }
  },

  // --- PRODUCT: CLOSER ---
  {
    id: "prod_closer_001",
    pageContent: "Closer is an AI Sales Representative designed to turn inbound inquiries into qualified sales opportunities. It operates 24/7 to engage leads instantly, achieving up to a 36% uplift in conversions. Features include: 1) Answering product questions and handling objections, 2) Booking meetings in real-time, 3) Deep CRM integration for personalized context, and 4) Responses grounded 100% in business data to prevent hallucinations.",
    metadata: {
      source_url: "https://www.eloquentai.co/",
      title: "Product: Closer",
      category: "Products",
      tags: []
    }
  },

  // --- PRODUCT: NAVIGATOR ---
  {
    id: "prod_navigator_001",
    pageContent: "Navigator is a 24/7 Customer Co-Pilot focused on onboarding, training, and retention. It turns customers into power users by walking them through features and resolving setup issues. It remembers user preferences to personalize interactions and proactively nudges customers toward re-engagement. It uses the self-healing engine to identify knowledge gaps in support strategies.",
    metadata: {
      source_url: "https://www.eloquentai.co/",
      title: "Product: Navigator",
      category: "Products",
      tags: []
    }
  },

  // --- PRODUCT: CUSTOM AGENTS & TASKPRO ---
  {
    id: "prod_custom_001",
    pageContent: "Eloquent AI offers Custom Agents and 'TaskPro' (their first operator) to automate niche workflows. The platform allows enterprises to design and deploy custom agents using low-code tools or prebuilt templates. It supports deep customization via APIs and SDKs, enabling integration with legacy banking cores. TaskPro performs thousands of actions daily for banks and insurers.",
    metadata: {
      source_url: "https://www.eloquentai.co/",
      title: "Custom Agents and TaskPro",
      category: "Products",
      tags: []
    }
  },

  // --- TECHNICAL ARCHITECTURE: ORATIO ---
  {
    id: "tech_oratio_001",
    pageContent: "Eloquent AI agents are powered by 'Oratio', a proprietary multimodal LLM trained specifically for regulated financial workflows. Variants include 'Oratio Fin' for banking compliance and 'Oratio Life'. Unlike general LLMs, Oratio is grounded in financial regulations to ensure auditable decision-making and minimize hallucinations in high-stakes environments.",
    metadata: {
      source_url: "https://www.eloquentai.co/fundraising",
      title: "Oratio LLM",
      category: "Technology",
      tags: ["Oratio", "LLM", "Financial Model", "Proprietary AI"]
    }
  },

  // --- TECHNICAL ARCHITECTURE: SELF-HEALING ---
  {
    id: "tech_selfhealing_001",
    pageContent: "The Self-Healing Engine ensures continuous performance improvement without manual intervention. It utilizes 1) Simulations (Sims) to stress-test agents pre-launch, 2) Evaluations (Evals) to audit decisions against policy, and 3) Reinforcement Learning to optimize logic over time. It performs 'Topic Confusion Analysis' and 'Gap Analysis' to autonomously flag missing knowledge or conflicting SOPs.",
    metadata: {
      source_url: "https://www.eloquentai.co/resources/self-healing-ai-agents-the-future-of-enterprise-automation",
      title: "Self-Healing Engine",
      category: "Technology",
      tags: []
    }
  },

  // --- TECHNICAL ARCHITECTURE: DEPLOYMENT ---
  {
    id: "tech_deployment_001",
    pageContent: "Deployment barriers like inconsistent accuracy and data fragmentation are addressed via the 'Knowledge Transformation Layer', which ingests and structures existing SOPs into an operational blueprint. The platform supports 'No-Code' integration for CRMs and 'Low-Code' tools for bespoke workflows. A 'Multi-Agent' structure (Clarification, Reasoning, Validation agents) ensures reliability.",
    metadata: {
      source_url: "https://www.eloquentai.co/resources/deploying-and-scaling-enterprise-ai-agents",
      title: "Deployment Strategy",
      category: "Technology",
      tags: []
    }
  },

  // --- COMMERCIAL MODEL: PRICING ---
  {
    id: "comm_pricing_001",
    pageContent: "Eloquent AI utilizes a 'Pay for Success' pricing model. Customers pay only for tangible outcomes (e.g., resolved issue, booked meeting). If the AI fails to resolve the issue and escalates to a human, the vendor absorbs the cost. This model aligns incentives, eliminates the risk of 'paying twice' for failed automation, and drives a reported 4x cost reduction.",
    metadata: {
      source_url: "https://www.eloquentai.co/resources/pay-for-success-how-outcome-based-pricing-is-revolutionizing-customer-support",
      title: "Pay for Success Pricing",
      category: "Commercial",
      tags: []
    }
  },

  // --- SECURITY & COMPLIANCE ---
  {
    id: "sec_compliance_001",
    pageContent: "Security features include: 1) No training on client data, 2) PII encryption in transit and at rest with customizable redaction, 3) Private deployment options (VPC/On-premise), and 4) Comprehensive Audit Trails that log every decision logic for Consumer Duty compliance. Bespoke guardrails ensure the AI stays on-topic and compliant.",
    metadata: {
      source_url: "https://www.eloquentai.co/",
      title: "Security and Compliance",
      category: "Security",
      tags: []
    }
  }
];

// Initialize vector store with documents
// TODO: This is really a REAAAAALY bad implementation, but it's just for testing purposes, so I dont care enough to fix it :D
(async () => {
  await vectorStore.addDocuments(documents.map(doc => new Document({ pageContent: doc.pageContent, metadata: doc.metadata })));
  console.log('Sample documents added to vector store');
})();

app.get('/status', (req, res) => {
  const statuses: TWidgetStatus[] = ['online', 'offline', 'maintenance'];
  const status = process.env.WIDGET_STATUS || statuses[Math.floor(Math.random() * statuses.length)];

  res.json({ status });
});

app.post('/chat/:session/message', async (req, res) => {
  console.log('Received message:', req.body);

  try {
    const { message } = req.body;
    // Ignore session as requested

    // Retrieve relevant documents
    const retriever = vectorStore.asRetriever();
    const relevantDocs = await retriever.invoke(message);

    // Create prompt template
    const prompt = ChatPromptTemplate.fromTemplate(`
      Answer the following question based only on the provided context:

      <context>
      {context}
      </context>

      Question: {question}
    `);

    // Create chain
    const chain = await createStuffDocumentsChain({
      llm: model,
      prompt,
      outputParser: new StringOutputParser(),
    });

    // Set headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Generate response stream
    const stream = await chain.stream({
      context: relevantDocs,
      question: message,
    });

    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify({ content: chunk, finished: false })}\n\n`);
    }

    res.write(`data: ${JSON.stringify({ content: null, finished: true })}\n\n`);
    res.end();

  } catch (error) {
    console.error('Error processing chat request:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.end();
    }
  }
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
