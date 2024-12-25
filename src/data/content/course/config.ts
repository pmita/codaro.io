export const PRETTY_CODE_CONFIG = {
  theme: 'github-dark',
  keepBackground: true,
  onVisitLine(node: { children: string | any[] }) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }]
    }
  },
  onVisitHighlightedLine(node: { properties: { className: string[] } }) {
    node.properties.className.push("line--highlighted")
  },
  onVisitHighlightedWord(node: { properties: { className: string[] } }) {
    node.properties.className = ["word--highlighted"]
  },
};