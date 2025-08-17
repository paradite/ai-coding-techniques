import { generateData } from "./data.js";

// Color scheme for categories
const categoryColors = {
  input: "hsl(260, 60%, 65%)", // Purple
  context: "hsl(195, 60%, 65%)", // Blue
  tools: "hsl(120, 60%, 60%)", // Green
  agents: "hsl(30, 85%, 65%)", // Orange
};

const data = generateData();

// Get CSS variables and detect mobile
const rootStyles = getComputedStyle(document.documentElement);
const isMobile = window.innerWidth <= 767;

const margin = {
  top: parseInt(rootStyles.getPropertyValue("--margin-top")),
  right: isMobile
    ? 20
    : parseInt(rootStyles.getPropertyValue("--margin-right-desktop")),
  bottom: isMobile
    ? parseInt(rootStyles.getPropertyValue("--margin-bottom-mobile"))
    : parseInt(rootStyles.getPropertyValue("--margin-bottom")),
  left: isMobile ? 20 : parseInt(rootStyles.getPropertyValue("--margin-left")),
};

const totalWidth = isMobile
  ? window.innerWidth
  : parseInt(rootStyles.getPropertyValue("--viz-width-desktop"));
const totalHeight = isMobile
  ? parseInt(rootStyles.getPropertyValue("--viz-height-mobile"))
  : parseInt(rootStyles.getPropertyValue("--viz-height-desktop"));
const width = totalWidth - margin.left - margin.right;
const height = totalHeight - margin.top - margin.bottom;

const svg = d3
  .select(".viz")
  .append("svg")
  .attr("width", totalWidth)
  .attr("height", totalHeight);

const g = svg
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Scales
const xScale = d3.scaleLinear().domain([0.5, 2.5]).range([0, width]);

const yScale = d3.scaleLinear().domain([0.5, 2.5]).range([height, 0]);

// Quadrant backgrounds
g.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", width / 2)
  .attr("height", height / 2)
  .attr("fill", "hsla(230, 29%, 15%, 0.3)")
  .attr("stroke", "hsl(184, 30%, 25%)")
  .attr("stroke-width", 0.5);

g.append("rect")
  .attr("x", width / 2)
  .attr("y", 0)
  .attr("width", width / 2)
  .attr("height", height / 2)
  .attr("fill", "hsla(230, 29%, 15%, 0.3)")
  .attr("stroke", "hsl(184, 30%, 25%)")
  .attr("stroke-width", 0.5);

g.append("rect")
  .attr("x", 0)
  .attr("y", height / 2)
  .attr("width", width / 2)
  .attr("height", height / 2)
  .attr("fill", "hsla(230, 29%, 15%, 0.3)")
  .attr("stroke", "hsl(184, 30%, 25%)")
  .attr("stroke-width", 0.5);

g.append("rect")
  .attr("x", width / 2)
  .attr("y", height / 2)
  .attr("width", width / 2)
  .attr("height", height / 2)
  .attr("fill", "hsla(230, 29%, 15%, 0.3)")
  .attr("stroke", "hsl(184, 30%, 25%)")
  .attr("stroke-width", 0.5);

// Quadrant labels
g.append("text")
  .attr("class", "quadrant-label")
  .attr("x", width / 4)
  .attr("y", 20)
  .attr("text-anchor", "middle")
  .text("Emerging & Effective");

g.append("text")
  .attr("class", "quadrant-label")
  .attr("x", (3 * width) / 4)
  .attr("y", 20)
  .attr("text-anchor", "middle")
  .text("Mature & Effective");

const emergingLimitedLabel = g
  .append("text")
  .attr("class", "quadrant-label")
  .attr("x", width / 4)
  .attr("y", height / 2 + 20)
  .attr("text-anchor", "middle");

if (isMobile) {
  emergingLimitedLabel
    .append("tspan")
    .attr("x", width / 4)
    .attr("dy", 0)
    .text("Emerging &");
  emergingLimitedLabel
    .append("tspan")
    .attr("x", width / 4)
    .attr("dy", "1.0em")
    .text("Limited Effectiveness");
} else {
  emergingLimitedLabel.text("Emerging & Limited Effectiveness");
}

const matureLimitedLabel = g
  .append("text")
  .attr("class", "quadrant-label")
  .attr("x", (3 * width) / 4)
  .attr("y", height / 2 + 20)
  .attr("text-anchor", "middle");

if (isMobile) {
  matureLimitedLabel
    .append("tspan")
    .attr("x", (3 * width) / 4)
    .attr("dy", 0)
    .text("Mature &");
  matureLimitedLabel
    .append("tspan")
    .attr("x", (3 * width) / 4)
    .attr("dy", "1.0em")
    .text("Limited Effectiveness");
} else {
  matureLimitedLabel.text("Mature & Limited Effectiveness");
}

// Axis tick labels
g.append("text")
  .attr("x", width / 4)
  .attr("y", height + 20)
  .attr("text-anchor", "middle")
  .attr("fill", "hsl(184, 30%, 65%)")
  .style("font-size", "0.7rem")
  .text("Emerging");

g.append("text")
  .attr("x", (3 * width) / 4)
  .attr("y", height + 20)
  .attr("text-anchor", "middle")
  .attr("fill", "hsl(184, 30%, 65%)")
  .style("font-size", "0.7rem")
  .text("Mature");

