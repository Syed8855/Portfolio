export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  outcome: string;
  whyChosen: string;
  communityImpact: string;
  improvement: string;
  learnings: string[];
  featured?: boolean;
  repo?: string;
  demo?: string;
  isCompact?: boolean;
  originNote?: string;
};

export const projects: Project[] = [
  {
    slug: "athenaeum",
    name: "Athenaeum",
    category: "RAG / Applied AI",
    description:
      "RAG library-policy chatbot featuring a FastAPI backend, FAISS + fastembed retrieval pipeline, and Vercel frontend. Grounded query-answering over official regulations.",
    stack: ["FastAPI", "FAISS", "fastembed", "Python", "Vercel"],
    outcome:
      "Grounded conversational question-answering over library policy documents.",
    whyChosen:
      "Official institutional guidelines and library regulations are lengthy and tedious to search manually. Athenaeum provides grounded retrieval with strict verification against source context.",
    communityImpact:
      "Allows students and academic staff to obtain precise, verified policy answers without manual document skimming.",
    improvement:
      "Built as a modular decoupled system: an asynchronous FastAPI vector-search service decoupled from the Vercel frontend.",
    learnings: [
      "Engineered low-latency dense vector search using fastembed and FAISS.",
      "Structured contextual document chunking and retrieval thresholding.",
      "Grounded LLM responses strictly on retrieved policy passages to prevent hallucination.",
    ],
    featured: true,
  },
  {
    slug: "breathewish",
    name: "BreatheWish",
    category: "Medical AI / Vision",
    description:
      "AI-assisted chest radiograph screening and clinical triage platform featuring a DenseNet-121 classification backbone, Grad-CAM visual explainability, and a decoupled FastAPI clinical workflow service.",
    stack: ["PyTorch", "DenseNet-121", "Grad-CAM", "FastAPI", "Next.js", "PostgreSQL"],
    outcome:
      "Achieved 90.89% test accuracy and 0.9906 ROC-AUC with verified Grad-CAM saliency maps for clinical audibility.",
    whyChosen:
      "Emergency radiograph queues cause diagnostic bottlenecks for acute pulmonary consolidation. BreatheWish provides instant preliminary screening and interpretable saliency heatmaps to assist clinicians.",
    communityImpact:
      "Open-source clinical prototype demonstrating interpretable deep learning triage with fail-closed safety contracts.",
    improvement:
      "Integrated automated Grad-CAM explainability and asynchronous physician-patient communication channels.",
    learnings: [
      "Trained and evaluated a DenseNet-121 architecture achieving 98.25% specificity on normal radiographs.",
      "Engineered real-time Grad-CAM saliency heatmaps overlaid on medical DICOM/radiograph imagery.",
      "Built a fail-closed API architecture with role-based access control across doctor and patient workflows.",
    ],
    featured: true,
    repo: "https://github.com/SyedHasnain04/BreatheWish",
    demo: "https://breathewish.vercel.app",
  },
  {
    slug: "federated-clinical-intelligence",
    name: "Federated Clinical Intelligence",
    category: "Distributed ML",
    description:
      "Self-evolving federated multimodal platform for decentralized clinical data processing and privacy-preserving model synchronization.",
    stack: ["Federated Learning", "Multimodal ML", "PyTorch", "Python"],
    outcome:
      "Decentralized collaborative training architecture preserving hospital data confidentiality.",
    whyChosen:
      "Healthcare datasets cannot be aggregated into a central repository due to strict patient confidentiality and privacy regulations.",
    communityImpact:
      "Demonstrates multi-node model convergence without exposing raw clinical records across hospital boundaries.",
    improvement:
      "Decentralized parameter synchronization across distributed nodes without centralized record sharing.",
    learnings: [
      "Handled heterogeneous data distributions across federated client nodes.",
      "Balanced local epoch training against global aggregation latency.",
      "Structured multimodal tensor pipelines under strict local-privacy constraints.",
    ],
  },
  {
    slug: "j-lens-bias",
    name: "J-Lens Bias",
    category: "Interpretability",
    description:
      "Interpretability research using the anthropics/jacobian-lens repository on Qwen models. Covers BBQ bias analysis, activation-steering experiments, and negative random-direction controls that overturned an early result.",
    stack: ["Interpretability", "Jacobian Lens", "Qwen", "PyTorch", "Python"],
    outcome:
      "Demonstrated the necessity of random-direction negative controls in model steering evaluations.",
    whyChosen:
      "Validating whether activation-steering vectors reflect genuine mechanisms requires rigorous control baselines rather than selective confirmation.",
    communityImpact:
      "Open interpretability contribution shared with the Cohere Labs community emphasizing rigorous negative-control methodology.",
    improvement:
      "Revealed that initial steering metrics were matched by random direction controls, establishing strict evaluation standards.",
    learnings: [
      "Conducted layerwise Jacobian Lens analysis on open-weight Qwen models.",
      "Ran systematic BBQ bias benchmark evaluations across demographic categories.",
      "Designed null-hypothesis random direction controls that proved vital for valid interpretability claims.",
    ],
    repo: "https://github.com/SyedHasnain04/j-lens-bias",
    isCompact: true,
  },
  {
    slug: "library-rag-system",
    name: "Library RAG System",
    category: "AI / RAG",
    description:
      "Interactive library search and question-answering prototype built with Streamlit for V3 National Hackathon 2026; served as the origin prototype for Athenaeum.",
    stack: ["RAG", "Streamlit", "Python"],
    outcome: "Built for V3 National Hackathon 2026.",
    whyChosen:
      "Library catalogs are difficult to query conversationally. RAG offers a direct method to make book records conversational.",
    communityImpact:
      "Offered an interactive prototype for students to locate materials by descriptive topic.",
    improvement:
      "Origin hackathon prototype that validated user needs and led directly to the decoupled Athenaeum system.",
    learnings: [
      "Implemented initial document retrieval and grounded prompt construction.",
      "Built a rapid interactive UI for hackathon demonstration.",
    ],
    originNote: "Prototype origin of Athenaeum",
    isCompact: true,
  },
  {
    slug: "warehouse-execution-system",
    name: "Warehouse Execution System Optimization",
    category: "AI / Optimization",
    description:
      "Decision-support system combining productivity prediction, SKU clustering, and quantum-inspired order sequencing for warehouse fulfillment.",
    stack: ["Python", "Regression", "Clustering", "Optimization"],
    outcome: "Validated warehouse throughput improvements in simulation.",
    whyChosen:
      "Warehouse logistics present high-impact real-world constraints where route and sequencing optimization reduces travel time.",
    communityImpact:
      "Helps logistics operators test sequencing heuristics using existing order history.",
    improvement:
      "Simulation benchmark showed consistent throughput gains across diverse batch sizes.",
    learnings: [
      "Framed order sequencing as a constrained combinatorial optimization task.",
      "Combined clustering and regression into a unified execution workflow.",
    ],
    isCompact: true,
  },
  {
    slug: "ecobazarx",
    name: "EcoBazarX",
    category: "Full Stack",
    description:
      "Sustainable e-commerce platform that surfaces environmentally responsible alternatives and transparent product criteria.",
    stack: ["Python", "Flask", "Search", "Recommendations"],
    outcome: "Criteria-based filtering and preference-aware recommendations.",
    whyChosen:
      "Eco-conscious shopping is hindered when sustainability information is scattered.",
    communityImpact:
      "Assists consumers in comparing verified sustainable product criteria.",
    improvement:
      "Implemented custom ranking weights for sustainability attributes.",
    learnings: [
      "Built multi-criteria faceted search filters.",
      "Designed full-stack catalog architectures around clear user intent.",
    ],
    isCompact: true,
  },
  {
    slug: "image-similarity-search",
    name: "Image Similarity Search",
    category: "Computer Vision",
    description:
      "CNN feature extraction and FAISS vector index pipeline for visual nearest-neighbor image retrieval.",
    stack: ["Python", "CNN", "FAISS"],
    outcome: "Developed during Intel Unnati Industrial Training.",
    whyChosen:
      "Large image collections lack dense metadata, requiring embedding-based similarity lookup.",
    communityImpact:
      "Enables visual search workflows across unlabeled image archives.",
    improvement:
      "Applied approximate nearest-neighbor indexing with FAISS for fast multi-dimensional vector search.",
    learnings: [
      "Extracted intermediate CNN embeddings for visual representation.",
      "Benchmarked FAISS index performance on visual queries.",
    ],
    isCompact: true,
  },
];

