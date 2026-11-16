/* ==========================================================================
   RESEARCH TAB · one block per research area: figure on the left, text on the right
   --------------------------------------------------------------------------
   TO ADD A RESEARCH AREA
   1. Save its figure in  images/research/
   2. Copy one { ... } block below, paste it where it should appear, and edit it.

   Each block takes:
     title      heading
     image      figure file (click to enlarge on the site)
     imageAlt   one sentence describing the figure, for screen readers
     text       the paragraph. Blank line = new paragraph. [text](https://address) = link.
     video      (optional) a demo video in  videos/ , shown as a "Watch the demo" button
     poster     (optional) still image shown before the video plays
     videoLabel (optional) wording on that button
     links      (optional) extra buttons:  links: [ { label: "Code", url: "https://..." } ]
   ========================================================================== */

SITE.research = {
  intro: `
We are an interdisciplinary team studying how artificial intelligence can advance biomedical imaging and precision cancer care.
`,

  areas: [
    {
      title: "Medical image foundation models",
      image: "images/research/medsam.webp",
      imageAlt: "MedSAM segmentation results on CT, MRI, ultrasound, X-ray, endoscopy, pathology and other medical images from across the body.",
      text: `
We develop general-purpose models for identifying and quantifying anatomy and disease across imaging modalities. Building on MedSAM and MedSAM2, our work spans two-dimensional images, three-dimensional scans, and medical videos. We focus on reducing expert annotation requirements, improving generalization across clinical settings, and enabling efficient use on widely available hardware.
`,
    },

    {
      title: "Multimodal models",
      image: "images/research/multimodal.webp",
      imageAlt: "A model that combines whole-slide pathology images, prostate MRI and clinical data to predict a patient's risk over time.",
      text: `
We develop models that combine medical images and electronic health records to support disease characterization and personalized care. Our research includes vision–language models for CT report generation and models that integrate radiology, pathology, and clinical data to predict cancer recurrence. We investigate how these complementary data sources can improve clinical interpretation and patient risk assessment.
`,
    },

    {
      title: "Agentic systems",
      image: "images/research/medrax.webp",
      imageAlt: "MedRAX architecture: a reasoning agent that takes a user query, keeps memory, and calls specialized chest X-ray tools for visual question answering, report generation, segmentation, grounding, classification and image generation.",
      text: `
We build AI agents that combine language-based reasoning with specialized medical data analysis tools. Our work on MedRAX explores how agents select tools, coordinate multiple analysis steps, and integrate findings to address complex medical questions. We aim to develop transparent, auditable systems that assist clinicians with image interpretation and reporting while supporting expert oversight.
`,
      video: "videos/medrax-demo.mp4",
      poster: "videos/medrax-demo.jpg",
      videoLabel: "Watch the MedRAX Demo",
    },

    {
      title: "Benchmarks",
      image: "images/research/benchmark.webp",
      imageAlt: "Overview of the multimodality cell segmentation challenge: microscopy image types, participants around the world, and image and cell counts in the training and testing sets.",
      text: `
We establish large-scale, diverse datasets, international challenges, and evaluation frameworks to assess accuracy, generalizability, and computational efficiency. Our work includes the FLARE challenges, the multimodality cell segmentation challenge, ChestAgentBench, and the CVPR foundation model challenges, covering tasks from image segmentation to medical reasoning. We advance reproducible research through shared datasets, standardized evaluation protocols, and open-source software.
`,
    },
  ],
};
