var data = [
  {
    metric: "Sales",
    Name: "Pears",
    total: 2020.161,
  },
  {
    metric: "Sales",
    Name: "Apples",
    total: 2122.545,
  },
  {
    metric: "Sales",
    Name: "Bananas",
    total: 4154.9,
  },
  {
    metric: "Sales",
    Name: "PineApples",
    total: 3020.161,
  },
  {
    metric: "Sales",
    Name: "Grapes",
    total: 1122.545,
  },
  {
    metric: "Sales",
    Name: "Oranges",
    total: 4334.9,
  },
];

var margin = { top: 20, right: 20, bottom: 50, left: 100 },
  width =
    parseInt(d3.select("#chart").style("width")) - margin.left - margin.right,
  height =
    parseInt(d3.select("#chart").style("height")) - margin.top - margin.bottom;

var yScale = d3.scale.ordinal().rangeRoundBands([height, 0], 0.1);

var xScale = d3.scale.linear().range([0, width]);

var dollarFormatter = d3.format(",.0f");

var yAxis = d3.svg.axis().scale(yScale).orient("left");

var xAxis = d3.svg
  .axis()
  .scale(xScale)
  .orient("bottom")
  .tickFormat(function (d) {
    return dollarFormatter(d);
  });

var svg = d3
  .select("#chart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Filter to select a subset
var subset = data.filter(function (el) {
  return el["metric"];
});

// Sort the data so bar chart is sorted in decreasing order
subset = subset.sort(function (a, b) {
  return a["total"] - b["total"];
});

yScale.domain(
  subset.map(function (d) {
    return d["Name"];
  })
);
xScale.domain([
  0,
  d3.max(subset, function (d) {
    return d["total"];
  }),
]);

svg.append("g").attr("class", "y axis").call(yAxis);

svg
  .append("g")
  .attr("class", "x axis")
  .call(xAxis)
  .attr("transform", "translate(0," + height + ")")
  .append("text");

svg
  .selectAll(".bar")
  .data(subset)
  .enter()
  .append("rect")
  .attr("class", "bar")
  //.attr("y", function(d) { return yScale(d["Name"]); })
  //.attr("height", yScale.rangeBand())
  .attr("width", 0)
  .transition()
  .duration(500)
  .delay(function (d, i) {
    return i * 250;
  })
  .attr("width", function (d) {
    return xScale(d["total"]);
  });

// setTimeout(function () {
//   d3.selectAll("rect")
//     .transition()
//     .duration(500)
//     .delay(function (d, i) {
//       return 250 * (3 - i);
//     })
//     .attr("width", function (d) {
//       return 0;
//     });
// }, 2000);

// Define responsive behavior
function resize() {
  var width =
      parseInt(d3.select("#chart").style("width")) - margin.left - margin.right,
    height =
      parseInt(d3.select("#chart").style("height")) -
      margin.top -
      margin.bottom;

  // Update the range of the scale with new width/height
  xScale.range([0, width]);
  yScale.rangeRoundBands([height, 0], 0.1);

  // Update the axis and text with the new scale
  svg
    .select(".x.axis")
    .call(xAxis)
    .attr("transform", "translate(0," + height + ")")
    .select(".label")
    .attr(
      "transform",
      "translate(" + width / 2 + "," + margin.bottom / 1.5 + ")"
    );
  svg.select(".y.axis").call(yAxis);
  // Update the tick marks
  xAxis.ticks(Math.max(width / 75, 2), " $");
  // Force D3 to recalculate and update the line
  svg
    .selectAll(".bar")
    .attr("width", function (d) {
      return xScale(d["total"]);
    })
    .attr("y", function (d) {
      return yScale(d["Name"]);
    })
    .attr("height", yScale.rangeBand());
}

// Call the resize function whenever a resize event occurs
d3.select(window).on("resize", resize);
// Call the resize function
resize();
// Define the format function
function format(d) {
  d.total = +d.total;
  return d;
}
