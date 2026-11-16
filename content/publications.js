/* ==========================================================================
   PUBLICATIONS TAB · a row of journal covers, then the list of selected papers
   --------------------------------------------------------------------------
   TO ADD A PAPER
   Paste its citation into "list" below as a new paragraph, with a blank line
   before and after. Newest first. Use the same style as the others:

     Authors. Title. Journal. Year;Volume:Pages. https://doi.org/...

   The site puts the title in bold, links it to the address at the end, and
   sets your name in bold. Mark equal contribution with * after the name.
   Extra links go at the end:  [Code](https://github.com/...)
   A line such as  ## 2026  adds a year heading.

   TO ADD A COVER TO THE TOP ROW
   Save the cover image in  images/covers/  and add a line to "highlights".
   ========================================================================== */

SITE.publications = {
  // Top row: short paper name (links to the paper), cover image, and journal name
  // (the journal name is not shown; it describes the cover for screen readers).
  highlights: [
    { name: "MedSAM", url: "https://doi.org/10.1038/s41467-024-44824-z", cover: "images/covers/nature-communications.jpg", journal: "Nature Communications" },
    { name: "Cell Segmentation", url: "https://doi.org/10.1038/s41592-024-02233-6", cover: "images/covers/nature-methods.jpg", journal: "Nature Methods" },
    { name: "FLARE Challenge", url: "https://doi.org/10.1016/S2589-7500(24)00154-7", cover: "images/covers/lancet-digital-health.jpg", journal: "The Lancet Digital Health" },
    { name: "AbdomenCT-1K", url: "https://doi.org/10.1109/TPAMI.2021.3100536", cover: "images/covers/ieee-tpami.jpg", journal: "IEEE Transactions on Pattern Analysis and Machine Intelligence" },
    { name: "Loss Odyssey", url: "https://doi.org/10.1016/j.media.2021.102035", cover: "images/covers/medical-image-analysis.jpg", journal: "Medical Image Analysis" },
  ],

  listTitle: "Selected Publications",
  fullListLabel: "Full List on Google Scholar",
  fullListUrl: "https://scholar.google.com/citations?user=bW1UV4IAAAAJ&hl=en",

  me: "Ma J",                     // set in bold wherever it appears in an author list
  note: "* Equal contribution",   // shown under the list

  list: `

Fallahpour A*, Ma J*, Munim A*, Lyu H, Wang B. MedRAX: medical reasoning agent for chest X-ray. Proceedings of the 42nd International Conference on Machine Learning. PMLR; 2025. p. 15661-15676. https://doi.org/10.48550/arXiv.2502.02673

Ma J, Zhang Y, Gu S, Ge C, Mae S, Young A, Zhu C, Yang X, Meng K, Huang Z, Zhang F, Pan Y, Huang S, Wang J, Sun M, Zhang R, Jia D, Choi JW, Alves N, de Wilde B, Koehler G, Lai H, Wang E, Wiesenfarth M, Zhu Q, Dong G, He J, FLARE Challenge Consortium, Wang B. Unleashing the strengths of unlabelled data in deep learning-assisted pan-cancer abdominal organ quantification: the FLARE22 challenge. The Lancet Digital Health. 2024 Nov;6(11):e815-e826. https://doi.org/10.1016/S2589-7500(24)00154-7

Ma J, Xie R, Ayyadhury S, Ge C, Gupta A, Gupta R, Gu S, Zhang Y, Lee G, Kim J, Lou W, Li H, Upschulte E, Dickscheid T, de Almeida JG, Wang Y, Han L, Yang X, Labagnara M, Gligorovski V, Scheder M, Rahi SJ, Kempster C, Pollitt A, Espinosa L, Mignot T, Middeke JM, Eckardt JN, Li W, Li Z, Cai X, Bai B, Greenwald NF, Van Valen D, Weisbart E, Cimini BA, Cheung T, Brück O, Bader GD, Wang B. The multimodality cell segmentation challenge: toward universal solutions. Nature Methods. 2024 Jun;21(6):1103-1113. https://doi.org/10.1038/s41592-024-02233-6

Ma J, He Y, Li F, Han L, You C, Wang B. Segment anything in medical images. Nature Communications. 2024 Jan 22;15(1):654. https://doi.org/10.1038/s41467-024-44824-z

Ma J, Zhang Y, Gu S, Zhu C, Ge C, Zhang Y, An X, Wang C, Wang Q, Liu X, Cao S, Zhang Q, Liu S, Wang Y, Li Y, He J, Yang X. AbdomenCT-1K: is abdominal organ segmentation a solved problem? IEEE Transactions on Pattern Analysis and Machine Intelligence. 2022 Oct;44(10):6695-6714. https://doi.org/10.1109/TPAMI.2021.3100536

Ma J, Chen J, Ng M, Huang R, Li Y, Li C, Yang X, Martel AL. Loss odyssey in medical image segmentation. Medical Image Analysis. 2021 Jul;71:102035. https://doi.org/10.1016/j.media.2021.102035

`,
};
