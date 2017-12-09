// Dylan de Waart
//Data Set not necessary for Vis 1.

/*
WHO estimates 1 suicide per 40 seconds globally
- https://www.befrienders.org/suicide-statistics

Attempts are 20 times more frequent so around 1 attempt per 2 seconds
- source: https://en.wikipedia.org/wiki/Epidemiology_of_suicide

 */

// adpated from an example by Scott White (https://bl.ocks.org/whitews/3073773f5f1fd58226ee)

marginV1 = {top: 0, right: 0, bottom: 0, left: 0};
widthV1 = 500 - marginV1.left - marginV1.right;
heightV1 = 500 - marginV1.top - marginV1.bottom;

var timer1 = {};
var timer2 = {};

var c = 0; // counter pulses


var svgV1 = d3.select("#pulse1")
    .append("svg")
    .attr("width", widthV1 + marginV1.left + marginV1.right)
    .attr("height", heightV1 + marginV1.top + marginV1.bottom)
    .append("g")
    .attr("transform", "translate(" + (widthV1/2) + "," + (heightV1/2) + ")");

//var pulse1Color = "#6D5FB6";
// var pulse1Color = "orange";

var pulse1Color = "#94618E";

function clearPulse1 () {

    svgV1
        .append("circle")
        .attr("id", "pulse1-circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr('r', 0)
        .attr("fill", pulse1Color)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1)
        .attr("stroke", pulse1Color)
        .attr("stroke-width", 5);

    svgV1
        .append("circle")
        .attr("id", "pulse2-circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr('r', 0)
        .attr("fill", "red")
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1)
        .attr("stroke", "red")
        .attr("stroke-width", 5);
}


function startTime1() {
    if (c==19) {c=0}
    c++;

    // attempt pulse
    if (c !== 4) {
        timer1 = setTimeout(function () {
            startTime1()
        }, 2000);

        d3.select("#seconds-20")
            .style("color", pulse1Color)
            .transition()
            .duration(1500)
            .style("color", "#616161");


        d3.select("#pulse1-circle")
            .transition()
            .duration(1200)
            .attr('r', 150)
            .attr("stroke-width", 2)
            .attr("stroke-opacity", 0)
            .attr("fill-opacity", 0)

            .transition()
            .duration(1)
            .attr('r', 0)
            .attr("fill", pulse1Color)
            .attr("fill-opacity", 1)
            .attr("stroke-opacity", 1)
            .attr("stroke-width", 5);
    }

    // suicide pulse 1 per 40 seconds
    else {

        timer1 = setTimeout(function () {
            startTime1()
        }, 2000);

        d3.select("#seconds-40")
            .style("color", "red")
            .transition()
            .duration(10000)
            .style("color", "#616161");

        d3.select("#pulse2-circle")
            .transition()
            .duration(1500)
            .attr('r', 250)
            .attr("stroke-width", 2)
            .attr("stroke-opacity", 0)
            .attr("fill-opacity", 0)

            .transition()
            .duration(1)
            .attr('r', 0)
            .attr("fill", "red")
            .attr("fill-opacity", 1)
            .attr("stroke-opacity", 1)
            .attr("stroke-width", 5);


    }

}






