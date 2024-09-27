import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ClusteredBubbleChart = ({ data, categories }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 700;
    const height = 400;
    const numXGridLines = 10; // Number of horizontal and vertical grid lines
    const numYGridLines = 5; // Number of horizontal and vertical grid lines

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      //   .style('background-color', '#f8fafc') // Tailwind color
      .style("border-radius", "0.5rem")
      .style("display", "block")
      .style("margin", "0 auto");

    const grid = svg.append("g").attr("class", "grid");

    // Draw vertical grid lines
    for (let i = 0; i <= numXGridLines; i++) {
      grid
        .append("line")
        .attr("x1", (i * width) / numXGridLines)
        .attr("y1", 0)
        .attr("x2", (i * width) / numXGridLines)
        .attr("y2", height)
        .attr("stroke", "grey")
        .attr("stroke-width", 1)
        .attr("opacity", 0.1);
    }

    // Draw horizontal grid lines
    for (let i = 0; i <= numYGridLines; i++) {
      grid
        .append("line")
        .attr("x1", 0)
        .attr("y1", (i * height) / numYGridLines)
        .attr("x2", width)
        .attr("y2", (i * height) / numYGridLines)
        .attr("stroke", "grey")
        .attr("stroke-width", 1)
        .attr("opacity", 0.1);
    }

    // Create the root hierarchy node with a sum function
    const root = d3
      .hierarchy({ children: data })
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);

    const pack = d3
      .pack()
      .size([width - 2, height - 2]) // Padding from the edges
      .padding(5);

    const nodes = pack(root).leaves();

    // Create group elements for each bubble
    const bubbleGroup = svg
      .selectAll("g.bubble")
      .data(nodes)
      .join("g")
      .attr("class", "bubble")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    // Create the circles (bubbles)
    bubbleGroup
      .append("circle")
      .attr("r", (d) => d.r)
      .attr("fill", (d) => d.data.color)
      .attr("opacity", 0.8);
  }, [data]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <svg ref={svgRef}></svg>
      </div>

      <div className="mt-4">
        <ul className="flex items-center gap-6">
          {categories.map((category) => (
            <li key={category.name} className="flex items-center">
              <span
                className="w-3 h-3 mr-2 "
                style={{ backgroundColor: category.color }}
              ></span>
              <span className="text-xs font-medium">{category.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClusteredBubbleChart;
