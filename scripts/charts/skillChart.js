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
    nodes = createNodes(rawData);
    svg = d3
      .select(selector)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

    var tooltip = d3
      .select("#skillChart")
      .append("div")
      .attr("class", "tooltip")
      .text("");

    //   GRADIENT
    var grads = svg
      .append("defs")
      .selectAll("radialGradient")
      .data(nodes)
      .enter()
      .append("radialGradient")
      .attr("gradientUnits", "objectBoundingBox")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", "100%")
      .attr("id", function (d, i) {
        return "grad" + i;
      });

    grads.append("stop").attr("offset", "0%").style("stop-color", "white");

    grads
      .append("stop")
      .attr("offset", "100%")
      .style("stop-color", function (d) {
        return fillColour(d.name);
      });

    //   ------------ DROP SHADOW FILTER
    // filters go in defs element
    var defs = svg.append("defs");
    // create filter with id #drop-shadow
    // height=130% so that the shadow is not clipped
    var filter = defs
      .append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");
    // SourceAlpha refers to opacity of graphic that this filter will be applied to
    // convolve that with a Gaussian with standard deviation 3 and store result
    // in blur
    filter
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 5)
      .attr("result", "blur");
    // translate output of Gaussian blur to the right and downwards with 2px
    // store result in offsetBlur
    filter
      .append("feOffset")
      .attr("in", "blur")
      .attr("dx", 5)
      .attr("dy", 5)
      .attr("result", "offsetBlur");
    // overlay original SourceGraphic over translated blurred opacity by using
    // feMerge filter. Order of specifying inputs is important!
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    //   ------------END DROP SHADOW FILTER

    const elements = svg
      .selectAll(".bubble")
      .data(nodes, (d) => d.name)
      .enter()
      .append("g")
      .classed("bubbleGroup", true)
      .on("mouseover", function (d) {
        tooltip.style("visibility", "visible");
        tooltip.html(d.name);
      })
      .on("mousemove", function (d) {
        tooltip
          .style("left", d3.event.pageX - 50 + "px")
          .style("top", d3.event.pageY - 70 + "px");
      })
      .on("mouseout", function (d) {
        tooltip.style("visibility", "hidden");
      });
    bubbles = elements
      .append("circle")
      .classed("bubble", true)
      .attr("r", (d) => d.radius)
      .on("mouseover", function (d) {
        d3.select(this)
          .transition()
          .duration("700")
          .attr("r", d.radius + 4);
      })
      .on("mouseout", function (d) {
        d3.select(this).transition().duration("300").attr("r", d.radius);
      })
      .attr("fill", function (d, i) {
        return "url(#grad" + i + ")";
      });
    //   .style("fill", function (d) {
    //     return fillColour(d.name);
    //   });
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
  myBubbleChart("#skillChart", data);
  var windowHeight = $(window).height();
}
skillData && display(skillData);

var tempData = [];
function skillEffect() {
  var pagePosition = window.pageYOffset || document.documentElement.scrollTop;
  var skillSection = $("#skill");
  var elmnt = document.getElementById("skill");
  var windowHeight = $(window).height();
  //   console.log(" :: pagePosition	 : ", pagePosition);
  $(".pagePosition").html(windowHeight + " : " + pagePosition);
  let afterSkillPagePos = windowHeight + $("#skillChart").height();
  if (pagePosition > windowHeight / 2 && pagePosition < afterSkillPagePos) {
    if (tempData.length === 0) {
      tempData = skillData.slice();
      console.log(" :: pagePosition	 : ", pagePosition, ":", tempData.length);
      //IF tempData is NULL
      display(tempData);
    }
  }
  if (pagePosition > afterSkillPagePos || pagePosition < windowHeight / 2) {
    // debugger;
    tempData = [];
    $("#skillChart").empty();
  }
}
var showData = false;
// $(window).scroll(skillEffect);
