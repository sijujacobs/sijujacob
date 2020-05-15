// var data = [
//   { name: "Bob", size: 33 },
//   { name: "Robin", size: 12 },
//   { name: "Anne", size: 41 },
//   { name: "Mark", size: 16 },
//   { name: "Joe", size: 59 },
//   { name: "Eve", size: 38 },
//   { name: "Karen", size: 21 },
//   { name: "Kirsty", size: 25 },
//   { name: "Chris", size: 30 },
//   { name: "Lisa", size: 47 },
//   { name: "Tom", size: 5 },
//   { name: "Stacy", size: 20 },
//   { name: "Charles", size: 13 },
//   { name: "Mary", size: 29 },
// ];
// createGitChart(data);
d3.json("https://api.github.com/users/sijujacobs/repos").then((data) => {
  //   console.log(" :: GIT repos : ", data);
  data && createGitChart(data);
});

function createGitChart(data) {
  // set the dimensions and margins of the graph
  var margin = { top: 20, right: 20, bottom: 30, left: 120 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // set the ranges
  var y = d3.scaleBand().range([height, 0]).padding(0.1);
  var x = d3.scaleLinear().range([0, width]);

  var svg = d3
    .select("#gitChart")
    .append("svg")
    .attr(
      "viewBox",
      `0 0 ${width + margin.left + margin.right} ${
        height + margin.top + margin.bottom
      }`
    )
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var tooltip = d3
    .select("#gitChart")
    .append("div")
    .attr("class", "tooltip")
    .text("");

  // format the data
  //   data.forEach(function (d) {
  //     d.size = +d.size;
  //   });

  // Scale the range of the data in the domains
  x.domain([
    0,
    d3.max(data, function (d) {
      return d.size;
    }),
  ]);
  y.domain(
    data.map(function (d) {
      return d.name;
    })
  );
  //y.domain([0, d3.max(data, function(d) { return d.size; })]);

  // append the rectangles for the bar chart
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("width", function (d) {
      return x(d.size);
    })
    .attr("y", function (d) {
      return y(d.name);
    })
    .attr("height", y.bandwidth())
    .on("mouseover", function (d) {
      tooltip.style("visibility", "visible");
    })
    .on("mousemove", function (d) {
      tooltip
        .style("left", d3.event.pageX - 5 + "px")
        .style("top", d3.event.pageY - 35 + "px")
        .html(d.name + ",  " + d.size);
    })
    .on("mouseout", function (d) {
      tooltip.style("visibility", "hidden");
    });

  // add the x Axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g").call(d3.axisLeft(y));
}
