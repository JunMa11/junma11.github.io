/* ==========================================================================
   SITE SETTINGS · name, tabs and footer
   ========================================================================== */

SITE.site = {
  name: "Jun Ma",          // used in the footer line "© 2026 Jun Ma"
  title: "Jun Ma, PhD",    // shown in the browser tab
  headerName: "FLARE Lab", // shown in white at the left of the blue header; leave empty for none

  // The tabs across the top, in order.
  // Each "id" has a matching file in this folder: content/<id>.js
  // To add a tab, see "Add a new tab" in README.md.
  tabs: [
    { id: "home", label: "Home" },
    { id: "research", label: "Research" },
    { id: "resources", label: "Resources" },
    { id: "publications", label: "Publications" },
  ],

  // Optional links in the grey footer, shown before the copyright line. For example:
  //   { name: "Princess Margaret Cancer Centre", url: "https://www.uhn.ca/PrincessMargaret" },
  // To show a logo instead of the name, add:  logo: "images/logos/your-file.png"
  affiliations: [],
};
