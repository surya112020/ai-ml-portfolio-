# AI/ML & GenAI Interactive Portfolio

A premium, interactive web portfolio and algorithm playground designed to showcase production architectures for **Retrieval-Augmented Generation (RAG)**, **Low-Rank Adaptation (LoRA) Fine-Tuning**, and **Document Intelligence Pipelines**.

### 🔗 Live Interactive Demo: [surya112020.github.io/ai-ml-portfolio-/](https://surya112020.github.io/ai-ml-portfolio-/)

---

## 🛠️ Interactive Showcases Built-In

### 1. Retrieval-Augmented Generation (RAG) Simulator
*   **Concept**: Simulates how an LLM retrieves relevant text context from a vector database before generating a response.
*   **Features**:
    *   Dynamic cosine similarity calculator.
    *   Adjustable Top-K documents retriever.
    *   System Prompt compiler.
    *   Real-time streaming (typing animation) of LLM generation.

### 2. LoRA Fine-Tuning Parameter Calculator
*   **Concept**: Simulates the reduction of trainable parameters when injecting low-rank adapter matrices $A$ and $B$ instead of full parameter tuning.
*   **Features**:
    *   Profiles for Llama-3-8B, Mixtral-8x7B, and IBM Granite.
    *   Adjustable Rank ($r$) and Scaling Factor ($\alpha$) sliders.
    *   Layer targeting selectors (Query, Key, Value, Output).
    *   Dynamic parameter efficiency metrics and matrix dimension math.

### 3. YOLOv8 & VLM Document Intelligence Pipeline
*   **Concept**: Walkthrough of an enterprise document parsing pipeline that extracts structured JSON data from scanned PDFs.
*   **Features**:
    *   Dynamic bounding boxes overlay for layout detection (Header, Address, Table, Total).
    *   Raw OCR alignment output visualization.
    *   Final structured schema output (JSON extraction matching Qwen-VL/watsonx.ai formatting).

---

## 💻 Tech Stack
*   **Frontend**: Semantic HTML5, Vanilla CSS3 (Glassmorphism, custom variables, responsive grid).
*   **Logic**: ES6+ JavaScript (DOM manipulation, state calculations, string streams).
*   **Math Rendering**: MathJax CDN (renders $\LaTeX$ math symbols dynamically).
*   **Icons**: FontAwesome v6 CDN.

---

## 🚀 How to Run Locally
1. Clone this repository:
   ```bash
   git clone https://github.com/surya112020/ai-ml-portfolio-.git
   ```
2. Open `index.html` in any web browser.
