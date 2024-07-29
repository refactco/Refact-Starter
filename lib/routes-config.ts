// for page navigation & to sort on leftbar
export const ROUTES = [
  {
    title: "Getting Started",
    href: "getting-started",
    items: [
      { title: "Introduction", href: "/introduction" },
      { title: "Installation", href: "/installation" },
      { title: "Explore Commands", href: "/explore-commands" },
      { title: "Project Structure", href: "/project-structure" },
    ],
  },
  {
    title: "Gutenberg Blocks",
    href: "gutenberg-blocks",
    items: [
      { title: "Using Gutenberg Blocks", href: "/quick-start" },
    ],
  },
  {
    title: "Performance Matters",
    href: "performance-matters",
    items: [
      { title: "Block Styles", href: "/block-styles" },
    ],
  },
];

export const page_routes = ROUTES.map(({ href, items }) => {
  return items.map((link) => {
    return {
      title: link.title,
      href: href + link.href,
    };
  });
}).flat();
