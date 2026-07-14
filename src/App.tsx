import ProjectCard from './components/ProjectCard';
import projects from './data/projects';

function App() {
  return (
    <div className="app-shell">
      <header className="hero-section">
        <div>
          <p className="eyebrow">AI/ML & Generative AI Specialist</p>
          <h1>Hi, I’m Surya Teja.</h1>
          <p className="hero-copy">
            I design and deploy production-grade Machine Learning, Generative AI, RAG, 
            and Document Intelligence systems for enterprise and financial applications.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">Projects</a>
            <a className="button button-secondary" href="#contact">Contact</a>
          </div>
        </div>
      </header>

      <section id="about" className="section-card">
        <div>
          <h2>About Me</h2>
          <p>
            I’m an AI/ML Engineer with a little over 4 years of experience building machine 
            learning and generative AI systems, mainly in financial services and enterprise environments. 
            Currently, I'm working at IBM (via Nexacode Global Pvt Ltd), focusing on fine-tuning 
            large language models using IBM Granite and watsonx.ai.
          </p>
          <p>
            My technical strengths include Python, PyTorch, watsonx.ai, LLM Fine-Tuning (LoRA/QLoRA), 
            RAG systems (FAISS/ChromaDB), LangChain/LangGraph agentic pipelines, and MLOps deployment on AWS.
          </p>
        </div>
      </section>

      <section id="projects" className="section-card">
        <div>
          <div className="section-title-row">
            <h2>Projects</h2>
            <p>
              Selected AI/ML and GenAI systems demonstrating fine-tuning, retrieval optimization, 
              and low-latency serving.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-card contact-card">
        <div>
          <h2>Contact</h2>
          <p>
            Want to collaborate on building next-generation cognitive systems or learn more 
            about my work? Send me an email at <strong>suryateja2034@gmail.com</strong> or visit my GitHub.
          </p>
          <div className="contact-actions">
            <a className="button button-primary" href="mailto:suryateja2034@gmail.com">
              Email Me
            </a>
            <a className="button button-secondary" href="https://github.com/surya112020" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

