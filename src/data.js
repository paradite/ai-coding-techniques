export function generateData() {
  return [
    // Input and context management techniques
    {
      name: 'Prompt Engineering',
      category: 'Input and context management',
      x: 2.1, // Mature (right side)
      y: 2.1, // Effective (top)
      status: 'mature',
    },
    {
      name: 'RAG',
      category: 'Input and context management',
      x: 1.8, // Mature (right side)
      y: 1.9, // Effective (top)
      status: 'mature',
    },
    {
      name: 'Context Engineering',
      category: 'Input and context management',
      x: 1.0, // Emerging (left side)
      y: 1.8, // Effective (top)
      status: 'emerging',
    },
    {
      name: 'Rules / AGENT.md',
      category: 'Input and context management',
      x: 0.9, // Emerging (left side)
      y: 1.1, // Limited Effectiveness (bottom)
      status: 'emerging',
    },
    {
      name: 'Knowledge / Memory',
      category: 'Input and context management',
      x: 1.1, // Emerging (left side)
      y: 0.9, // Limited Effectiveness (bottom)
      status: 'emerging',
    },
  ];
}