export function generateData() {
  return [
    // Input and context management techniques
    {
      name: "Prompt Engineering",
      category: "input",
      x: 1.8, // Mature (right side)
      y: 2.1, // Effective (top)
      maturity: "mature",
      effectiveness: "effective",
    },
    {
      name: "RAG",
      category: "context",
      x: 1.75, // Mature (right side)
      y: 1.75, // Effective (top)
      maturity: "mature",
      effectiveness: "effective",
    },
    {
      name: "Context Engineering",
      category: "context",
      x: 0.8, // Emerging (left side)
      y: 2.1, // Effective (top)
      maturity: "emerging",
      effectiveness: "effective",
    },
    {
      name: "Rules / AGENT.md",
      category: "context",
      x: 0.9, // Emerging (left side)
      y: 1, // Limited Effectiveness (bottom)
      maturity: "emerging",
      effectiveness: "limited",
    },
    {
      name: "Knowledge / Memory",
      category: "context",
      x: 0.65, // Emerging (left side)
      y: 0.75, // Limited Effectiveness (bottom)
      maturity: "emerging",
      effectiveness: "limited",
    },
    // Tools techniques
    {
      name: "Tool Calls",
      category: "tools",
      x: 2.0, // Mature (right side)
      y: 1.9, // Effective (top)
      maturity: "mature",
      effectiveness: "effective",
    },
    {
      name: "MCP Servers",
      category: "tools",
      x: 0.8, // Emerging (left side)
      y: 1.25, // Limited Effectiveness (bottom)
      maturity: "emerging",
      effectiveness: "limited",
    },
    {
      name: "AST / Codemap",
      category: "tools",
      x: 0.75, // Emerging (left side)
      y: 1.65, // Effective (top)
      maturity: "emerging",
      effectiveness: "effective",
    },
    // Agents techniques
    {
      name: "Parallel Agents",
      category: "agents",
      x: 0.9, // Emerging (left side)
      y: 1.85, // Effective (top)
      maturity: "emerging",
      effectiveness: "effective",
    },
    {
      name: "Sub-Agents",
      category: "agents",
      x: 0.75, // Emerging (left side)
      y: 1.1, // Limited Effectiveness (bottom)
      maturity: "emerging",
      effectiveness: "limited",
    },
  ];
}
