import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ResponsiveLineChart = ({ data }) => {
  const svgRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    // Create the chart function
    const drawChart = () => {
      // Get the dimensions of the container
      const container = containerRef.current;
      let { width, height } = container.getBoundingClientRect();
      const margin = { top: 10, right: 10, bottom: 10, left: 10 };
      height = "230";

      // Clear the previous SVG
      d3.select(svgRef.current).selectAll("*").remove();

      // Create the SVG element with dynamic width and height
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      // Define x and y scales based on the new data format
      const x = d3
        .scaleLinear()
        .domain([0, data.total_duration]) // Using total_duration for the x-axis domain
        .range([margin.left, width - margin.right]);

      const y = d3
        .scaleLinear()
        .domain([0, data.max_heat + data.max_heat / 10]) // Using max_heat for the y-axis domain
        .nice()
        .range([height - margin.bottom, margin.top]);

      // Create line generator
      const line = d3
        .line()
        .x((d) => x(d.x))
        .y((d) => y(d.y))
        .curve(d3.curveMonotoneX);

      // Create area generator for filling below the line
      const area = d3
        .area()
        .x((d) => x(d.x))
        .y0(height - margin.bottom)
        .y1((d) => y(d.y))
        .curve(d3.curveMonotoneX);

      // Define gradient for the line based on whether it's rising or falling
      const colorGradient = svg
        .append("defs")
        .append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", margin.left)
        .attr("x2", width - margin.right)
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom);

      // Compute the gradient stops
      data.plot.forEach((point, i) => {
        if (i === 0) return; // Skip the first point as we don't have a previous point
        colorGradient
          .append("stop")
          .attr("offset", `${(x(point.x) / width) * 100}%`)
          .attr("stop-color", point.y <= data.max_heat / 2 ? "red" : "green"); // Red for rising, green for falling
      });

      // Add grid lines with larger size
      const grid = svg.append("g").attr("class", "grid");

      // Horizontal grid lines
      grid
        .selectAll("line.horizontal")
        .data(y.ticks(3))
        .enter()
        .append("line")
        .attr("class", "horizontal")
        .attr("x1", margin.left)
        .attr("x2", width - margin.right)
        .attr("y1", (d) => y(d))
        .attr("y2", (d) => y(d))
        .attr("stroke", "lightgray")
        .attr("stroke-width", 1) // Increase stroke-width for larger grid lines
        .attr("opacity", 0.4); // Adjust opacity if needed

      // Vertical grid lines
      grid
        .selectAll("line.vertical")
        .data(x.ticks(7))
        .enter()
        .append("line")
        .attr("class", "vertical")
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom)
        .attr("x1", (d) => x(d))
        .attr("x2", (d) => x(d))
        .attr("stroke", "lightgray")
        .attr("stroke-width", 1) // Increase stroke-width for larger grid lines
        .attr("opacity", 0.4); // Adjust opacity if needed

      // Draw the area under the line
      svg
        .append("path")
        .datum(data.plot)
        .attr("fill", "#EDF1FF80")
        .attr("d", area);

      // Draw the line with gradient stroke
      svg
        .append("path")
        .datum(data.plot)
        .attr("fill", "none")
        .attr("stroke", "url(#line-gradient)")
        .attr("stroke-width", 2)
        .attr("d", line);
    };

    // Draw the chart initially
    drawChart();

    // Redraw the chart on window resize
    const handleResize = () => {
      drawChart();
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default ResponsiveLineChart;
