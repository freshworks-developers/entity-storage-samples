// Code for creating an SVG donut chart from feature properties
function createDonutChart(props) {
  var offsets = [];
  var counts = [props.fruit, props.milk];
  var total = 0;
  for (var i = 0; i < counts.length; i++) {
    offsets.push(total);
    total += counts[i];
  }
  var fontSize = total >= 1000 ? 32 : total >= 100 ? 30 : total >= 10 ? 28 : 26;
  var r = total >= 1000 ? 64 : total >= 100 ? 48 : total >= 10 ? 32 : 24;
  var r0 = Math.round(r * 0.65);
  var w = r * 2;

  var html =
    '<div><svg width="' +
    w +
    '" height="' +
    w +
    '" viewbox="0 0 ' +
    w +
    " " +
    w +
    '" text-anchor="middle" style="font: ' +
    fontSize +
    'px Bebas Neue, sans-serif; display: block">';

  for (i = 0; i < counts.length; i++) {
    html += donutSegment(
      offsets[i] / total,
      (offsets[i] + counts[i]) / total,
      r,
      r0,
      colors[i]
    );
  }
  html +=
    '<circle cx="' +
    r +
    '" cy="' +
    r +
    '" r="' +
    r0 +
    '" fill="#ffffffaa" /><text dominant-baseline="central" transform="translate(' +
    r +
    ", " +
    r +
    ')">' +
    total.toLocaleString() +
    "</text></svg></div>";

  var el = document.createElement("div");
  el.innerHTML = html;
  return el.firstChild;
}

// Draw the donut segments
function donutSegment(start, end, r, r0, color) {
  if (end - start === 1) end -= 0.00001;
  var a0 = 2 * Math.PI * (start - 0.25);
  var a1 = 2 * Math.PI * (end - 0.25);
  var x0 = Math.cos(a0),
    y0 = Math.sin(a0);
  var x1 = Math.cos(a1),
    y1 = Math.sin(a1);
  var largeArc = end - start > 0.5 ? 1 : 0;

  return [
    '<path d="M',
    r + r0 * x0,
    r + r0 * y0,
    "L",
    r + r * x0,
    r + r * y0,
    "A",
    r,
    r,
    0,
    largeArc,
    1,
    r + r * x1,
    r + r * y1,
    "L",
    r + r0 * x1,
    r + r0 * y1,
    "A",
    r0,
    r0,
    0,
    largeArc,
    0,
    r + r0 * x0,
    r + r0 * y0,
    '" fill="' + color + '" />',
  ].join(" ");
}
