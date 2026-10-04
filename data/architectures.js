/* ==========================================================================
   AI MODEL HUB DATA - AI ARCHITECTURES
   Contains 6 System Architecture Flow Definitions
   ========================================================================== */

const AI_ARCHITECTURES_DATA = [
  {
    id: "basic-llm",
    name: "1. Basic LLM Flow",
    subtitle: "Direct Prompt to Model Pipeline",
    image: null,
    flow: [
      { step: 1, label: "User Prompt", desc: "User sends text prompt to system", icon: "👤" },
      { step: 2, label: "API Gateway", desc: "Authentication, rate limiting, and token check", icon: "🛡️" },
      { step: 3, label: "LLM Model", desc: "Transformer tokenization & inference", icon: "🧠" },
      { step: 4, label: "Response", desc: "Streaming answer returned to user", icon: "💬" }
    ],
    diagramText: "User ➔ API Gateway ➔ LLM Model ➔ Answer",
    explanation: "The simplest AI system pattern. The prompt is sent directly to a Large Language Model without external document lookup or tool calling. Suitable for creative writing, general knowledge Q&A, and simple text translation."
  },
  {
    id: "rag",
    name: "2. RAG (Retrieval-Augmented Generation)",
    subtitle: "Knowledge-Grounded Ingestion & Retrieval Pipeline",
    image: "images/rag_architecture.jpg",
    flow: [
      { step: 1, label: "User Question", desc: "User enters query requiring specific external data", icon: "❓" },
      { step: 2, label: "Query Embedding", desc: "Text converted to dense vector representation", icon: "🔢" },
      { step: 3, label: "Vector Search", desc: "Cosine similarity search in ChromaDB/Qdrant/FAISS", icon: "🗄️" },
      { step: 4, label: "Retriever & Reranker", desc: "Cross-encoder re-scores top candidate document chunks", icon: "🎯" },
      { step: 5, label: "Context Assembly", desc: "Top chunks inserted into LLM prompt template", icon: "📄" },
      { step: 6, label: "LLM Generation", desc: "LLM synthesizes final answer grounded in context", icon: "🧠" },
      { step: 7, label: "Citations Output", desc: "Answer delivered with exact source line citations", icon: "✅" }
    ],
    diagramText: "User Question ➔ Embedding ➔ Vector DB Search ➔ Retriever ➔ Reranker ➔ Context Injection ➔ LLM ➔ Cited Answer",
    explanation: "Retrieval-Augmented Generation (RAG) connects an LLM to external knowledge stores (PDFs, SQL databases, enterprise wikis). By fetching accurate facts before generation, RAG eliminates hallucinations and keeps models updated with proprietary data without expensive fine-tuning."
  },
  {
    id: "voice-ai",
    name: "3. Voice AI Pipeline",
    subtitle: "Real-time Conversational Speech System",
    image: null,
    flow: [
      { step: 1, label: "Microphone", desc: "User speaks into audio device", icon: "🎙️" },
      { step: 2, label: "Voice Activity Detection", desc: "VAD strips silence and isolates voice signal", icon: "📊" },
      { step: 3, label: "Speech-to-Text (STT)", desc: "Whisper converts audio waveform into text transcript", icon: "📝" },
      { step: 4, label: "LLM Reasoning Engine", desc: "Language model formulates intelligent reply", icon: "🧠" },
      { step: 5, label: "Text-to-Speech (TTS)", desc: "Piper or XTTS synthesizes natural voice audio", icon: "🔊" },
      { step: 6, label: "Speaker Output", desc: "Audio streamed back to user with low latency", icon: "🎧" }
    ],
    diagramText: "Microphone ➔ VAD ➔ Whisper STT ➔ LLM Engine ➔ TTS Synthesizer ➔ Speaker",
    explanation: "Voice AI combines Speech Recognition (STT), natural language logic (LLM), and Speech Synthesis (TTS) into a seamless conversational loop. Used in customer service hotlines, driving assistants, and interactive educational tutors."
  },
  {
    id: "multimodal-ai",
    name: "4. Multimodal AI Fusion System",
    subtitle: "Unified Vision, Audio, and Text Processing",
    image: null,
    flow: [
      { step: 1, label: "Multimodal Inputs", desc: "Text prompt + Image upload + Audio voice clip", icon: "📸" },
      { step: 2, label: "Vision & Audio Encoders", desc: "ViT (Vision Transformer) and Whisper audio encoders", icon: "🧩" },
      { step: 3, label: "Joint Projection Layer", desc: "Aligns images and audio into shared vector space", icon: "🔄" },
      { step: 4, label: "Multimodal Decoder", desc: "Unified transformer generates combined output", icon: "🧠" },
      { step: 5, label: "Structured Output", desc: "Generates text, segmented image masks, or code", icon: "✨" }
    ],
    diagramText: "(Text + Image + Audio) ➔ Vision/Audio Encoders ➔ Unified Vector Projection ➔ Multimodal LLM ➔ Result",
    explanation: "Multimodal AI models ingest multiple data modalities simultaneously. Rather than translating images or audio into text first, the neural network natively understands visual spatial relationships, audio tone, and textual nuance within a single unified embedding space."
  },
  {
    id: "ai-agent",
    name: "5. Autonomous AI Agent Architecture",
    subtitle: "Perception, Memory, Planning, and Tool Calling Loop",
    image: "images/ai_agent_workflow.jpg",
    flow: [
      { step: 1, label: "Goal Prompt", desc: "User gives complex high-level objective", icon: "🎯" },
      { step: 2, label: "Perception & Memory", desc: "Agent reads short-term history & long-term memory", icon: "💾" },
      { step: 3, label: "Planning & ReAct", desc: "Decomposes goal into step-by-step sub-tasks", icon: "📋" },
      { step: 4, label: "Tool Execution", desc: "Calls APIs, executes Python scripts, or searches web", icon: "🛠️" },
      { step: 5, label: "Observation & Evaluation", desc: "Evaluates tool output and refines next step", icon: "🔍" },
      { step: 6, label: "Final Result", desc: "Delivers completed multi-step outcome", icon: "🏆" }
    ],
    diagramText: "User Goal ➔ Memory ➔ Planning (ReAct) ➔ Tool Calling (APIs/Search/Code) ➔ Evaluation Loop ➔ Final Outcome",
    explanation: "Unlike static chatbots, AI Agents operate autonomously in an iterative loop. They formulate plans, call external tools (calculators, web browsers, databases, code execution sandboxes), observe tool outputs, and self-correct until the goal is achieved."
  },
  {
    id: "jarvis",
    name: "6. JARVIS Multi-Modal Assistant",
    subtitle: "Complete Orchestration Ecosystem",
    image: "images/jarvis_architecture.jpg",
    flow: [
      { step: 1, label: "Voice Input", desc: "User speaks command: 'Summarize today's news and open my code editor'", icon: "🎙️" },
      { step: 2, label: "Whisper STT", desc: "Converts speech to text instantly", icon: "📝" },
      { step: 3, label: "Intent Router", desc: "Classifies intent: System Command vs Web Search vs RAG", icon: "🔀" },
      { step: 4, label: "RAG & Web Search", desc: "Fetches live news articles and local document context", icon: "🌐" },
      { step: 5, label: "LLM Brain", desc: "Generates summary and constructs OS automation script", icon: "🧠" },
      { step: 6, label: "Tool Execution", desc: "Executes Python OS control to launch editor & browser", icon: "💻" },
      { step: 7, label: "TTS Output", desc: "Speaks response confirmation back to user", icon: "🔊" }
    ],
    diagramText: "Voice Input ➔ Whisper STT ➔ Intent Router ➔ LLM Brain ➔ (RAG + Web Search + Tool Calling + OS Control) ➔ TTS Audio Reply",
    explanation: "The ultimate AI system integration. Combines Voice Recognition, Intent Classification, RAG, Web Scraping, Desktop Computer Control, Code Execution, and Neural Speech Synthesis into a seamless JARVIS-like assistant experience."
  }
];
