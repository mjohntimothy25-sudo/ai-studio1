/* ==========================================================================
   AI MODEL HUB DATA - PROMPT ENGINEERING MASTERCLASS & TEMPLATES LIBRARY
   Contains 15+ Enterprise Ready-to-Use Prompt Templates
   ========================================================================== */

const PROMPT_TECHNIQUES_DATA = [
  {
    id: "system-persona",
    title: "1. System Instructions & Persona Prompting",
    desc: "Set the foundational identity, knowledge boundary, behavioral constraints, and response tone of the AI prior to user interaction.",
    image: "images/prompt_engineering.jpg",
    systemPrompt: "Act as a Senior AI Solutions Architect with 15 years of cloud experience. Your answers must be rigorous, precise, and formatted in clean GitHub Markdown with code blocks and bullet points. Never guess API parameters.",
    userPrompt: "How should I design a high-throughput RAG pipeline for 100,000 PDF documents?",
    whyItWorks: "Assigning a specific persona enforces domain expertise, professional tone, and eliminates generic conversational filler.",
    guardrails: "Strict Markdown formatting, no assumptions, production-ready recommendations."
  },
  {
    id: "zero-shot",
    title: "2. Zero-Shot Direct Prompting",
    desc: "Directly asking the model to perform a task without giving any prior examples or exemplars.",
    systemPrompt: "You are an executive summary assistant. Summarize technical documents concisely into 3 high-impact bullet points.",
    userPrompt: "Summarize this article: 'Transformer models utilize self-attention mechanisms to process tokens in parallel, replacing sequential recurrent neural networks and enabling scaling to hundreds of billions of parameters.'",
    whyItWorks: "Fast and effective for standard, well-defined tasks where the LLM already possesses strong pre-trained parametric knowledge.",
    guardrails: "Clear task directive, output length constraints, direct action verb."
  },
  {
    id: "zero-vs-few-shot",
    title: "3. Few-Shot Exemplar Prompting",
    desc: "Providing concrete input-output exemplars inside the prompt dramatically increases accuracy on complex formatting and classification tasks.",
    systemPrompt: "Classify incoming customer feedback into Sentiment (Positive/Negative/Neutral) and Department (Billing/Tech Support/Sales). Output strictly valid JSON.",
    userPrompt: `Examples:
Input: "My credit card was charged twice for the monthly subscription!"
Output: {"sentiment": "Negative", "department": "Billing"}

Input: "Is there a student discount for annual plans?"
Output: {"sentiment": "Neutral", "department": "Sales"}

Input: "The new API endpoints are blazing fast, amazing work!"
Output: {"sentiment": "Positive", "department": "Tech Support"}

Now classify this input:
"The database connection keeps timing out during peak migration hours."`,
    whyItWorks: "Few-shot examples teach the AI exact syntactic patterns, JSON keys, and output edge cases without retraining the model.",
    guardrails: "Valid JSON schema, exact key matching, deterministic classification."
  },
  {
    id: "chain-of-thought",
    title: "4. Chain-of-Thought (CoT) Reasoning",
    desc: "Instructing the model to 'think step-by-step' forces it to output intermediate logical reasoning before committing to a final answer.",
    systemPrompt: "You are a competitive programming coach. Before outputting the code solution, explicitly write out your step-by-step reasoning in a <thinking> tag.",
    userPrompt: "Given an array of integers, find contiguous subarray with the largest sum. Explain your approach step-by-step, then write the algorithm in Python.",
    whyItWorks: "Breaks complex logic down sequentially, reducing mathematical errors and hallucinated code assumptions by 40%+.",
    guardrails: "Explicit <thinking> block, algorithmic complexity analysis (O(N) time), edge case handling."
  },
  {
    id: "rag-prompting",
    title: "5. Contextual / RAG Ingestion Prompting",
    desc: "Structure retrieved document chunks inside clear context tags to prevent the LLM from relying on stale pre-trained parametric memory.",
    systemPrompt: "You are a factual legal Q&A assistant. Answer the user question STRICTLY using the context snippets provided below inside <context></context> tags. If the answer cannot be found in the context, respond with 'Information not available in provided records.' Do NOT invent facts.",
    userPrompt: `<context>
Snippet [1] (Document: Employee_Policy_2026.pdf):
"Full-time employees receive 20 days of paid annual leave. Vacation requests exceeding 5 consecutive days require supervisor sign-off at least 14 days in advance."

Snippet [2] (Document: Remote_Work_FAQ.pdf):
"Remote employees are eligible for a $50 monthly internet stipend processed on the last Friday of every month."
</context>

User Question: How many days in advance must I request a 7-day vacation, and what is the internet stipend?`,
    whyItWorks: "Clear delimiters (<context>) and strict anti-hallucination guardrails guarantee grounded answers with exact citations.",
    guardrails: "Zero hallucination fallback rule, strict inline citations [1], [2]."
  },
  {
    id: "output-guardrails",
    title: "6. Structured Output & Schema Prompting",
    desc: "Enforcing Pydantic / Zod JSON schema validation and regex rules to guarantee machine-readable AI outputs for automated software APIs.",
    systemPrompt: "You are an automated code audit bot. Output ONLY valid JSON adhering to the following schema. Do NOT include markdown codeblocks or conversational text.",
    userPrompt: `{
  "type": "object",
  "properties": {
    "vulnerabilities": {
      "type": "array",
      "items": {
        "properties": {
          "severity": {"type": "string", "enum": ["CRITICAL", "HIGH", "MEDIUM", "LOW"]},
          "file": {"type": "string"},
          "line": {"type": "integer"},
          "recommendation": {"type": "string"}
        }
      }
    }
  }
}

Audit this snippet:
eval(req.body.user_script);`,
    whyItWorks: "Guarantees downstream code parsers receive deterministic, machine-readable JSON without manual regex stripping.",
    guardrails: "Strict JSON validation, enum enforcement, zero markdown wrapping."
  },
  {
    id: "negative-constraints",
    title: "7. Negative & Constraint Prompting",
    desc: "Explicitly declaring boundaries for what the AI MUST NOT mention, assume, output, or use in its response.",
    systemPrompt: "You are a simplified science tutor for kids.",
    userPrompt: "Explain quantum superposition to a 10-year-old child.\nConstraints:\n- DO NOT use mathematical equations or symbols.\n- DO NOT use technical jargon (like 'wavefunction collapse' or 'Hilbert space').\n- Keep the explanation under 80 words.",
    whyItWorks: "Prevents unwanted complexity, dangerous content, off-topic tangents, and overly lengthy responses.",
    guardrails: "Strict exclusion rules, length ceiling, simplicity constraint."
  },
  {
    id: "agent-react",
    title: "8. Autonomous Agent ReAct Prompting",
    desc: "Empowering AI Agents to interleave reasoning (<thought>) with real-world tool execution JSON (<action>).",
    systemPrompt: "You are an Autonomous Research Agent operating in a ReAct (Reason + Act) loop.",
    userPrompt: `Goal: Find the latest 2026 stock price of Nvidia and compute total value of 50 shares.
1. Output intermediate thought: <thought>Need Nvidia current stock price</thought>
2. Output tool action: <action>{"tool": "web_search", "query": "Nvidia stock price 2026"}</action>
3. Wait for observation, then compute final answer in <final_answer> tag.`,
    whyItWorks: "Enables multi-turn autonomous tool execution, web search, and code execution loops.",
    guardrails: "Explicit ReAct loop tags, valid tool JSON format."
  }
];