export const skills = [
  ["Languages", ["Python", "SQL"]],
  [
    "AI / ML",
    [
      "Machine Learning",
      "LLM Fundamentals",
      "RAG",
      "Clustering",
      "Computer Vision",
      "Interpretability",
    ],
  ],
  ["Web", ["React", "Next.js", "FastAPI", "Node.js", "Express.js", "Flask"]],
  [
    "Tools",
    ["Git / GitHub", "Linux", "Jupyter", "VS Code", "FAISS", "fastembed", "PyTorch"],
  ],
] as const;

export const experiences = [
  {
    role: "ML Intern",
    company: "FlyRank",
    date: "Jun 2026 – Present",
    detail:
      "Completed machine learning engineering internship, focusing on production model pipelines and data processing workflows.",
  },
  {
    role: "Industrial Trainee",
    company: "Intel",
    date: "May 2026 – Jul 2026",
    detail:
      "Engineered BreatheWish, an AI-assisted chest radiograph screening and clinical triage platform featuring a DenseNet-121 classification backbone (90.9% test accuracy, 0.9906 ROC-AUC) with Grad-CAM visual explainability, FastAPI backend, and collaborative physician workflows.",
  },
  {
    role: "Community Member",
    company: "Cohere Labs",
    date: "2026",
    detail:
      "Conducted interpretability research on the J-Lens Bias project using the anthropics/jacobian-lens codebase on Qwen models, running BBQ evaluations and negative random-direction controls.",
  },
  {
    role: "Industrial Trainee",
    company: "Intel Unnati",
    date: "Dec 2025 – Jan 2026",
    detail:
      "Built a CNN embedding pipeline, FAISS nearest-neighbor indexing, and visual similarity retrieval workflow.",
  },
  {
    role: "Intern",
    company: "Infosys SpringBoard (Virtual)",
    date: "Oct 2025 – Dec 2025",
    detail:
      "Developed rule-based conversational logic and TF-IDF / cosine-similarity content recommendation modules.",
  },
];

export const achievements = [
  {
    title: "Winner — Datathon 2.0",
    meta: "IIITDM Kurnool, 2026",
    detail:
      "Awarded first place for an ML-powered warehouse execution and sequencing system.",
  },
  {
    title: "V3 National Hackathon",
    meta: "2026",
    detail:
      "Built a RAG-powered library management prototype that evolved into Athenaeum.",
  },
  {
    title: "AI Ignite & Devnovate Hackathon",
    meta: "2026",
    detail:
      "Engineered scene-level semantic segmentation using SegFormer architectures.",
  },
];
