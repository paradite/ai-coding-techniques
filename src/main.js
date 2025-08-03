import { generateData } from "./data.js";

const data = generateData();

// Get CSS variables
const rootStyles = getComputedStyle(document.documentElement);
const margin = {
  top: parseInt(rootStyles.getPropertyValue("--margin-top")),
  right: parseInt(rootStyles.getPropertyValue("--margin-right")),
  bottom: parseInt(rootStyles.getPropertyValue("--margin-bottom")),
  left: parseInt(rootStyles.getPropertyValue("--margin-left")),
};
const totalWidth = parseInt(rootStyles.getPropertyValue("--viz-width-desktop"));
const totalHeight = parseInt(
  rootStyles.getPropertyValue("--viz-height-desktop")
);
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

g.append("text")
  .attr("class", "quadrant-label")
  .attr("x", width / 4)
  .attr("y", height / 2 + 20)
  .attr("text-anchor", "middle")
  .text("Emerging & Limited");

g.append("text")
  .attr("class", "quadrant-label")
  .attr("x", (3 * width) / 4)
  .attr("y", height / 2 + 20)
  .attr("text-anchor", "middle")
  .text("Mature & Limited");

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

// Y-axis labels (horizontal)
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

// Data points
const points = g
  .selectAll(".data-point")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", (d) => xScale(d.x))
  .attr("cy", (d) => yScale(d.y))
  .attr("r", 6)
  .attr("fill", (d) =>
    d.effectiveness === "effective" ? "hsl(132, 60%, 60%)" : "hsl(43, 85%, 65%)"
  )
  .attr("stroke", "hsl(184, 30%, 85%)")
  .attr("stroke-width", 1);

// Point labels
g.selectAll(".point-label")
  .data(data)
  .enter()
  .append("text")
  .attr("class", "name")
  .attr("x", (d) => xScale(d.x) + 15)
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

      words.forEach((word) => {
        currentLine.push(word);
        if (currentLine.join(" ").length > 18) {
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
          .attr("x", xScale(d.x) + 15)
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
