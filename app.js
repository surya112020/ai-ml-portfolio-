/* ==========================================
   INTERACTIVE PORTFOLIO LOGIC
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation Highlights on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Tab Switching ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');

            // Trigger mathjax rendering on tab switch if equations are present
            if (window.MathJax) {
                MathJax.typeset();
            }
        });
    });

    // ==========================================
    // RAG SIMULATOR LOGIC
    // ==========================================
    const ragQueries = {
        q1: {
            text: "What is the remote work policy and how many days are allowed?",
            scores: { doc1: 0.92, doc2: 0.15, doc3: 0.05, doc4: 0.78 },
            chunks: [
                "Doc 1 (Score: 0.92): Employees are allowed to work remotely for up to 3 days per week with manager approval. Core hours must be maintained between 10 AM and 4 PM local time.",
                "Doc 4 (Score: 0.78): The company provides a one-time remote workspace stipend of $500 for ergonomic office equipment, chairs, and monitors."
            ],
            answer: "Based on the retrieved company policies, employees are permitted to work remotely for up to 3 days per week, subject to manager approval. During remote work, you must maintain core hours between 10 AM and 4 PM local time (Doc 1). Additionally, you are eligible for a one-time workspace stipend of $500 to purchase ergonomic office equipment such as chairs or monitors to set up your home office (Doc 4)."
        },
        q2: {
            text: "What are the security rules for accessing internal servers?",
            scores: { doc1: 0.08, doc2: 0.95, doc3: 0.11, doc4: 0.18 },
            chunks: [
                "Doc 2 (Score: 0.95): Accessing internal database servers requires active VPN. Multi-Factor Authentication (MFA) must be verified every 12 hours of active session."
            ],
            answer: "According to the corporate security guidelines, accessing internal database servers strictly requires an active VPN connection. Additionally, you must verify your identity using Multi-Factor Authentication (MFA) at least once every 12 hours during an active session to maintain access (Doc 2)."
        },
        q3: {
            text: "How do I get reimbursed for travel expenses?",
            scores: { doc1: 0.12, doc2: 0.05, doc3: 0.96, doc4: 0.22 },
            chunks: [
                "Doc 3 (Score: 0.96): For business travel, lodging is reimbursed up to $250/night. Meal allowances are capped at $75/day. Receipts must be uploaded within 30 days of the travel end date."
            ],
            answer: "To get reimbursed for travel expenses, you must comply with the travel policy guidelines: lodging is reimbursable up to a maximum of $250 per night, and meal allowances are capped at $75 per day. Crucially, you must upload all receipts to the expense portal within 30 days of your travel end date (Doc 3)."
        }
    };

    const runRagBtn = document.getElementById('run-rag-btn');
    const ragQuerySelect = document.getElementById('rag-sample-query');
    const ragQueryInput = document.getElementById('rag-query-input');
    const ragTopKSelect = document.getElementById('rag-top-k');
    const ragTempSlider = document.getElementById('rag-temperature');
    const tempValSpan = document.getElementById('temp-val');
    
    const assembledPromptElement = document.getElementById('assembled-prompt');
    const llmStatusElement = document.getElementById('llm-status');
    const llmTextElement = document.getElementById('llm-text');

    // Update custom text area on select change
    ragQuerySelect.addEventListener('change', () => {
        const val = ragQuerySelect.value;
        if (val !== 'custom') {
            ragQueryInput.value = ragQueries[val].text;
            ragQueryInput.disabled = true;
        } else {
            ragQueryInput.value = "";
            ragQueryInput.disabled = false;
            ragQueryInput.focus();
        }
    });

    ragTempSlider.addEventListener('input', () => {
        tempValSpan.textContent = ragTempSlider.value;
    });

    // Typist effect
    let typingInterval = null;
    function typeText(targetElement, text, callback) {
        clearInterval(typingInterval);
        targetElement.textContent = "";
        let i = 0;
        typingInterval = setInterval(() => {
            if (i < text.length) {
                targetElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                if (callback) callback();
            }
        }, 15);
    }

    runRagBtn.addEventListener('click', () => {
        const queryKey = ragQuerySelect.value;
        let queryText = ragQueryInput.value.trim();
        
        if (!queryText) {
            alert("Please enter or select a query.");
            return;
        }

        runRagBtn.disabled = true;
        runRagBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Retrieving & Generating...`;
        llmStatusElement.textContent = "Retrieving relevant documents from Vector DB...";
        llmTextElement.textContent = "";

        // Simulate Vector Search (Cosine Similarity computation)
        setTimeout(() => {
            let data = ragQueries[queryKey];
            
            // For custom queries, generate random but plausible scores
            if (queryKey === 'custom') {
                data = {
                    text: queryText,
                    scores: {
                        doc1: Math.random() * 0.4 + 0.1,
                        doc2: Math.random() * 0.4 + 0.1,
                        doc3: Math.random() * 0.4 + 0.1,
                        doc4: Math.random() * 0.4 + 0.1
                    }
                };
                
                // Highlight highest score
                let maxKey = 'doc1';
                for (let key in data.scores) {
                    if (data.scores[key] > data.scores[maxKey]) maxKey = key;
                }
                data.scores[maxKey] = 0.88; // Give it a high score
                
                // Standard custom responses
                data.chunks = [`Doc ${maxKey.substring(3)} (Score: 0.88): ${document.querySelector('#' + maxKey + ' .doc-text').textContent}`];
                data.answer = `I found matching information in Document ${maxKey.substring(3)}. Based on the retrieved context regarding "${queryText}", the system states: ${document.querySelector('#' + maxKey + ' .doc-text').textContent}`;
            }

            const topK = parseInt(ragTopKSelect.value);
            
            // Sort documents by similarity score
            const sortedDocs = Object.entries(data.scores).sort((a, b) => b[1] - a[1]);
            const retrievedKeys = sortedDocs.slice(0, topK).map(item => item[0]);

            // Update UI scores and borders
            document.querySelectorAll('.db-doc').forEach(doc => {
                const id = doc.getAttribute('id');
                const score = data.scores[id].toFixed(2);
                doc.querySelector('.score').textContent = score;

                doc.classList.remove('active-retrieved', 'active-ignored');
                if (retrievedKeys.includes(id)) {
                    doc.classList.add('active-retrieved');
                } else {
                    doc.classList.add('active-ignored');
                }
            });

            llmStatusElement.textContent = "Assembling prompt with retrieved context...";

            // Assemble Prompt
            const contextText = retrievedKeys.map(key => {
                const docText = document.querySelector('#' + key + ' .doc-text').textContent;
                return `- Context [${key.toUpperCase()}]: ${docText}`;
            }).join('\n');

            const assembledPrompt = `System: You are an enterprise AI assistant. Answer the User Query using only the Context below.
---
CONTEXT:
${contextText}
---
USER QUERY: ${queryText}
---
Response (Temperature = ${ragTempSlider.value}):`;

            assembledPromptElement.textContent = assembledPrompt;

            // Simulate LLM Call
            setTimeout(() => {
                llmStatusElement.textContent = "Streaming LLM generative output...";
                typeText(llmTextElement, data.answer, () => {
                    llmStatusElement.textContent = "Generation completed successfully.";
                    runRagBtn.disabled = false;
                    runRagBtn.innerHTML = `<i class="fa-solid fa-play"></i> Run RAG Pipeline`;
                });
            }, 800);

        }, 1000);
    });

    // ==========================================
    // LORA PARAMETER CALCULATOR LOGIC
    // ==========================================
    const modelProfiles = {
        "granite-8b": { name: "IBM Granite 8B", d: 4096, layers: 32 },
        "llama3-8b": { name: "Llama 3 8B", d: 4096, layers: 32 },
        "mixtral-8x7b": { name: "Mixtral 8x7B", d: 14336, layers: 32 },
        "granite-34b": { name: "IBM Granite 34B", d: 8192, layers: 32 }
    };

    const loraModelSelect = document.getElementById('lora-base-model');
    const loraRankSlider = document.getElementById('lora-rank');
    const rankValSpan = document.getElementById('rank-val');
    const loraAlphaSlider = document.getElementById('lora-alpha');
    const alphaValSpan = document.getElementById('alpha-val');
    
    const layerQ = document.getElementById('layer-q');
    const layerV = document.getElementById('layer-v');
    const layerK = document.getElementById('layer-k');
    const layerO = document.getElementById('layer-o');

    const baseParamsVal = document.getElementById('base-params');
    const loraParamsVal = document.getElementById('lora-params');
    const reductionPctVal = document.getElementById('reduction-pct');

    const dimW0Span = document.getElementById('dim-w0');
    const dimBSpan = document.getElementById('dim-b');
    const dimASpan = document.getElementById('dim-a');

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function calculateLoRAMetrics() {
        const modelKey = loraModelSelect.value;
        const profile = modelProfiles[modelKey];
        const rank = parseInt(loraRankSlider.value);
        const alpha = parseInt(loraAlphaSlider.value);

        rankValSpan.textContent = rank;
        alphaValSpan.textContent = alpha;

        // Count layers adapted
        let activeProjectionsCount = 0;
        if (layerQ.checked) activeProjectionsCount++;
        if (layerV.checked) activeProjectionsCount++;
        if (layerK.checked) activeProjectionsCount++;
        if (layerO.checked) activeProjectionsCount++;

        const d = profile.d;
        const L = profile.layers;

        // Base params = Layers * (d * d) * active projections
        const baseParams = L * d * d * activeProjectionsCount;

        // LoRA params = Layers * (d * r + r * d) * active projections
        const loraParams = L * (d * rank + rank * d) * activeProjectionsCount;

        const reduction = baseParams > 0 ? (1 - (loraParams / baseParams)) * 100 : 0;

        baseParamsVal.textContent = formatNumber(baseParams);
        loraParamsVal.textContent = formatNumber(loraParams);
        reductionPctVal.textContent = reduction.toFixed(2) + "%";

        // Update Matrix Dimensions in visual diagram
        dimW0Span.textContent = `${d} × ${d}`;
        dimBSpan.textContent = `${d} × ${rank}`;
        dimASpan.textContent = `${rank} × ${d}`;

        // Dynamic diagram size adjustments
        const boxW0 = document.querySelector('.frozen .matrix-box');
        const boxB = document.querySelector('.adapter-b .matrix-box');
        const boxA = document.querySelector('.adapter-a .matrix-box');

        // Scale visual components dynamically based on rank
        const scaleFactor = Math.max(10, Math.min(60, rank * 1.5));
        boxB.style.width = `${Math.ceil(scaleFactor / 3) + 5}px`;
        boxA.style.height = `${Math.ceil(scaleFactor / 3) + 5}px`;
    }

    [loraModelSelect, loraRankSlider, loraAlphaSlider, layerQ, layerV, layerK, layerO].forEach(el => {
        el.addEventListener('input', calculateLoRAMetrics);
        el.addEventListener('change', calculateLoRAMetrics);
    });

    calculateLoRAMetrics(); // Initial run

    // ==========================================
    // DOCUMENT PIPELINE LOGIC
    // ==========================================
    const pipelineData = {
        invoice: {
            title: "financial_invoice_1092.pdf",
            stages: [
                {
                    // Stage 1: YOLO Layout Box Coordinates
                    json: `{
  "document_type": "Financial Invoice",
  "status": "Layout Parsed",
  "bounding_boxes": [
    {"label": "Header", "box_coords_xyxy": [10, 10, 260, 58], "confidence": 0.98},
    {"label": "Address Block", "box_coords_xyxy": [10, 65, 190, 105], "confidence": 0.95},
    {"label": "Table Area", "box_coords_xyxy": [10, 110, 410, 200], "confidence": 0.99},
    {"label": "Financial Total", "box_coords_xyxy": [260, 240, 410, 270], "confidence": 0.97}
  ]
}`
                },
                {
                    // Stage 2: OCR Alignment
                    json: `{
  "ocr_engine": "Tesseract-v5 / layout-parser",
  "word_segments_extracted": 42,
  "raw_lines": [
    "APEX GLOBAL SYSTEMS",
    "INVOICE #INV-2026-981",
    "Date: June 12, 2026",
    "From: Apex Global Systems LLC San Francisco, CA 94105",
    "Description Qty Rate Amount",
    "IBM Granite Model Tuning Consultation 15 hrs $200.00 $3,000.00",
    "RAG Pipeline Optimization & Setup 10 hrs $180.00 $1,800.00",
    "Total Due: $4,800.00"
  ]
}`
                },
                {
                    // Stage 3: VLM Structured Extraction
                    json: `{
  "model_used": "Qwen-VL-Chat / watsonx.ai",
  "inference_latency_ms": 345,
  "extracted_schema": {
    "invoice_metadata": {
      "invoice_id": "INV-2026-981",
      "date": "2026-06-12",
      "vendor_name": "Apex Global Systems LLC",
      "vendor_address": "San Francisco, CA 94105"
    },
    "line_items": [
      {
        "description": "IBM Granite Model Tuning Consultation",
        "quantity": 15,
        "rate": 200.00,
        "amount": 3000.00
      },
      {
        "description": "RAG Pipeline Optimization & Setup",
        "quantity": 10,
        "rate": 180.00,
        "amount": 1800.00
      }
    ],
    "financials": {
      "currency": "USD",
      "total_due": 4800.00
    }
  }
}`
                }
            ]
        },
        contract: {
            title: "nda_disclosure_agreement.pdf",
            stages: [
                {
                    json: `{
  "document_type": "Mutual NDA Contract",
  "status": "Layout Parsed",
  "bounding_boxes": [
    {"label": "NDA Title", "box_coords_xyxy": [10, 10, 410, 40], "confidence": 0.99},
    {"label": "Parties Segment", "box_coords_xyxy": [10, 50, 410, 110], "confidence": 0.96},
    {"label": "Clause Block", "box_coords_xyxy": [10, 120, 410, 180], "confidence": 0.94},
    {"label": "Signature Block", "box_coords_xyxy": [10, 200, 410, 260], "confidence": 0.98}
  ]
}`
                },
                {
                    json: `{
  "ocr_engine": "Tesseract-v5 / layout-parser",
  "word_segments_extracted": 68,
  "raw_lines": [
    "MUTUAL NON-DISCLOSURE AGREEMENT",
    "This Mutual Non-Disclosure Agreement is entered into as of June 20, 2026",
    "by and between Alpha Labs Inc. and Surya Systems.",
    "1. Confidential Information. The parties agree to hold all proprietary",
    "metadata, weights, and fine-tuning configurations confidential...",
    "Signed by: Alpha Labs Representative / Surya Teja"
  ]
}`
                },
                {
                    json: `{
  "model_used": "Qwen-VL-Chat / watsonx.ai",
  "inference_latency_ms": 480,
  "extracted_schema": {
    "agreement_type": "Mutual Non-Disclosure Agreement",
    "effective_date": "2026-06-20",
    "parties": [
      {
        "role": "Disclosing Party",
        "entity_name": "Alpha Labs Inc."
      },
      {
        "role": "Receiving Party",
        "entity_name": "Surya Systems"
      }
    ],
    "confidential_clauses": [
      "Proprietary metadata, model weights, and fine-tuning configurations"
    ],
    "signees": [
      "Alpha Labs Representative",
      "Surya Teja"
    ]
  }
}`
                }
            ]
        }
    };

    const docSelectBtns = document.querySelectorAll('.doc-select-btn');
    const nextPipelineBtn = document.getElementById('next-pipeline-btn');
    const pipelineSteps = document.querySelectorAll('.p-step');
    const pipelineOutputJson = document.getElementById('pipeline-output-json');
    const docViewerTitle = document.getElementById('doc-viewer-title');
    
    const contentInvoice = document.getElementById('content-invoice');
    const contentContract = document.getElementById('content-contract');
    const yoloBoxes = document.querySelectorAll('.yolo-box');

    let currentDoc = 'invoice';
    let currentStep = 1; // 1 to 3

    function updateDocSelection(docType) {
        currentDoc = docType;
        currentStep = 1;
        docViewerTitle.textContent = pipelineData[docType].title;

        // Switch canvas content
        if (docType === 'invoice') {
            contentInvoice.classList.remove('hidden');
            contentContract.classList.add('hidden');
        } else {
            contentInvoice.classList.add('hidden');
            contentContract.classList.remove('hidden');
        }

        // Toggle active button styling
        docSelectBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-doc') === docType) {
                btn.classList.add('active');
            }
        });

        executePipelineStage();
    }

    function executePipelineStage() {
        // Update vertical progress dots
        pipelineSteps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            step.classList.remove('active', 'completed');
            if (stepNum === currentStep) {
                step.classList.add('active');
            } else if (stepNum < currentStep) {
                step.classList.add('completed');
            }
        });

        // Toggle visual elements based on stage
        if (currentStep === 1) {
            // Stage 1: YOLO boxes shown
            yoloBoxes.forEach(box => box.classList.remove('hidden'));
            
            // Adjust overlay bounding box classes specifically for Ndas or Invoices
            const headerBox = document.querySelector('.yolo-header');
            const vendorBox = document.querySelector('.yolo-vendor');
            const tableBox = document.querySelector('.yolo-table');
            const totalBox = document.querySelector('.yolo-total');

            if (currentDoc === 'invoice') {
                headerBox.style.cssText = "top: 10px; left: 10px; width: 400px; height: 50px; border-color:#ff007f; background:rgba(255,0,127,0.05);";
                headerBox.setAttribute('data-label', 'Invoice Header (98%)');
                
                vendorBox.style.cssText = "top: 70px; left: 10px; width: 200px; height: 45px; border-color:#00f0ff; background:rgba(0,240,255,0.05);";
                vendorBox.setAttribute('data-label', 'Vendor Address (95%)');
                
                tableBox.style.cssText = "top: 125px; left: 10px; width: 400px; height: 100px; border-color:#8a2be2; background:rgba(138,43,226,0.05);";
                tableBox.setAttribute('data-label', 'Table Block (99%)');

                totalBox.style.cssText = "bottom: 10px; right: 10px; width: 140px; height: 30px; border-color:#39ff14; background:rgba(57,255,20,0.05);";
                totalBox.setAttribute('data-label', 'Total Value (97%)');
                totalBox.classList.remove('hidden');
            } else {
                headerBox.style.cssText = "top: 10px; left: 10px; width: 400px; height: 35px; border-color:#ff007f; background:rgba(255,0,127,0.05);";
                headerBox.setAttribute('data-label', 'NDA Title (99%)');
                
                vendorBox.style.cssText = "top: 55px; left: 10px; width: 400px; height: 60px; border-color:#00f0ff; background:rgba(0,240,255,0.05);";
                vendorBox.setAttribute('data-label', 'Parties Segment (96%)');
                
                tableBox.style.cssText = "top: 125px; left: 10px; width: 400px; height: 70px; border-color:#8a2be2; background:rgba(138,43,226,0.05);";
                tableBox.setAttribute('data-label', 'Confidential Clause (94%)');

                totalBox.style.cssText = "bottom: 15px; left: 10px; width: 400px; height: 40px; border-color:#ff007f; background:rgba(255,0,127,0.05);";
                totalBox.setAttribute('data-label', 'Signatures (98%)');
                totalBox.classList.remove('hidden');
            }

        } else if (currentStep === 2) {
            // Stage 2: OCR Alignment (We can flash or blur boundaries, hide yolo boxes)
            yoloBoxes.forEach(box => box.classList.add('hidden'));

        } else if (currentStep === 3) {
            // Stage 3: Structured VLM Extraction
            yoloBoxes.forEach(box => box.classList.add('hidden'));
        }

        // Output JSON in syntax panel
        pipelineOutputJson.textContent = pipelineData[currentDoc].stages[currentStep - 1].json;
        
        // Disable/enable next button text
        if (currentStep === 3) {
            nextPipelineBtn.innerHTML = `Restart Pipeline <i class="fa-solid fa-rotate-left"></i>`;
        } else {
            nextPipelineBtn.innerHTML = `Next Pipeline Stage <i class="fa-solid fa-arrow-right"></i>`;
        }
    }

    docSelectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            updateDocSelection(btn.getAttribute('data-doc'));
        });
    });

    nextPipelineBtn.addEventListener('click', () => {
        if (currentStep === 3) {
            currentStep = 1;
        } else {
            currentStep++;
        }
        executePipelineStage();
    });

    updateDocSelection('invoice'); // Initial run for doc pipeline

    // ==========================================
    // CONTACT FORM SUBMISSION MOCK
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnHTML = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending message...`;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;

            formStatus.classList.remove('hidden', 'error');
            formStatus.classList.add('success');
            formStatus.textContent = "Thank you! Your mock message was processed successfully.";

            contactForm.reset();

            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 5000);
        }, 1500);
    });

});
