function bubbleChart() {
  const width = 940;
  const height = 500;
  const centre = { x: width / 2, y: height / 2 };
  const forceStrength = 0.03;

  let svg = null;
  let bubbles = null;
  let labels = null;
  let nodes = [];
  let tooltip = null;

  function charge(d) {
    return Math.pow(d.radius, 2.0) * 0.01;
  }

  const simulation = d3
    .forceSimulation()
    .force("charge", d3.forceManyBody().strength(charge))
    // .force("center", d3.forceCenter(centre.x, centre.y))
    .force("x", d3.forceX().strength(forceStrength).x(centre.x))
    .force("y", d3.forceY().strength(forceStrength).y(centre.y))
    .force(
      "collision",
      d3.forceCollide().radius((d) => d.radius + 2)
    );

  simulation.stop();
  const fillColour = d3.scaleOrdinal(d3.schemeCategory10);
  function createNodes(rawData) {
    const maxSize = d3.max(rawData, (d) => +d.size);
    const radiusScale = d3.scaleSqrt().domain([0, maxSize]).range([0, 50]);
    const myNodes = rawData.map((d) => ({
      ...d,
      radius: radiusScale(+d.size),
      size: +d.size,
      x: Math.random() * 900,
      y: Math.random() * 800,
    }));

    return myNodes;
  }

  let chart = function chart(selector, rawData) {
    var tooltip = d3
      .select("#bubbleChart")
      .append("div")
      .attr("class", "tooltip")
      .text("");
    nodes = createNodes(rawData);
    svg = d3
      .select(selector)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

    const elements = svg
      .selectAll(".bubble")
      .data(nodes, (d) => d.name)
      .enter()
      .append("g")
      .classed("bubbleGroup", true)
      .on("mouseover", function (d) {
        console.log(" :: : tooltip ");
        tooltip.html(d.name);
        return tooltip.style("visibility", "visible");
      })
      .on("mousemove", function () {
        return tooltip
          .style("top", d3.event.pageY - 10 + "px")
          .style("left", d3.event.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
      });
    bubbles = elements
      .append("circle")
      .classed("bubble", true)
      .attr("r", (d) => d.radius)
      .on("mouseover", function (d) {
        d3.select(this)
          .transition()
          .duration("700")
          .attr("r", d.radius + 3);
      })
      .on("mouseout", function (d) {
        d3.select(this).transition().duration("300").attr("r", d.radius);
      })
      .style("fill", function (d) {
        return fillColour(d.name);
      });
    // labels
    labels = elements
      .append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .style("font-size", 10)
      .text((d) => d.name);

    simulation.nodes(nodes).on("tick", ticked).restart();
  };

  function ticked() {
    bubbles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    labels.attr("x", (d) => d.x).attr("y", (d) => d.y);
  }

  return chart;
}
let myBubbleChart = bubbleChart();
function display(data) {
  myBubbleChart("#bubbleChart", data);
}
skillData && display(skillData);

function skillEffect() {
  var pagePosition = window.pageYOffset || document.documentElement.scrollTop;
  var skillSection = $("#skill");
  var elmnt = document.getElementById("skill");
  var windowHeight = $(window).height();

  if (pagePosition < windowHeight + windowHeight / 2) {
    showData = true;
  }

  if (pagePosition < windowHeight / 2) {
    showData = false;
    // console.log(showData, " , showData :: windowHeight	 : ", windowHeight);
  }
  //   console.log(" :: showData	 : ", showData);
}
var showData = false;
$(window).scroll(skillEffect);