// Y-axis labels (responsive)
if (isMobile) {
  // Vertical labels for mobile
  g.append("text")
    .attr("x", -5)
    .attr("y", (3 * height) / 4)
    .attr("text-anchor", "middle")
    .attr("fill", "hsl(184, 30%, 65%)")
    .style("font-size", "0.65rem")
    .attr("transform", `rotate(-90, -5, ${(3 * height) / 4})`)
    .text("Limited");

  g.append("text")
    .attr("x", -5)
    .attr("y", height / 4)
    .attr("text-anchor", "middle")
    .attr("fill", "hsl(184, 30%, 65%)")
    .style("font-size", "0.65rem")
    .attr("transform", `rotate(-90, -5, ${height / 4})`)
    .text("Effective");
} else {
  // Horizontal labels for desktop
  const limitedText = g
    .append("text")
    .attr("x", -10)
    .attr("y", (3 * height) / 4)
    .attr("text-anchor", "end")
    .attr("fill", "hsl(184, 30%, 65%)")
    .style("font-size", "0.7rem");

  limitedText.append("tspan").attr("x", -10).attr("dy", 0).text("Limited");

  limitedText
    .append("tspan")
    .attr("x", -10)
    .attr("dy", "1.0em")
    .text("Effectiveness");

  g.append("text")
    .attr("x", -10)
    .attr("y", height / 4)
    .attr("text-anchor", "end")
    .attr("fill", "hsl(184, 30%, 65%)")
    .style("font-size", "0.7rem")
    .text("Effective");
}

// Data points
const points = g
  .selectAll(".data-point")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", (d) => xScale(d.x))
  .attr("cy", (d) => yScale(d.y))
  .attr("r", isMobile ? 4 : 6)
  .attr("fill", (d) => categoryColors[d.category])
  .attr("stroke", "hsl(184, 30%, 85%)")
  .attr("stroke-width", 1)
  .style("opacity", 0.9);

// Point labels
g.selectAll(".point-label")
  .data(data)
  .enter()
  .append("text")
  .attr("class", "name")
  .attr("x", (d) => xScale(d.x) + (isMobile ? 8 : 15))
  .attr("y", (d) => yScale(d.y) + 3)
  .attr("text-anchor", "start")
  .text((d) => d.name)
  .each(function (d) {
    const text = d3.select(this);
    const words = d.name.split(/\s+/);
    if (words.length > 1) {
      text.text("");
      const lines = [];
      let currentLine = [];
      const maxLineLength = isMobile ? 12 : 18;

      words.forEach((word) => {
        currentLine.push(word);
        if (currentLine.join(" ").length > maxLineLength) {
          if (currentLine.length > 1) {
            currentLine.pop();
            lines.push(currentLine.join(" "));
            currentLine = [word];
          } else {
            lines.push(currentLine.join(" "));
            currentLine = [];
          }
        }
      });
      if (currentLine.length > 0) {
        lines.push(currentLine.join(" "));
      }

      lines.forEach((line, i) => {
        text
          .append("tspan")
          .attr("x", xScale(d.x) + (isMobile ? 8 : 15))
          .attr("dy", i === 0 ? 0 : "1.0em")
          .text(line);
      });
    }
  });

// Add grid lines
g.append("line")
  .attr("x1", width / 2)
  .attr("x2", width / 2)
  .attr("y1", 0)
  .attr("y2", height)
  .attr("stroke", "hsl(184, 30%, 25%)")
  .attr("stroke-width", 1);

g.append("line")
  .attr("x1", 0)
  .attr("x2", width)
  .attr("y1", height / 2)
  .attr("y2", height / 2)
  .attr("stroke", "hsl(184, 30%, 25%)")
  .attr("stroke-width", 1);

// Create legend
function createLegend() {
  const legendData = [
    { label: "Input", category: "input" },
    { label: "Context", category: "context" },
    { label: "Tools", category: "tools" },
    { label: "Agents", category: "agents" },
  ];

  if (isMobile) {
    // Mobile legend at bottom
    const mobileLegendGroup = svg
      .append("g")
      .attr("class", "legend legend-mobile")
      .attr(
        "transform",
        `translate(${totalWidth / 2 - 120}, ${margin.top + height + 40})`
      );

    const mobileLegendItems = mobileLegendGroup
      .selectAll("g")
      .data(legendData)
      .enter()
      .append("g")
      .attr("transform", (d, i) => {
        const row = Math.floor(i / 2);
        const col = i % 2;
        return `translate(${col * 120}, ${row * 20})`;
      });

    mobileLegendItems
      .append("circle")
      .attr("r", 5)
      .attr("fill", (d) => categoryColors[d.category])
      .style("opacity", 0.9);

    mobileLegendItems
      .append("text")
      .attr("x", 12)
      .attr("y", 0)
      .attr("dominant-baseline", "middle")
      .style("font-size", "0.75rem")
      .style("fill", "hsl(184, 30%, 85%)")
      .text((d) => d.label);
  } else {
    // Desktop legend on right side, positioned within the reserved margin space
    const desktopLegendGroup = svg
      .append("g")
      .attr("class", "legend legend-desktop")
      .attr(
        "transform",
        `translate(${margin.left + width + 20}, ${margin.top + 20})`
      );

    const desktopLegendItems = desktopLegendGroup
      .selectAll("g")
      .data(legendData)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(0, ${i * 25})`);

    desktopLegendItems
      .append("circle")
      .attr("r", 5)
      .attr("fill", (d) => categoryColors[d.category])
      .style("opacity", 0.9);

    desktopLegendItems
      .append("text")
      .attr("x", 15)
      .attr("y", 0)
      .attr("dominant-baseline", "middle")
      .style("font-size", "0.8rem")
      .style("fill", "hsl(184, 30%, 85%)")
      .text((d) => d.label);
  }
}

// Create the legend
createLegend();

// Handle window resize for responsive behavior
window.addEventListener("resize", () => {
  const newIsMobile = window.innerWidth <= 767;
  if (newIsMobile !== isMobile) {
    location.reload(); // Simple reload for mobile/desktop switch
  }
});
