/* ==========================================================================
   HOME TAB · photo and links on the left, name and bio on the right
   ========================================================================== */

SITE.home = {
  name: "Jun Ma, PhD",

  photo: "images/profile/jun-ma.jpg",
  photoAlt: "Portrait of Jun Ma",

  // Links under the photo, each with an icon.
  //   label  what the link is called (this is the link text)
  //   icon   one of: "email", "scholar", "code", "chat", "briefcase", "link"
  //          or the path of your own image, e.g. "images/icons/my-icon.svg"
  //   text   (optional) shown in place of the label, e.g. the email address
  //   url    where it goes. With no url, an entry that has "text" is shown as plain text
  //          (as the email is, so the address is not left in the page for spam robots);
  //          an entry with neither is hidden.
  links: [
    { label: "Email", icon: "images/icons/outlook.png", text: "jun dot ma2 at uhn dot ca", url: "" },
    { label: "Google Scholar", icon: "images/icons/google-scholar.png", url: "https://scholar.google.com/citations?user=bW1UV4IAAAAJ&hl=en" },
    { label: "GitHub", icon: "images/icons/github.png", url: "https://github.com/JunMa11" },
    { label: "X", icon: "images/icons/x.png", url: "https://x.com/JunMa_AI4Health" },
    { label: "LinkedIn", icon: "images/icons/linkedin.png", url: "https://www.linkedin.com/in/jun-ma-867b34224/" },
    { label: "Hugging Face", icon: "images/icons/huggingface.png", url: "https://huggingface.co/FLARE-MedFM" },
  ],

  // Bio. Leave a blank line between paragraphs.
  // Links are written [text](https://address) and bold is **text**.
  bio: `
Welcome to my homepage! I am a Scientist at Princess Margaret Cancer Centre, Machine Learning Lead at the UHN AI Hub, and Assistant Professor in the Department of Medical Biophysics at the University of Toronto. I received my PhD in Mathematics from Nanjing University of Science and Technology in 2021, supervised by [Prof. Xiaoping Yang](https://math.nju.edu.cn/en/People/Faculty/20200501/i74493.html). From 2021 to 2024, I was a Postdoctoral Fellow at the University of Toronto, the Vector Institute, and the Peter Munk Cardiac Centre, working with [Prof. Bo Wang](https://scholar.google.ca/citations?user=37FDILIAAAAJ&hl=en).

My research focuses on developing cutting-edge algorithms for accurate and efficient biomedical image parsing, with the goal of enabling precise cancer analysis and personalized patient care. As first author, I placed in the top three in more than 10 international medical image analysis challenges during my PhD and postdoctoral training. I have also built large-scale benchmarks and organized international competitions, including the MICCAI FLARE (Fast, Low-resource, Accurate, Robust, and Effectual Medical Image Analysis) Challenges and the CVPR challenges on foundation models for medical image analysis.

I am very fortunate to work with many amazing researchers and students. We are always looking for talented individuals to join the FLARE Lab. If you are interested, please feel free to contact me by email.
`,

  // News, shown under the bio. Newest first, one item per line:
  //   MM/YYYY: what happened, with links written [text](https://address)
  // To add an item, add a line at the top. To hide the section, delete every line.
  newsTitle: "News",
  news: `
10/2026: [Tissue Clocks](https://ryanwkha.github.io/tissue-clocks-minicourse/) mini-course won 2nd place in the [MICCAI Educational Challenge](https://miccai-sb.github.io/materials.html)
10/2026: MICCAI 2026 [FLARE Challenges](https://flare-medfm.github.io/)
09/2026: [MedJev](https://github.com/JunMa11/MedJev) for Ultra-fast Clinical Variable Extraction from Free-text Notes
06/2026: CVPR 2026 Workshop on [Foundation Models for Medical Vision](https://fmv-cvpr26workshop.github.io/) (recordings are available)
`,
};
