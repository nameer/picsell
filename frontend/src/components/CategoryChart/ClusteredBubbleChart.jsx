import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Card from "../Card";
const ClusteredBubbleChart = ({ data }) => {
  const svgRef = useRef(null);

  const tooltipRef = useRef(null);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const [colorMap, setColorMap] = useState([]);

  const generateSubtopicsArray = (topics) => {
    const newColorMap = []; // Temporary array to store colors for each topic

    const result = topics.flatMap((topic) => {
      const colorCode = getRandomColor();

      newColorMap.push({ topic: topic.name, colorCode });

      return topic.subtopics.map((subtopic) => ({
        parent: topic.name,
        name: subtopic.name,
        value: subtopic.value,
        color: colorCode,
      }));
    });

    setColorMap(newColorMap);

    return result;
  };
  useEffect(() => {
    const updatedData = generateSubtopicsArray(data);
    const width = 700;
    const height = 400;
    const numXGridLines = 10; // Number of horizontal and vertical grid lines
    const numYGridLines = 5; // Number of horizontal and vertical grid lines

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("border-radius", "0.5rem")
      .style("display", "block")
      .style("margin", "0 auto");

    // Ensure the grid is drawn behind the bubbles
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

    let tooltip = tooltipRef.current;

    console.log(tooltip);

    if (!tooltip) {
      tooltip = d3
        .select("body")
        .append("div")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("padding", "5px")
        .style("border", "1px solid #ccc")
        .style("border-radius", "5px")
        .style("box-shadow", "0 2px 5px rgba(0, 0, 0, 0.2)")
        .style("pointer-events", "none")
        .style("opacity", 1);
      tooltipRef.current = tooltip.node();
    } else {
      tooltip = d3.select(tooltip);
    }

    // Create the root hierarchy node with a sum function
    const root = d3
      .hierarchy({ children: updatedData })
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
      .attr("opacity", 0.5)
      .on("mouseover", (event, d) => {
        // Show the tooltip on hover
        tooltip
          .style("opacity", 0.8)
          .html(
            `<strong>Topic: </strong> ${d.data.parent}<br/><strong>Sub-topic:</strong> ${d.data.name}`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);
      })
      .on("mousemove", (event) => {
        // Move the tooltip with the mouse
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);
      })
      .on("mouseout", () => {
        // Hide the tooltip on mouseout
        tooltip.style("opacity", 0);
      });

    return () => {
      svg.selectAll("*").remove();
      d3.select("div.cluster-bubble-tooltip").remove();
    };
  }, [data]);

  return (
    <Card title={"CUSTOMER QUERY OVERVIEW"}>
      <div className="flex flex-col items-center">
        <svg ref={svgRef}></svg>
        <div className="mt-4 w-full">
          <ul className="flex items-start gap-6 flex-wrap">
            {colorMap.map((category) => (
              <li key={category.topic} className="flex items-center">
                <span
                  className="w-3 h-3 mr-2 "
                  style={{ backgroundColor: category.colorCode }}
                ></span>
                <span className="text-xs font-medium">{category.topic}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default ClusteredBubbleChart;
