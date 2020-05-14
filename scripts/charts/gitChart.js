function drawGitChart(gitData, svg) {
  (margin = { top: 20, right: 20, bottom: 30, left: 50 }),
    (width = +svg.attr("width") - margin.left - margin.right),
    (height = +svg.attr("height") - margin.top - margin.bottom); // You were missing a ; here

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(gitData, (d) => d.censo)])
    .range([0, width]);

  const rects = svg
    .selectAll(".bar")
    .data(gitData.sort((a, b) => d3.descending(a.censo, b.censo)));

  rects
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", (d, i, ds) => i * 10)
    .attr("width", (d) => x(d.censo))
    .attr("height", 9)
    .style("fill", "steelblue");

  const texts = svg.selectAll(".label").data(gitData);

  rects
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", 0)
    .attr("y", (d, i, ds) => i * 10)

    // .attr("x", d => x(d.censo))
    //.attr("y", (d) => y(d.municipio))
    .text((d) => d.municipio)
    // .attr("width", d => x(d.censo))
    // .attr("height", 9)
    .style("fill", "#333")
    .style("font-size", "6pt")
    .style("font-family", "sans-serif");

  console.log("w", width, "h", height);
}

// Returns a promise, you don't get the data straight from it
d3.json("https://api.github.com/users/sijujacobs/repos").then((data) => {
  console.log(" :: GIT repos : ", data);
  //   drawGitChart(data, d3.select("#viz"));
  //   doScatterPlot(data, d3.select("#viz2"));
});
// "https://raw.githubusercontent.com/john-guerra/consultaAnticorrupcion2018/master/consulta_anticorrupcion_municipios.json"
