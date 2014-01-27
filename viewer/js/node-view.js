var width, height, x, y;

var vis = d3.select('svg.vis');

var activity = vis.append('g').classed('activity', true);

var translate = function(move_x, move_y) {
  return "translate(" + move_x + "," + move_y + ")"
}

var setup = function() {
  // set up the main activity node
  activity.attr("transform", translate(x(0.5), y(0.5)));
  activity.append('rect').classed('activity-box', true)
    .attr('width', x(0.1))
    .attr('height', y(0.1))
    .attr('transform', translate(x(-0.05), y(-0.05)));
};


var setWidthHeight = function() {
  width = $(vis.node()).width();
  height = $(vis.node()).height();
  vis.attr('width', width).attr('height', height);
  x = d3.scale.linear().range([0, width]);
  y = d3.scale.linear().range([0, height]);
};
/// set width and height globals on window resize
$(window).on('resize', function() {
  setWidthHeight();
});

$(document).on('ready', function() {
  setWidthHeight();
  setup();
});
