export type Project = {
  title: string;
  description: string;
  link: string;
  tags: string[];
};

const projects: Project[] = [
  {
    title: 'Enterprise Document Intelligence & RAG Pipeline',
    description: 'A polished RAG system leveraging watsonx.ai, IBM Granite foundation models, FAISS, and ChromaDB. Automates parsing of complex financial reports and contracts, increasing Q&A accuracy by 30%.',
    link: 'https://github.com/surya112020/ai-ml-portfolio-',
    tags: ['React', 'watsonx.ai', 'RAG', 'LangChain', 'FAISS']
  },
  {
    title: 'Local LLM Agentic Coding Assistant',
    description: 'An autonomous software agent powered by LangGraph, Ollama, and local LLMs. Capable of analyzing repository files, planning multi-step edits, executing commands, and self-correcting code in sandboxed spaces.',
    link: 'https://github.com/surya112020/ai-ml-portfolio-',
    tags: ['LangGraph', 'Ollama', 'Agentic AI', 'Llama3', 'Python']
  },
  {
    title: 'Advanced GraphRAG System',
    description: 'A graph-based Retrieval-Augmented Generation pipeline using Neo4j and LlamaIndex. Builds and queries semantic knowledge graphs from unstructured text corpus, improving multi-hop Q&A accuracy by 45%.',
    link: 'https://github.com/surya112020/ai-ml-portfolio-',
    tags: ['GraphRAG', 'LlamaIndex', 'Neo4j', 'Knowledge Graphs', 'Python']
  },
  {
    title: 'Hiring Agent (Resume-to-Score CLI)',
    description: 'An automated recruitment scoring system that parses PDF resumes using PyMuPDF, enriches candidate metrics with live GitHub contribution analysis, and evaluates alignment using Google Gemini.',
    link: 'https://github.com/surya112020/hiring-agent',
    tags: ['Gemini API', 'PyMuPDF', 'Pydantic', 'GitHub API', 'CLI']
  },
  {
    title: 'JobFlow AI (LinkedIn Job Search Agent)',
    description: 'A recruitment intelligence dashboard that automates LinkedIn job scraping using Apify and evaluates job description relevance, tailors resumes, and generates personalized outreach emails.',
    link: 'https://github.com/surya112020/jobflow-ai',
    tags: ['Flask', 'Express', 'Apify Scraper', 'Resume Tailoring', 'OpenAI']
  },
  {
    title: 'Real-time Financial Fraud Detection',
    description: 'High-throughput classification engine built with PyTorch, SMOTE class balancing, and Optuna. Deployed on AWS SageMaker with FastAPI serving for low-latency (<200ms) fraud detection.',
    link: 'https://github.com/surya112020/ai-ml-portfolio-',
    tags: ['PyTorch', 'Scikit-Learn', 'FastAPI', 'SageMaker']
  },
  {
    title: 'Multimodal Document Understanding (Qwen-VL)',
    description: 'Vision-Language Model (VLM) fine-tuned on FUNSD and DocVQA datasets for structured information extraction. Uses 4-bit quantization (QLoRA) and gradient checkpointing for GPU efficiency.',
    link: 'https://github.com/surya112020/ai-ml-portfolio-',
    tags: ['PyTorch', 'Qwen-VL', 'Vision-Language', 'QLoRA']
  },
  {
    title: 'Interactive Kanban Board',
    description: 'A clean, responsive glassmorphism Kanban task organizer built with native HTML5 Drag and Drop API and browser LocalStorage persistence.',
    link: 'https://github.com/surya112020/basic-kanaban',
    tags: ['HTML5', 'Vanilla CSS', 'Drag-and-Drop', 'LocalStorage']
  }
];

export default projects;