// Expanded Ready-to-Use Prompt Library Templates (15 Templates)
const PROMPT_LIBRARY_DATA = [
  {
    id: "pl-1",
    title: "Python FastAPI Async Refactoring",
    category: "coding",
    categoryName: "💻 Coding & Refactoring",
    desc: "Refactor legacy synchronous Python code into high-throughput async FastAPI endpoints.",
    prompt: `Act as a Principal Python Backend Engineer. 
Refactor the following synchronous REST API controller into asynchronous Python using FastAPI, httpx, and asyncpg.
Ensure:
1. Full type hint annotations (Pydantic v2 schemas).
2. Proper try/except exception handling with HTTP 400/500 error responses.
3. Connection pool connection reuse.
4. Inline docstrings explaining async choices.`
  },
  {
    id: "pl-2",
    title: "RAG Anti-Hallucination System Prompt",
    category: "architecture",
    categoryName: "🏗️ System Architecture",
    desc: "Strict enterprise prompt preventing LLM hallucinations when querying PDF vector bases.",
    prompt: `You are an AI Document Intelligence Bot. 
Answer the user's question STRICTLY using the context passages provided in <context></context> blocks.
Rules:
- Do NOT use outside knowledge or assumption.
- If the context does not contain the answer, reply ONLY: "Information not found in provided documentation."
- Cite every statement using inline brackets like [Document_Name.pdf, Page X].`
  },
  {
    id: "pl-3",
    title: "FLUX.1 Photorealistic UI Dashboard Art",
    category: "image",
    categoryName: "🎨 Image Gen",
    desc: "Generate stunning futuristic dark mode application interfaces.",
    prompt: `A high-end modern dark UI desktop dashboard mockup for a cybersecurity monitoring application. 
Deep dark navy background, glowing neon blue and cyan graphs, glassmorphic card panels, crisp readable typography, futuristic software visualizer, 8k resolution, photorealistic studio lighting --ar 16:9`
  },
  {
    id: "pl-4",
    title: "Autonomous Agent ReAct Planning Prompt",
    category: "agents",
    categoryName: "🤖 AI Agents",
    desc: "Instruct an LLM to reason, formulate sub-task plans, and output valid JSON tool calls.",
    prompt: `You are an Autonomous Research Agent operating in a ReAct loop.
Given a user objective:
1. Write your intermediate reasoning in a <thought> tag.
2. If you need external data, output a tool call JSON in a <action> tag: {"tool": "web_search", "query": "..."}
3. Once all information is gathered, output your final answer in a <final_answer> tag.`
  },
  {
    id: "pl-5",
    title: "SQL Query Optimization & Index Auditor",
    category: "security",
    categoryName: "🐞 Bug Fixing & Security",
    desc: "Analyze slow PostgreSQL/MySQL queries and recommend B-Tree & GIN indexes.",
    prompt: `Act as a Database Administrator (DBA). 
Analyze the provided SQL query and EXPLAIN ANALYZE execution plan.
Identify:
1. Sequential scan bottlenecks.
2. Missing composite indexes (B-Tree, Partial, or GIN vector indexes).
3. Provide rewritten SQL query with 5x execution speedup.`
  },
  {
    id: "pl-6",
    title: "Docker & Kubernetes Deployment Spec",
    category: "architecture",
    categoryName: "🏗️ System Architecture",
    desc: "Generate production Multi-stage Dockerfiles and Kubernetes HPA manifests.",
    prompt: `Act as a DevOps Engineer. Write a multi-stage production Dockerfile for a Python FastAPI application using alpine/slim base image. 
Followed by a Kubernetes Deployment YAML manifest including:
1. Liveness and Readiness probes.
2. CPU & Memory Resource requests and limits.
3. Horizontal Pod Autoscaler (HPA) targeting 75% CPU load.`
  },
  {
    id: "pl-7",
    title: "Cybersecurity SIEM Log Vulnerability Scanner",
    category: "security",
    categoryName: "🐞 Bug Fixing & Security",
    desc: "Parse raw server syslog files for SQL Injection, XSS, and SSH brute force attacks.",
    prompt: `Act as a Security Operations Center (SOC) Analyst. 
Analyze the attached raw NGINX access log lines.
Extract:
1. IP addresses attempting SQL Injection or Path Traversal (e.g., ../../etc/passwd).
2. Attack frequency and target endpoints.
3. Draft recommended IPTables / Cloudflare WAF firewall block rules.`
  },
  {
    id: "pl-8",
    title: "Medical Document OCR Data Extractor",
    category: "academic",
    categoryName: "📝 Academic & Writing",
    desc: "Extract structured patient vitals and ICD-10 medical codes from OCR raw text.",
    prompt: `You are a Certified Medical Coding Assistant. 
Extract structured patient clinical data from the provided physician note.
Output valid JSON matching:
{
  "patient_vitals": {"blood_pressure": "", "heart_rate": ""},
  "diagnoses": [{"condition": "", "icd_10_code": ""}],
  "prescribed_medications": []
}`
  },
  {
    id: "pl-9",
    title: "Academic Paper Literature Review Generator",
    category: "academic",
    categoryName: "📝 Academic & Writing",
    desc: "Synthesize findings across 5 research paper abstracts into a comparative lit review.",
    prompt: `Act as an Academic Research Director. Synthesize the attached 5 research paper abstracts on Transformer Attention Optimization.
Structure the review into:
1. Introduction & Research Problem.
2. Comparative Methodology Matrix (Table: Author, Approach, Benchmark Score, Limitation).
3. Key Research Gaps & Future Directions.`
  },
  {
    id: "pl-10",
    title: "Technical System Architecture Interviewer",
    category: "academic",
    categoryName: "📝 Academic & Writing",
    desc: "Simulate a Senior Staff System Architect conducting a mock interview.",
    prompt: `Act as a Principal System Architect at a FAANG company interviewing a candidate for a Staff Software Engineer role.
Topic: "Design a Global Real-Time Video Streaming Service (YouTube/Netflix)".
Ask ONE targeted question at a time. Wait for my response, evaluate my architecture choices (CDN, Caching, Video Transcoding), and ask a follow-up probing question.`
  },
  {
    id: "pl-11",
    title: "React + Tailwind Glassmorphism Component",
    category: "coding",
    categoryName: "💻 Coding & Refactoring",
    desc: "Generate modern responsive UI components with subtle gradient borders.",
    prompt: `Act as a Lead UI/UX Frontend Developer. 
Write a React functional component using Tailwind CSS for a modern AI Model Metric Card.
Include:
1. Glassmorphism backdrop-blur styling.
2. Animated hover state (slight scale & neon border glow).
3. Lucide-react icon integration.
4. Full TypeScript props interface.`
  },
  {
    id: "pl-12",
    title: "Automated Unit Test Suite (PyTest & Jest)",
    category: "coding",
    categoryName: "💻 Coding & Refactoring",
    desc: "Generate 100% line coverage unit tests including mock fixtures and edge cases.",
    prompt: `Act as a QA Automation Lead. Write a comprehensive PyTest test suite for the provided Python class.
Ensure:
1. Mocking external API calls with unittest.mock.
2. Edge cases (empty strings, null inputs, invalid HTTP response codes).
3. Parameterized test cases using @pytest.mark.parametrize.`
  },
  {
    id: "pl-13",
    title: "Git Pull Request Code & Security Inspector",
    category: "security",
    categoryName: "🐞 Bug Fixing & Security",
    desc: "Review git diff commits for security flaws, memory leaks, and performance regressions.",
    prompt: `Act as a Code Reviewer. Audit the provided git diff patch.
Highlight:
1. Security Risk (e.g. unescaped SQL strings, leaked secrets, unsafe deserialization).
2. Performance Bottleneck (e.g. N+1 database queries inside loops).
3. Provide recommended code diff fix using GitHub markdown diff syntax (+/-).`
  },
  {
    id: "pl-14",
    title: "Neo4j Cypher Graph Query Builder",
    category: "architecture",
    categoryName: "🏗️ System Architecture",
    desc: "Model complex graph entities and relationships into Neo4j Cypher queries.",
    prompt: `Act as a Graph Database Engineer. 
Design a Neo4j Cypher graph schema for a Social Network Fraud Detection system.
Output Cypher queries to:
1. Create (:User) and (:Transaction) nodes with properties.
2. Create [:TRANSFERRED_TO] and [:SHARES_DEVICE] relationships.
3. Query users sharing the same hardware device ID with over 3 suspicious transactions.`
  },
  {
    id: "pl-15",
    title: "Time-Series Anomaly Detection Prompt",
    category: "architecture",
    categoryName: "🏗️ System Architecture",
    desc: "Analyze CPU/RAM metric metrics to identify sudden spike anomalies.",
    prompt: `Act as a Site Reliability Engineer (SRE). 
Analyze the provided hourly server telemetry metric points.
Detect:
1. Sudden anomalies exceeding 3 standard deviations from baseline (Z-Score > 3).
2. Root cause correlation (e.g., memory leak vs traffic surge).
3. Recommended alert thresholds for Prometheus / Grafana.`
  }
];
