// (function () {
var margin = { top: 0, right: 10, bottom: 20, left: 10 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var index = d3.range(24),
  data = index.map(d3.random.normal(100, 10));

var x = d3.scale
  .linear()
  .domain([0, d3.max(data)])
  .range([0, width]);

var y = d3.scale.ordinal().domain(index).rangeRoundBands([0, height], 0.1);

var svg = d3
  .select("#skillChart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var bar = svg
  .selectAll(".bar")
  .data(data)
  .enter()
  .append("g")
  .attr("class", "bar")
  .attr("transform", function (d, i) {
    return "translate(0," + y(i) + ")";
  });

bar.append("rect").attr("height", y.rangeBand()).attr("width", x);

bar
  .append("text")
  .attr("text-anchor", "end")
  .attr("x", function (d) {
    return x(d) - 6;
  })
  .attr("y", y.rangeBand() / 2)
  .attr("dy", ".35em")
  .text(function (d, i) {
    return i;
  });

svg
  .append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.svg.axis().scale(x).orient("bottom"));

var sort = false;

setInterval(function () {
  if ((sort = !sort)) {
    index.sort(function (a, b) {
      return data[a] - data[b];
    });
  } else {
    index = d3.range(24);
  }

  y.domain(index);

  bar
    .transition()
    .duration(750)
    .delay(function (d, i) {
      return i * 50;
    })
    .attr("transform", function (d, i) {
      return "translate(0," + y(i) + ")";
    });
}, 5000);
// })();
