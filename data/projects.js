/* ==========================================================================
   AI MODEL HUB DATA - REAL-WORLD AI PROJECTS
   Contains 12 Full Production AI System Blueprints
   ========================================================================== */

const AI_PROJECTS_DATA = [
  {
    id: "proj-1",
    title: "1. Personal AI Assistant (JARVIS-Style)",
    category: "Voice & Multimodal",
    desc: "A hands-free, real-time voice-activated desktop assistant that listens to voice commands, queries local docs via RAG, searches the web, executes computer tasks, and responds in a natural human voice.",
    models: ["Whisper Large v3 (STT)", "Qwen 2.5 72B / Llama 3.3 (Brain)", "BGE-M3 (RAG)", "XTTS v2 / Piper (TTS)"],
    architecture: "Microphone ➔ Whisper STT ➔ Intent Classifier & Router ➔ LLM Brain (with Web Search & RAG Tool Call) ➔ TTS Synthesizer ➔ Speaker",
    technologies: ["Python", "FastAPI", "WebSockets", "PyAudio", "ChromaDB", "Playwright (Web Automation)"],
    difficulty: "Advanced",
    apis: ["OpenAI API / Local Ollama", "Tavily Search API", "WebSockets"],
    complexity: "High (Multi-threaded Real-time Audio Stream)",
    useCase: "Personal productivity, smart home automation, and hands-free desktop control."
  },
  {
    id: "proj-2",
    title: "2. College RAG Assistant",
    category: "Retrieval-Augmented Generation",
    desc: "An intelligent campus study assistant that ingests thousands of university PDF textbooks, lecture slides, and syllabus notes to deliver instant grounded answers with exact line-level page citations.",
    models: ["GOT-OCR 2.0 (Doc Parsing)", "BGE-M3 (Embeddings)", "BGE Reranker v2 (Reranking)", "Llama 3.3 70B / Claude 3.5 Sonnet (LLM)"],
    architecture: "PDF Ingestion ➔ PyMuPDF Chunking ➔ BGE-M3 Vector Embeddings ➔ Qdrant Vector DB ➔ Cross-Encoder Reranker ➔ LLM Response + Citations",
    technologies: ["React", "Python", "Qdrant Vector DB", "LangChain / LlamaIndex", "FastAPI"],
    difficulty: "Intermediate",
    apis: ["OpenAI API / Groq API", "Qdrant Cloud"],
    complexity: "Medium (Semantic Chunking & Page Citation Mapping)",
    useCase: "University exam preparation, automated syllabus Q&A, and campus library research."
  },
  {
    id: "proj-3",
    title: "3. AI Customer Support Agent",
    category: "Autonomous Agents",
    desc: "An autonomous multi-channel customer service agent capable of checking order statuses, handling refunds via API tool calls, escalating complex complaints to human agents, and maintaining CRM memory.",
    models: ["GPT-4o / DeepSeek V3 (Reasoning)", "E5-Mistral-7B (Knowledge Base)", "Whisper (Voice Calls)"],
    architecture: "User Message ➔ API Gateway ➔ ReAct Agent Loop ➔ CRM DB Lookup Tool ➔ Refund API Tool ➔ Formatted Answer + Email Dispatch",
    technologies: ["Node.js", "Express", "Pinecone Vector DB", "Zod Schema Guardrails", "Twilio API"],
    difficulty: "Intermediate",
    apis: ["Shopify REST API", "Zendesk API", "OpenAI Tool Calling"],
    complexity: "Medium (Stateful Memory & Tool Calling Safety)",
    useCase: "E-commerce automated support, 24/7 ticket resolution, and CRM synchronization."
  },
  {
    id: "proj-4",
    title: "4. AI Coding & Refactoring Assistant",
    category: "Software Engineering",
    desc: "An IDE-integrated code companion that indexes your repository AST, analyzes git diffs, writes comprehensive unit test suites, and refactors legacy code according to enterprise design patterns.",
    models: ["Claude 3.5 Sonnet (Code Logic)", "DeepSeek V3 (Fast Completion)", "Nomic Embed Text (Code Vector Search)"],
    architecture: "VS Code Plugin ➔ Tree-sitter Code Parser ➔ AST Vector Index ➔ Context Window Construction ➔ LLM Code Generation ➔ Git Diff Review",
    technologies: ["TypeScript", "VS Code Extension API", "Tree-Sitter", "FAISS Vector DB", "Docker"],
    difficulty: "Advanced",
    apis: ["Anthropic Claude API", "GitHub REST API"],
    complexity: "High (AST Tree Parsing & Repository Indexing)",
    useCase: "Automated code refactoring, test generation, and pull request code reviews."
  },
  {
    id: "proj-5",
    title: "5. Agentic SOC (Security Operations Center)",
    category: "Cybersecurity AI",
    desc: "An autonomous cybersecurity agent that monitors SIEM server logs, detects zero-day intrusion anomalies, correlates threat IPs, and automatically drafts firewall quarantine rules.",
    models: ["DeepSeek V3 / Mistral Large 2 (Log Analysis)", "PatchCore / Chronos Bolt (Anomaly Detection)"],
    architecture: "Syslog Stream ➔ Anomaly Detector ➔ AI Agent Threat Analyzer ➔ VirusTotal API Tool ➔ Automated IPTables Firewall Rule Generation",
    technologies: ["Python", "ElasticSearch", "Kafka Stream Processing", "Docker", "Suricata IDS"],
    difficulty: "Advanced",
    apis: ["VirusTotal API", "AbuseIPDB API", "Slack Webhook Notifications"],
    complexity: "Very High (Real-time Streaming Log Pipeline)",
    useCase: "Enterprise network security, automated incident response, and log triage."
  },
  {
    id: "proj-6",
    title: "6. Medical Document Assistant",
    category: "Healthcare & OCR",
    desc: "A HIPAA-compliant document processing platform that extracts structured patient vitals, lab results, and ICD-10 diagnostic codes from unstructured handwritten doctor notes and medical scans.",
    models: ["GOT-OCR 2.0 (Handwriting OCR)", "BioBERT / Qwen 2.5 72B (Medical Named Entity Recognition)"],
    architecture: "Medical Image Upload ➔ GOT-OCR Text Extraction ➔ Medical Entity Recognizer ➔ JSON Schema Guardrail ➔ EHR Database Insertion",
    technologies: ["Python", "OpenCV", "Pydantic", "PostgreSQL (pgvector)", "Docker (On-Premise)"],
    difficulty: "Intermediate",
    apis: ["Local On-Premises LLM (HIPAA Compliance - No External Cloud API)"],
    complexity: "High (Privacy & High-Precision Entity Extraction)",
    useCase: "Hospital EHR digitization, medical bill processing, and lab result summarization."
  },
  {
    id: "proj-7",
    title: "7. AI Resume Analyzer & Job Matcher",
    category: "NLP & HR Tech",
    desc: "A recruiter tool that parses candidate resumes in PDF/Word format, compares experience against job requirements, identifies skill gaps, and generates tailored interview questions.",
    models: ["BGE-M3 (Embedding Match)", "GPT-4o / Llama 3.3 (Resume Scoring)"],
    architecture: "PDF Upload ➔ PDFPlumber Parsing ➔ Cosine Skill Distance Matcher ➔ Weakness Analysis LLM ➔ Score Breakdown Report",
    technologies: ["Vue.js / HTML5", "Python", "FastAPI", "ChromaDB", "Chart.js"],
    difficulty: "Beginner",
    apis: ["OpenAI API / Groq API"],
    complexity: "Low to Medium (JSON Scoring & Vector Similarity)",
    useCase: "HR recruitment screening, career coaching, and skill gap identification."
  },
  {
    id: "proj-8",
    title: "8. Legal Document Assistant",
    category: "Legal Tech & RAG",
    desc: "A legal search engine that ingests contract agreements, flags high-risk indemnification clauses, compares terms against statutory compliance rules, and generates summary briefs.",
    models: ["E5-Mistral-7B (Legal Embedding)", "Cohere Rerank v3 (Precision Rerank)", "Claude 3.5 Sonnet (Legal Logic)"],
    architecture: "Contract Ingestion ➔ Section-aware Chunking ➔ Hybrid Vector Search + Reranker ➔ Compliance Inspector LLM ➔ Highlighted Risk Matrix",
    technologies: ["Next.js", "Python", "Weaviate Vector DB", "LangChain"],
    difficulty: "Advanced",
    apis: ["Anthropic API", "Weaviate Cloud"],
    complexity: "High (Section-Aware Chunking & Strict Safety Verification)",
    useCase: "Contract risk auditing, M&A due diligence, and statutory compliance checks."
  },
  {
    id: "proj-9",
    title: "9. AI Interview Trainer",
    category: "Interactive EdTech",
    desc: "An interactive mock interviewer that asks role-specific technical questions, records user audio/video responses, evaluates tone and body pose, and provides instant constructive feedback.",
    models: ["Whisper (Voice Recognition)", "YOLOv8-Pose (Body Language Analysis)", "GPT-4o (Answer Evaluator)", "Piper (Interviewer Voice)"],
    architecture: "Webcam / Mic Stream ➔ STT Transcript + Pose Kinematics ➔ Rubric Evaluation LLM ➔ Audio TTS Question Stream ➔ Performance Radar Chart",
    technologies: ["HTML5 Canvas", "WebRTC", "Python", "FastAPI", "Chart.js"],
    difficulty: "Intermediate",
    apis: ["OpenAI API", "Web Speech API"],
    complexity: "Medium (Real-time Audio/Video Feedback)",
    useCase: "Student career preparation, public speaking coaching, and HR mock interviews."
  },
  {
    id: "proj-10",
    title: "10. Smart Education Assistant & Tutor",
    category: "EdTech & Gamification",
    desc: "A personalized AI tutor that adapts learning material based on student progress, creates interactive quizzes on the fly, explains difficult STEM problems step-by-step, and tracks mastery points.",
    models: ["Qwen 2.5 72B (Math & STEM)", "BGE-M3 (Curriculum Vector Search)"],
    architecture: "Student Dashboard ➔ Learning Concept Graph ➔ Step-by-Step Chain-of-Thought Generator ➔ Interactive Quiz Engine ➔ Progress Tracker",
    technologies: ["HTML5 / CSS3", "Vanilla JavaScript", "KaTeX (Math Formula Rendering)", "LocalStorage"],
    difficulty: "Beginner",
    apis: ["Groq API / OpenRouter"],
    complexity: "Low (Socratic Dialogue Prompting & Mastery Tracking)",
    useCase: "K-12 and College self-paced learning, interactive math tutoring, and STEM homework help."
  },
  {
    id: "proj-11",
    title: "11. AI Research Assistant & Literature Reviewer",
    category: "Academic AI",
    desc: "An autonomous agent that accepts a research topic, queries arXiv & Google Scholar APIs, downloads relevant PDF papers, extracts methodology findings, and synthesizes a structured lit review.",
    models: ["DeepSeek V3 (Academic Analysis)", "BGE-M3 (Paper Embeddings)", "Cohere Rerank v3"],
    architecture: "Query Input ➔ arXiv API Fetcher ➔ PDF Text Extractor ➔ Multi-Paper Vector Store ➔ Synthesis Agent ➔ Markdown Literature Review",
    technologies: ["Python", "Streamlit", "ArXiv API", "PyMuPDF", "FAISS"],
    difficulty: "Intermediate",
    apis: ["ArXiv Open API", "Semantic Scholar API", "OpenAI API"],
    complexity: "Medium (Automated Web Scraping & Multi-Paper Ingestion)",
    useCase: "Academic paper synthesis, literature review writing, and state-of-the-art tech tracking."
  },
  {
    id: "proj-12",
    title: "12. Computer Vision Surveillance & Safety System",
    category: "Computer Vision & Edge AI",
    desc: "An automated industrial camera surveillance pipeline that detects safety equipment (hard hats, high-vis vests), identifies unauthorized perimeter entry, and alerts security operators in real time.",
    models: ["YOLOv8-x (Object & PPE Detection)", "SAM 2 (Perimeter Tracking)", "ArcFace (Authorized Staff Facial ID)"],
    architecture: "RTSP IP Camera Stream ➔ OpenCV Frame Processor ➔ YOLO PPE Detector + ArcFace ID ➔ Security Violation Trigger ➔ Web Dashboard Alert",
    technologies: ["Python", "OpenCV", "PyTorch", "Flask", "MQTT Protocol"],
    difficulty: "Advanced",
    apis: ["Twilio SMS Alert API", "Local RTSP Camera Streams"],
    complexity: "High (Multi-Model Edge Video Pipeline with GPU Acceleration)",
    useCase: "Construction site safety auditing, industrial hazard prevention, and security monitoring."
  }
];
