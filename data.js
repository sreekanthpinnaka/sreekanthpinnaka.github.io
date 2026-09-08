/**
 * Portfolio Data Model — Sreekanth Pinnaka (SP.)
 * Software Developer & AI / Data Systems Engineer
 */

window.PORTFOLIO_DATA = {
  // Personal Metadata
  profile: {
    name: 'Sreekanth Pinnaka',
    initials: 'SP.',
    title: 'Software Developer · AI & Data Systems Engineer',
    phone: '573-466-3671',
    email: 'sreekanth.ar104@gmail.com',
    location: 'United States',
    headline: 'Software developer building reliable systems, data pipelines, and practical AI tools.',
    bio: 'Software developer with close to 3 years of experience working on full-stack web applications, cloud data pipelines, and applied AI workflows. I enjoy building dependable software, learning deeply, and automating operational tasks.',
    education: [
      {
        degree: 'M.S. Artificial Intelligence (Remote)',
        institution: 'Indiana Wesleyan University',
        period: 'Jul 2026 — Present'
      },
      {
        degree: 'M.S. Computer Science (GPA: 3.61)',
        institution: 'Missouri University of Science and Technology',
        period: 'Aug 2021 — May 2023',
        coursework: 'Algorithms, Cloud Computing, Machine Learning in Computer Vision'
      }
    ]
  },

  // Navigation Items
  navItems: [
    { label: 'Home', href: 'index.html' },
    { label: 'Experience', href: 'experience.html' },
    { label: 'Projects', href: 'projects.html' },
    { label: 'Skills', href: 'skills.html' },
    { label: 'About', href: 'about.html' }
  ],

  // Social Channels & Contact
  socials: {
    email: 'sreekanth.ar104@gmail.com',
    phone: '573-466-3671',
    github: 'https://github.com/sreekanthpinnaka',
    linkedin: 'https://linkedin.com'
  },

  // 02 / Expertise Strip
  expertise: [
    {
      id: 'ai-agentic',
      title: 'AI & AGENTIC SYSTEMS',
      summary: 'LangGraph state machines, multi-agent debate protocols, RAG, MCP tool servers, and prompt injection defense.',
      skills: ['LangGraph', 'RAG', 'MCP', 'OpenAI APIs (o1, o3-mini, gpt-4o)', 'Prompt Engineering', 'Qdrant', 'pgvector', 'TruLens']
    },
    {
      id: 'software-eng',
      title: 'SOFTWARE ENGINEERING',
      summary: 'Asynchronous backend microservices, full-stack React & TypeScript apps, strict Pydantic validation, and REST APIs.',
      skills: ['Python 3.11+', 'FastAPI', 'React 19', 'TypeScript', 'SQL', 'REST APIs', 'SQLAlchemy', 'Git', 'Pytest']
    },
    {
      id: 'data-eng',
      title: 'DATA ENGINEERING',
      summary: 'Petabyte-scale PySpark processing, AWS Glue lakehouses, Airflow orchestration, and streaming event CDC.',
      skills: ['PySpark', 'Spark SQL', 'AWS Glue', 'ETL / ELT', 'Data Validation', 'Reconciliation', 'PostgreSQL', 'Airflow']
    },
    {
      id: 'cloud-infra',
      title: 'CLOUD & INFRASTRUCTURE',
      summary: 'Serverless event-driven architectures, automated Terraform IaC modules, and repeatable Jenkins CI/CD pipelines.',
      skills: ['AWS (Lambda, S3, SQS, SNS, EventBridge)', 'API Gateway', 'Terraform', 'Docker', 'Jenkins CI/CD', 'Linux']
    },
    {
      id: 'reliability-guardrails',
      title: 'RELIABILITY & SAFETY',
      summary: 'AST-level SQL guardrails (sqlglot), decoupled agent observability (langgraph-observe), New Relic, and CloudWatch.',
      skills: ['sqlglot AST Parser', 'langgraph-observe', 'New Relic', 'CloudWatch', 'Audit Logging', 'Error Handling', 'Claude Code', 'GitHub Copilot']
    }
  ],

  // 03 / Featured Projects (Case Studies)
  // 03 / Featured Projects
  featuredProjects: [
    {
      id: 'langgraph-observe',
      number: '01',
      title: 'LANGGRAPH-OBSERVE (AGENT APM TOOL)',
      category: 'DEVELOPER TOOLING & OBSERVABILITY',
      headline: 'A decoupled, lightweight tracing library and visualizer for stateful LangGraph agents.',
      description: 'An open-source developer tool for monitoring stateful LangGraph agents. Uses Python ContextVars to trace execution trees cleanly across parallel async tasks, diffs microsecond state changes between steps, scrubs sensitive data locally, and stores traces in SQLite without slowing down user requests. Tested with 101 unit tests.',
      technologies: ['Python 3.11+', 'FastAPI', 'LangGraph', 'Pydantic v2', 'SQLite WAL', 'SQLAlchemy', 'Mermaid.js'],
      flowSteps: ['Agent Runtime', 'ContextVar Tracer', 'In-Memory PII Masker', 'Non-blocking Queue', 'State Delta Engine', 'Interactive DAG UI'],
      github: 'https://github.com/sreekanthpinnaka/langgraph_observability_tool',
      caseStudy: '#case-study-01',
      spec: {
        tagline: 'Decoupled Observability for Stateful AI Agents',
        metrics: [
          { label: 'Unit Test Pass Rate', value: '101 / 101 (100%)' },
          { label: 'Added Client Latency', value: '0.00 ms (Decoupled)' },
          { label: 'Tree Accuracy', value: 'asyncio.gather safe' },
          { label: 'Standalone Binary', value: '49MB Footprint' }
        ],
        problem: 'Observing stateful LLM chains often introduces extra network latency, exposes sensitive inputs to third parties, or corrupts trace trees during concurrent async execution.',
        solution: 'Built a lightweight local tracer using Python ContextVars to maintain execution hierarchies across asynchronous tasks, an in-memory queue to isolate telemetry from client response paths, and SQLite WAL for local storage.',
        invariants: [
          'Tracing runs independently and does not interrupt agent execution',
          'Sensitive credentials and tokens are scrubbed locally before recording',
          'Execution trees remain accurate during concurrent async tasks'
        ]
      }
    },
    {
      id: 'ai-operations-agent',
      number: '02',
      title: 'AI OPERATIONS AGENT',
      category: 'AGENTIC AI & DATABASE SAFETY',
      headline: 'Autonomous relational database investigation paired with human clearance gates for consequential writes.',
      description: 'A hands-on learning and showcase project exploring how an AI agent can interact with a live 24-table relational database without breaking things or executing dangerous actions. Uses LangGraph to read and reason autonomously, while intercepting consequential write operations (sending emails, placing purchase orders, escalating tickets) at a human approval gate. Built with deterministic AST SQL guardrails powered by sqlglot.',
      technologies: ['Python 3.11+', 'FastAPI', 'LangGraph', 'OpenAI gpt-4o-mini', 'sqlglot AST', 'SQLAlchemy 2.0', 'Cloud SQL MySQL / SQLite', 'React 18', 'TypeScript'],
      flowSteps: [
        'User Prompt & Intent Analysis',
        'Autonomous Read Loop (LangGraph)',
        'AST SQL Guardrails (sqlglot)',
        'Safety Interception (Writes Paused)',
        'Human Clearance Gate (Review & Edit)',
        'Transactional Idempotent Execution',
        'Immutable Audit Log (audit_events)'
      ],
      github: 'https://github.com/sreekanthpinnaka/AI-operations-Agent',
      caseStudy: '#case-study-02',
      spec: {
        tagline: 'Human-in-the-Loop Relational Operations & AST SQL Guardrails',
        metrics: [
          { label: 'Relational Scope', value: '24 Tables · 4 Views · 7 Domains' },
          { label: 'Consequential Writes', value: '100% Staged for Approval' },
          { label: 'Destructive DDL / Injections', value: '100% Blocked via AST' },
          { label: 'Query Safety Clamp', value: 'Auto LIMIT 100' }
        ],
        problem: 'Most AI agent demos fall into two extremes: either passive chatbots that cannot interact with internal systems, or agents given raw database write access without safety guardrails, risking unintended deletes, data corruption, or spamming customers. Relying on LLM prompts to "please be safe" or fragile regex filters is easily bypassed.',
        solution: 'Implements Human-in-the-Loop (HITL) Operations: the AI reads and investigates autonomously to gather evidence and draft solutions, but intercepts all consequential mutations into pending review cards. Operators inspect payloads, edit fields inline, and approve or reject actions. Concurrently, an AST parsing layer using sqlglot deterministically enforces table whitelisting, rejects DROP/ALTER/TRUNCATE with HTTP 403, and clamps queries to LIMIT 100.',
        invariants: [
          'Autonomous Read / Gated Write separation guarantees no consequential action executes without sign-off',
          'sqlglot AST parser validates queries against a 24-table whitelist and blocks access to system tables',
          'Destructive DDL statements (DROP, ALTER, TRUNCATE) and unconstrained WHERE clauses are rejected with HTTP 403',
          'Staged PendingAction cards provide inline modal payload editing for human operator oversight',
          'Cryptographic UUID execution keys enforce transactional idempotency, preventing accidental double-clicks',
          'Immutable audit_events table logs the full lifecycle of every prompt, tool call, and operator decision',
          'Enterprise domain model spans 7 functional areas: Finance, Identity, Support, Supply Chain, RBAC, Collaboration, Governance',
          'Dual database flexibility: connects to Google Cloud SQL (MySQL 8.0) or auto-seeded local SQLite (gemini_ops.db)'
        ]
      }
    },
    {
      id: 'ai-debate-simulator',
      number: '03',
      title: 'AI DEBATE ARENA',
      category: 'MULTI-AGENT SYSTEMS',
      headline: 'A multi-agent experiment streaming debates with structured judging and radar analytics.',
      description: 'A multi-agent project where two models debate a topic and an impartial judge evaluates each round across logic, evidence, and clarity. Uses an asyncio queue to stream both perspectives concurrently, cutting round wait times in half.',
      technologies: ['Python 3.11+', 'FastAPI', 'AsyncIO', 'React 19', 'TypeScript', 'Server-Sent Events', 'Recharts'],
      flowSteps: ['Debate Topic', 'Concurrent SSE Stream (PRO vs CON)', 'Rebuttal Cross-Exam', 'Judge 5-Axis Radar', 'Audience Prediction', 'Client TTS Audio'],
      github: 'https://github.com/sreekanthpinnaka/Ai_debate',
      caseStudy: '#case-study-03',
      spec: {
        tagline: 'Multi-Agent Interaction & Real-Time Streaming',
        metrics: [
          { label: 'Agent Roles', value: 'PRO, CON, Judge' },
          { label: 'Turn Wait Time', value: 'Reduced ~50%' },
          { label: 'Evaluation Matrix', value: '5-Axis Recharts Radar' },
          { label: 'Client Narration', value: 'Browser Web Speech' }
        ],
        problem: 'Running multiple LLM agents sequentially can cause significant wait times for users, and comparing arguments requires structured evaluation criteria.',
        solution: 'Implemented an asynchronous queue to stream responses in parallel over Server-Sent Events, combined with structured prompt templates for unbiased round evaluations.',
        invariants: [
          'Agents operate with separated context prompts during debate rounds',
          'Judge evaluation occurs only after arguments are recorded',
          'Parameters adapt cleanly across standard and reasoning models'
        ]
      }
    }
  ],

  // 04 / More Things I've Built (Kept strictly to the 2 requested items)
  explorerProjects: [
    {
      id: 'exp-1',
      name: 'LangGraph RAG Application',
      category: 'AI',
      description: 'Internal document search with PDF processing, metadata chunking, and pgvector semantic retrieval with direct source citations.',
      techStack: ['Python', 'LangGraph', 'FastAPI', 'pgvector'],
      year: '2025',
      github: 'https://github.com/sreekanthpinnaka'
    },
    {
      id: 'exp-2',
      name: 'MCP Email Automation Agent',
      category: 'AI',
      description: 'A tool-calling assistant connecting to mail services via the Model Context Protocol to help search, summarize, and draft replies.',
      techStack: ['Python', 'MCP', 'FastAPI', 'Pydantic'],
      year: '2026',
      github: 'https://github.com/sreekanthpinnaka'
    }
  ],

  // 05 / Experience / Career Journey
  experience: [
    {
      id: 'infosoft',
      period: 'Jul 2023 — Mar 2026',
      role: 'SOFTWARE DEVELOPER',
      company: 'INFOSOFT INC.',
      location: 'United States',
      summary: 'Worked on full-stack web tools, cloud data pipelines, and internal AI applications. Built LangGraph RAG systems, PySpark data pipelines on AWS Glue, operational React dashboards, and automated infrastructure with Terraform.',
      accomplishments: [
        'Built a LangGraph RAG application with PDF ingestion, metadata-rich chunking, embeddings, pgvector retrieval, and FastAPI; delivered evidence-backed answers with source citations, cutting manual search time across partner documents.',
        'Developed a responsive React and TypeScript dashboard backed by FastAPI, PostgreSQL, and SQL; delivered reusable filters, schema validation, and API integrations for order tracking, shipment visibility, invoice analysis, and workflow status.',
        'Modernized slow, repetitive weekly SQL processing into reusable PySpark pipelines orchestrated through Airflow and configured via YAML; optimized AWS Glue partitioning and joins to improve processing speed by 25% and cut setup time for new sources by 50%.',
        'Designed an event-driven ingestion architecture using S3, Lambda, AWS Glue, and PySpark that selected workflows by file type, reducing manual intervention by 90% and improving consistency across recurring data loads.',
        'Created reusable Terraform modules for Lambda, SQS, API Gateway, and load balancers integrated with Jenkins CI/CD, slashing environment provisioning time by 80% with repeatable, version-controlled deployments.',
        'Implemented unit tests, schema and reconciliation checks, New Relic and CloudWatch monitoring, and EventBridge/SNS failure alerts, providing near-real-time issue visibility and troubleshooting guidance for engineering teams.'
      ],
      technologies: ['Python', 'React', 'TypeScript', 'FastAPI', 'LangGraph', 'PySpark', 'AWS Glue', 'Terraform', 'PostgreSQL', 'Docker']
    },
    {
      id: 'mst-grad',
      period: 'Aug 2021 — May 2023',
      role: 'M.S. COMPUTER SCIENCE (GPA: 3.61)',
      company: 'MISSOURI UNIVERSITY OF SCIENCE AND TECHNOLOGY',
      location: 'Rolla, MO',
      summary: 'Completed rigorous graduate curriculum focused on Advanced Algorithms, Cloud Computing Systems, and Machine Learning in Computer Vision.',
      accomplishments: [
        'Conducted research into distributed cloud systems, algorithmic efficiency, and machine learning computer vision pipelines.',
        'Maintained a 3.61 GPA across advanced systems engineering and computational theory coursework.',
        'Designed and presented architectural analyses of distributed data stores and high-concurrency cloud frameworks.'
      ],
      technologies: ['Python', 'C++', 'Cloud Computing', 'Algorithms', 'Machine Learning', 'Linux']
    },
    {
      id: 'iwu-ai',
      period: 'Jul 2026 — Present',
      role: 'M.S. ARTIFICIAL INTELLIGENCE (REMOTE)',
      company: 'INDIANA WESLEYAN UNIVERSITY',
      location: 'Remote',
      summary: 'Pursuing advanced graduate research in Artificial Intelligence, focusing on autonomous multi-agent reasoning, guardrail architectures, and empirical LLM evaluation.',
      accomplishments: [
        'Investigating multi-agent consensus protocols, cognitive bias mitigation in LLM judges, and AST-level query validation.',
        'Developing reproducible benchmarks for measuring context faithfulness, hallucination frequency, and agentic tool loop stability.'
      ],
      technologies: ['LangGraph', 'Agentic Systems', 'Evaluation Harnesses', 'LLM Safety', 'AI Observability']
    }
  ],

  // 06 / System Toolbox & Skill Clusters
  skillClusters: [
    {
      id: 'cluster-ai',
      category: 'AI & AGENTIC SYSTEMS',
      description: 'Autonomous state machines, grounded retrieval, and evaluation.',
      skills: [
        { name: 'LangGraph', usage: 'Multi-agent state machines, cyclic critique loops, and human clearance gates' },
        { name: 'RAG & pgvector', usage: 'Metadata-rich PDF chunking, hybrid retrieval, and evidence citation stages' },
        { name: 'OpenAI APIs (o1, o3-mini, gpt-4o)', usage: 'Reasoning model parameter adaptation and strict JSON Schema output enforcement' },
        { name: 'MCP (Model Context Protocol)', usage: 'Standardized tool-using agents for email search, summarization, and triage' },
        { name: 'Prompt Engineering & Safety', usage: 'Multi-tier prompt injection defense, untrusted payload isolation, and bias mitigation' },
        { name: 'Qdrant & Vector DBs', usage: 'HNSW vector indexing and cosine distance semantic similarity lookups' }
      ]
    },
    {
      id: 'cluster-software',
      category: 'SOFTWARE ENGINEERING & APIS',
      description: 'High-throughput backends, resilient typing, and modern interfaces.',
      skills: [
        { name: 'Python 3.11+', usage: 'AsyncIO concurrency, FastAPI services, AST parsers, and automated test harnesses' },
        { name: 'FastAPI', usage: 'High-performance ASGI endpoints, Server-Sent Events (SSE), and Pydantic v2 schemas' },
        { name: 'React 19 & TypeScript', usage: 'Operational KPI dashboards, Recharts 5-axis radar charts, and interactive workspaces' },
        { name: 'SQL & PostgreSQL', usage: 'Normalized relational schemas (24 tables), pgvector extensions, and complex joins' },
        { name: 'SQLAlchemy 2.0', usage: 'Connection pooling with pre-ping validation, binary UUIDs, and transactions' },
        { name: 'Unit Testing (Pytest)', usage: '100% automated test coverage across streaming queues, fallback logic, and AST rules' }
      ]
    },
    {
      id: 'cluster-data',
      category: 'DATA PLATFORMS & PIPELINES',
      description: 'Distributed computation, automated ETL, and data reconciliation.',
      skills: [
        { name: 'PySpark & Spark SQL', usage: 'Large-dataset transformations, partitioning optimization, and 25% speedup gains' },
        { name: 'AWS Glue', usage: 'Serverless ETL jobs, dynamic partitioning, and YAML-configured data pipelines' },
        { name: 'Apache Airflow', usage: 'Automated DAG scheduling, dependency management, and weekly batch execution' },
        { name: 'Data Validation & Reconciliation', usage: 'Schema enforcement, automated data reconciliation checks, and drift alerts' },
        { name: 'Event-Driven Ingestion', usage: 'S3, Lambda, and PySpark pipeline routing automated by file type' }
      ]
    },
    {
      id: 'cluster-cloud',
      category: 'CLOUD & INFRASTRUCTURE',
      description: 'Declarative IaC, serverless event hubs, and CI/CD pipelines.',
      skills: [
        { name: 'AWS Lambda & S3', usage: 'Event-driven compute and object storage backbones for data lakehouse routing' },
        { name: 'AWS SQS, SNS & EventBridge', usage: 'Asynchronous event decoupling, messaging queues, and automated failure alerts' },
        { name: 'Terraform (IaC)', usage: 'Reusable infrastructure modules reducing environment provisioning time by 80%' },
        { name: 'Docker & Jenkins CI/CD', usage: 'Containerized microservices and automated build/test deployment pipelines' },
        { name: 'API Gateway', usage: 'Managed REST API routing, rate limiting, and secure cloud ingress' }
      ]
    },
    {
      id: 'cluster-reliability',
      category: 'RELIABILITY & MLOPS',
      description: 'AST query guardrails, agent observability, and APM monitoring.',
      skills: [
        { name: 'sqlglot (AST Guardrails)', usage: 'Abstract Syntax Tree parsing enforcing table whitelisting and blocking destructive SQL' },
        { name: 'langgraph-observe', usage: 'Decoupled agent observability, microsecond state deltas, and tool loop detection' },
        { name: 'New Relic & CloudWatch', usage: 'Near-real-time service monitoring, metric alarms, and audit logging' },
        { name: 'Claude Code & Copilot', usage: 'AI-assisted development, rapid prototyping, and automated refactoring' }
      ]
    }
  ],

  // 07 / Engineering Philosophy Principles
  principles: [
    {
      number: '01',
      title: 'BUILD FOR FAILURE & SAFETY',
      detail: 'Zero unconstrained writes. Enforce deterministic AST guardrails, query clamping (LIMIT 100), and automated offline fallbacks so the system never fails catastrophically.'
    },
    {
      number: '02',
      title: 'KEEP HUMANS IN CONTROL',
      detail: 'Consequential financial, permissions, and external communication writes must pause at an idempotent Human Clearance Gate with cryptographic execution keys.'
    },
    {
      number: '03',
      title: 'MEASURE THE SYSTEM DEEPLY',
      detail: 'Token spend, microsecond state deltas, and tool invocation counts must be transparently observable without adding runtime latency to client requests.'
    },
    {
      number: '04',
      title: 'SOLVE THE ACTUAL PROBLEM',
      detail: 'Technology matters when it delivers measurable impact: cutting partner document search time, boosting PySpark runtimes by 25%, and reducing manual intervention by 90%.'
    }
  ],

  // 08 / Currently Exploring
  exploring: [
    {
      id: 'mcp-protocols',
      topic: 'Model Context Protocol (MCP)',
      tag: 'INTEGRATION',
      explanation: 'Building standardized tool-using agents that securely discover, authenticate, and manipulate enterprise tools without brittle ad-hoc glue code.'
    },
    {
      id: 'ast-guardrails',
      topic: 'AST-Level SQL Guardrails',
      tag: 'SAFETY',
      explanation: 'Parsing raw queries into formal Abstract Syntax Trees with sqlglot to eliminate injection vectors and enforce table whitelists.'
    },
    {
      id: 'agent-observability',
      topic: 'Decoupled AI Agent APM',
      tag: 'OBSERVABILITY',
      explanation: 'Capturing microsecond state mutations and tracking concurrent async execution branches without introducing client-side latency.'
    },
    {
      id: 'adversarial-debates',
      topic: 'Adversarial Multi-Agent Debate',
      tag: 'EVALUATION',
      explanation: 'Pitting independent LLMs against each other in structured Oxford debates to evaluate logical fallacies, rebuttals, and cognitive bias.'
    },
    {
      id: 'reasoning-models',
      topic: 'Reasoning Model Adaptation',
      tag: 'LLM CORE',
      explanation: 'Normalizing API parameter differences across o1, o3-mini, and GPT-4o while enforcing strict Pydantic JSON Schema outputs.'
    },
    {
      id: 'lakehouse-optimizations',
      topic: 'Glue & PySpark Partition Tuning',
      tag: 'DATA INFRA',
      explanation: 'Optimizing cloud lakehouse joins and partition pruning to handle recursive large-dataset loads with 25%+ speed improvements.'
    }
  ],

  // 09 / Beyond Code
  beyondCode: {
    narrative: "When I'm not writing code or working on data pipelines, I enjoy reading papers, experimenting with open-source developer tools, and learning more about systems and algorithms.",
    pillars: [
      {
        label: 'RESEARCH & M.S.',
        detail: 'Graduate AI research at Indiana Wesleyan & M.S. Computer Science from Missouri S&T (GPA: 3.61).'
      },
      {
        label: 'OPEN SOURCE',
        detail: 'Authoring developer tools like langgraph-observe, AST security sandboxes, and multi-agent debate platforms.'
      },
      {
        label: 'OFFLINE',
        detail: 'Algorithms study, technical architecture writing, continuous learning, and distance running.'
      }
    ]
  }
};
