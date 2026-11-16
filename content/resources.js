/* ==========================================================================
   RESOURCES TAB · sections of links (datasets, models, code ...)
   --------------------------------------------------------------------------
   TO ADD A DATASET OR MODEL
   Copy one { ... } item below, paste it into the right section, and edit it.

   Each item takes:
     name         shown as the title; it links to url
     url          where the title goes
     description  one or two sentences
     video        (optional) a demo video in  videos/ , played beside the description
     poster       (optional) still image shown before the video plays
     videoCaption (optional) one line under the video
     links        (optional) extra buttons:  links: [ { label: "Paper", url: "https://..." } ]

   TO ADD A SECTION
   Copy a whole  { title: "...", items: [ ... ] }  block.
   ========================================================================== */

SITE.resources = {
  sections: [
    {
      title: "Datasets",
      items: [
        {
          name: "Public Medical Image Datasets for Segmentation Foundation Models",
          url: "https://medsam-datasetlist.github.io/",
          description: "A curated list of publicly accessible medical image segmentation datasets, organized by year, anatomy, and imaging modality.",
        },
        {
          name: "Pan-cancer Segmentation Dataset",
          url: "https://huggingface.co/datasets/FLARE-MedFM/PancancerCTSeg",
          description: "More than 17,000 labelled CT scans covering 11 cancer types, released for the MICCAI FLARE pan-cancer segmentation challenge.",
        },
        {
          name: "Datasets for Automated Medical Image Segmentation and Classification",
          url: "https://huggingface.co/datasets/FLARE-MedFM/FLARE-AutoMSC",
          description: "CT, MRI, and PET/CT collections with paired segmentation masks and diagnostic labels for brain, lung, liver, and prostate cancer, released for the MICCAI FLARE AutoMSC challenge.",
        },
      ],
    },

    {
      title: "Models and Code",
      items: [
        {
          name: "MedSAM",
          url: "https://github.com/bowang-lab/MedSAM",
          description: "Segment anything in medical images. A foundation model for universal medical image segmentation, trained on more than 1.5 million image–mask pairs across 10 imaging modalities and over 30 cancer types.",
          video: "videos/medsam-demo.mp4",
          poster: "videos/medsam-demo.jpg",
          videoCaption: "MedSAM segmenting organs and tumours in a CT scan from bounding-box prompts.",
          links: [
            { label: "Paper", url: "https://doi.org/10.1038/s41467-024-44824-z" },
          ],
        },
        {
          name: "MedSAM2",
          url: "https://github.com/bowang-lab/MedSAM2",
          description: "Segment anything in 3D medical images and videos. A promptable foundation model trained on more than 455,000 3D image–mask pairs and 76,000 video frames, spanning CT, PET, MRI, ultrasound, and endoscopy.",
          video: "videos/MedSAM2.mp4",
          poster: "videos/MedSAM2.jpg",
          videoCaption: "MedSAM2 segmenting organs and lesions in CT and MRI scans and in endoscopy and ultrasound videos.",
          links: [
            { label: "Project Page and Demos", url: "https://medsam2.github.io/" },
            { label: "Paper", url: "https://doi.org/10.48550/arXiv.2504.03600" },
          ],
        },
        {
          name: "MedJev",
          url: "https://github.com/JunMa11/MedJev",
          description: "Ultra-fast extraction of clinical variables from free-text notes. A compact model that turns clinical notes into table-ready data and runs on a single consumer GPU inside the hospital network, so patient text never leaves it.",
          video: "videos/MedJev.mp4",
          poster: "videos/MedJev.jpg",
          videoCaption: "MedJev's accuracy on each clinical variable, compared live with two other models.",
        },
        {
          name: "MICCAI-OpenSourcePapers",
          url: "https://github.com/JunMa11/MICCAI-OpenSourcePapers",
          description: "A curated list of MICCAI papers with open-source code, updated every year since 2019.",
        },
      ],
    },
  ],
};
