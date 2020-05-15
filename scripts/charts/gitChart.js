// d3.json("https://api.github.com/users/sijujacobs/repos").then((data) => {
//   console.log(" :: GIT repos : ", data);
//   data && drawGitChart(data);
// });
// const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
var data = [
  { name: "central ", size: 1800 },
  { name: "Riverside ", size: 1700 },
  { name: "Picton ", size: 8000 },
  { name: "Everton ", size: 5500 },
  { name: "Kensington ", size: 10000 },
  { name: "Kirkdale", size: 5000 },
];
drawGitChart(data);
function drawGitChart(data) {
  const svWidth = 450;
  const svHeight = 250;
  const margin = { top: 25, right: 20, bottom: 50, left: 60 };
  // --------------Testing
  var svg2 = d3
    .select("#gitChart2")
    .append("svg")
    .attr("viewBox", `0 0 ${svWidth} ${svHeight}`);

  var tooltip = d3
    .select("#gitChart2")
    .append("div")
    .attr("class", "tooltip")
    .text("");

  var x = d3.scaleLinear().range([0, 600]);
  var y = d3.scaleBand().range([svHeight, 0]);

  var g = svg2
    .append("g")
    .append("g")
    .attr(
      "transform",
      "translate(" + margin.left + "," + (margin.top - 35) + ")"
    );

  data.sort(function (a, b) {
    return a.size - b.size;
  });

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
  ).padding(0.1);
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + svHeight + ")")
    .call(
      d3
        .axisBottom(x)
        .ticks(5)
        .tickFormat(function (d) {
          return parseInt(d / 1000);
        })
        .tickSizeInner([-svHeight])
    );

  g.append("g").attr("class", "y axis").call(d3.axisLeft(y));
  g.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 1)
    .attr("height", y.bandwidth())
    .attr("y", function (d) {
      return y(d.name);
    })
    .attr("width", function (d) {
      return x(d.size);
    })
    .on("mouseover", function (d) {
      tooltip.style("visibility", "visible");
    })
    .on("mousemove", function (d) {
      tooltip
        .style("left", d3.event.pageX - 40 + "px")
        .style("top", d3.event.pageY - 60 + "px")
        .html(d.sise);
    })
    .on("mouseout", function (d) {
      tooltip.style("visibility", "hidden");
    });

  // ------------------------------------ENd TEsting----------------------

  // var svg = d3.select("#gitChart svg"),
  //   width = svWidth - margin.left - margin.right,
  //   height = svHeight - margin.top - margin.bottom;

  // // svg.attr("viewBox", `0 0 ${svWidth} ${svHeight}`);
  // var tooltip = d3.select("body").append("div").attr("class", "toolTip");

  // var x = d3.scaleLinear().range([0, width]);
  // var y = d3.scaleBand().range([height, 0]);

  // var g = svg
  //   .append("g")
  //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // data.sort(function (a, b) {
  //   return a.size - b.size;
  // });

  // x.domain([
  //   0,
  //   d3.max(data, function (d) {
  //     return d.size;
  //   }),
  // ]);
  // y.domain(
  //   data.map(function (d) {
  //     return d.name;
  //   })
  // ).padding(0.1);

  // g.append("g")
  //   .attr("class", "x axis")
  //   .attr("transform", "translate(0," + height + ")")
  //   .call(
  //     d3
  //       .axisBottom(x)
  //       .ticks(5)
  //       .tickFormat(function (d) {
  //         return parseInt(d / 1000);
  //       })
  //       .tickSizeInner([-height])
  //   );

  // g.append("g").attr("class", "y axis").call(d3.axisLeft(y));

  // g.selectAll(".bar")
  //   .data(data)
  //   .enter()
  //   .append("rect")
  //   .attr("class", "bar")
  //   .attr("x", 0)
  //   .attr("height", y.bandwidth())
  //   .attr("y", function (d) {
  //     return y(d.name);
  //   })
  //   .attr("width", function (d) {
  //     return x(d.size);
  //   })
  //   .on("mousemove", function (d) {
  //     tooltip
  //       .style("left", d3.event.pageX - 50 + "px")
  //       .style("top", d3.event.pageY - 70 + "px")
  //       .style("display", "inline-block")
  //       .html(d.name + "<br>" + "£" + d.size);
  //   })
  //   .on("mouseout", function (d) {
  //     tooltip.style("display", "none");
  //   });
}
