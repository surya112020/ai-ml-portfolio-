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
    title: 'Multimodal Document Understanding (Qwen-VL)',
    description: 'Vision-Language Model (VLM) fine-tuned on FUNSD and DocVQA datasets for structured information extraction. Uses 4-bit quantization (QLoRA) and gradient checkpointing for GPU efficiency.',
    link: 'https://github.com/surya112020/ai-ml-portfolio-',
    tags: ['PyTorch', 'Qwen-VL', 'Vision-Language', 'QLoRA']
  },
  {
    title: 'Real-time Financial Fraud Detection',
    description: 'High-throughput classification engine built with PyTorch, SMOTE class balancing, and Optuna. Deployed on AWS SageMaker with FastAPI serving for low-latency (<200ms) fraud detection.',
    link: 'https://github.com/surya112020/ai-ml-portfolio-',
    tags: ['PyTorch', 'Scikit-Learn', 'FastAPI', 'SageMaker']
  },
  {
    title: 'KYC Compliance NLP Pipelines',
    description: 'Information extraction pipeline using BERT and Hugging Face Transformers. Tailored for token classification, risk monitoring, and entity extraction from unstructured financial documents.',
    link: 'https://github.com/surya112020/ai-ml-portfolio-',
    tags: ['NLP', 'BERT', 'Hugging Face', 'Transformers']
  }
];

export default projects;

