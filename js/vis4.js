//Width, height of map, set zoom active state
var widthv4 = 960,
    heightv4 = 500,
    active = d3.select(null);

// set bounds on choropleth colors
var lowColorv4 = '#f9f9f9';
var highColorv4 = '#bc2a66';

//declaring example data
var floridaData = [];
//var stateData = [];

// Define path generator
var projection = d3.geoAlbersUsa() // updated for d3 v4
    .scale(1000)
    .translate([widthv4 / 2, heightv4 / 2]);

var zoom = d3.zoom()
// no longer in d3 v4 - zoom initialises with zoomIdentity, so it's already at origin
// .translate([0, 0])
// .scale(1)
    .scaleExtent([1, 200])
    .on("zoom", zoomed);

// D3 Projection
var pathv4 = d3.geoPath() // updated for d3 v4
    .projection(projection);

//Create SVG element and append map to the SVG
var svgv4 = d3.select("#national-chart").append("svg")
    .attr("width", widthv4)
    .attr("height", heightv4)
    .on("click", stopped, true);

svgv4.append("rect")
    .attr("class", "background")
    .attr("width", widthv4)
    .attr("height", heightv4)
    .on("click", reset);

var g = svgv4.append("g");

svgv4.call(zoom); // delete this line to disable free zooming
// .call(zoom.event); // not in d3 v4

// define tool tip parameters
var tool_tip = d3.tip()
    .attr("class", "d3-tip4")
    .offset([-8, 0])
    .html(function(d) {
        return d.name1;
        console.log(name1);
    });
svgv4.call(tool_tip);


// declaring values array for each state
var stateDataArray = [{state: "Alaska", symbol: "AK", value: 0},{state: "Alabama", symbol: "AL", value: 0},
    {state: "Arkansas", symbol: "AR", value: 0}, {state: "Arizona", symbol: "AZ", value: 0},
    {state: "California", symbol: "CA",value: 0}, {state: "Colorado", symbol: "CO",value: 0},
    {state: "Connecticut", symbol: "CT", value: 0},{state: "District of Columbia", symbol: "DC",value: 0},
    {state: "Delaware", symbol: "DE",value: 0},
    {state: "Florida", symbol: "FL",value: 0},{state: "Georgia", symbol: "GA",value: 0},
    {state: "Hawaii", symbol: "HI",value: 0},
    {state: "Iowa", symbol: "IA",value: 0},{state: "Idaho", symbol: "ID",value: 0},{state: "Illinois", symbol: "IL",value: 0},
    {state: "Indiana", symbol: "IN",value: 0},{state: "Kansas", symbol: "KS",value: 0},{state: "Kentucky", symbol: "KY",value: 0},
    {state: "Louisiana", symbol: "LA",value: 0},{state: "Massachusetts", symbol: "MA",value: 0},{state: "Maryland", symbol: "MD",value: 0},
    {state: "Maine", symbol: "ME",value: 0},{state: "Michigan", symbol: "MI",value: 0},{state: "Minnesota",symbol: "MN", value: 0},
    {state: "Missouri", symbol: "MO",value: 0},{state: "Mississippi", symbol: "MS",value: 0},{state: "Montana", symbol: "MT",value: 0},
    {state: "North Carolina", symbol: "NC",value: 0},{state: "North Dakota", symbol: "ND",value: 0},{state: "Nebraska", symbol: "NE",value: 0},
    {state: "New Hampshire", symbol: "NH",value: 0},{state: "New Jersey", symbol: "NJ",value: 0},{state: "New Mexico", symbol: "NM",value: 0},
    {state: "Nevada", symbol: "NV",value: 0},{state: "New York", symbol: "NY",value: 0},{state: "Ohio", symbol: "OH",value: 0},
    {state: "Oregon", symbol: "OR",value: 0}, {state: "Oklahoma", symbol: "OK",value: 0}, {state: "Pennsylvania", symbol: "PA",value: 0},
    {state: "Rhode Island", symbol: "RI",value: 0}, {state: "South Carolina", symbol: "SC",value: 0},{state: "South Dakota", symbol: "SD",value: 0},
    {state: "Tennessee", symbol: "TN",value: 0},{state: "Texas", symbol: "TX",value: 0},
    {state: "Utah", symbol: "UT",value: 0},{state: "Virginia", symbol: "VA",value: 0},{state: "Vermont", symbol: "VT",value: 0},
    {state: "Washington", symbol: "WA",value: 0},{state: "Wisconsin", symbol: "WI",value: 0},{state: "West Virginia", symbol: "WV",value: 0},
    {state: "Wyoming", symbol: "WY",value: 0}];

// Load in the states data
d3.csv("data/vis4/healthfacilities.csv", function(data) {

    data.forEach(function(d){
        if(d.tt == "1"){
            d.TRAUMA = "Yes";
        }
        else {
            d.TRAUMA = "No";
        }

        //Suicide prevention services
        if(d.sps == "1"){
            d.SPS = "Yes";
        }
        else {
            d.SPS = "No";
        }

        //Psychosocial rehabilitation services
        if(d.prs == "1"){
            d.PRS = "Yes";
        }
        else {
            d.PRS = "No";
        }
        // community mental health center
        if(d.cmhc == "1"){
            d.CMHC = "Yes";
        }
        else {
            d.CMHC = "No";
        }

        //ptsd
        if(d.ptsd == "1"){
            d.PTSD = "Yes";
        }
        else {
            d.PTSD = "No";
        }

        //State mental health authority
        if(d.sma == "1"){
            d.SMA = "Yes";
        }
        else {
            d.SMA = "No";
        }


        // brute force back up option
        if (d.state == "AK") {
            stateDataArray[0].value += 1;
        }
        else if (d.state == "AL") {
            stateDataArray[1].value += 1;
        }
        else if (d.state == "AR") {
            stateDataArray[2].value += 1;
        }
        else if (d.state == "AZ") {
            stateDataArray[3].value += 1;
        }
        else if (d.state == "CA") {
            stateDataArray[4].value += 1;
        }
        else if (d.state == "CO") {
            stateDataArray[5].value += 1;
        }
        else if (d.state == "CT") {
            stateDataArray[6].value += 1;
        }
        else if (d.state == "DC") {
            stateDataArray[7].value += 1;
        }
        else if (d.state == "DE") {
            stateDataArray[8].value += 1;
        }
        else if (d.state == "FL") {
            stateDataArray[9].value += 1;
        }
        else if (d.state == "GA") {
            stateDataArray[10].value += 1;
        }
        else if (d.state == "HI") {
            stateDataArray[11].value += 1;
        }
        else if (d.state == "IA") {
            stateDataArray[12].value += 1;
        }
        else if (d.state == "ID") {
            stateDataArray[13].value += 1;
        }
        else if (d.state == "IL") {
            stateDataArray[14].value += 1;
        }
        else if (d.state == "IN") {
            stateDataArray[15].value += 1;
        }
        else if (d.state == "KS") {
            stateDataArray[16].value += 1;
        }
        else if (d.state == "KY") {
            stateDataArray[17].value += 1;
        }
        else if (d.state == "LA") {
            stateDataArray[18].value += 1;
        }
        else if (d.state == "MA") {
            stateDataArray[19].value += 1;
        }
        else if (d.state == "MD") {
            stateDataArray[20].value += 1;
        }
        else if (d.state == "ME") {
            stateDataArray[21].value += 1;
        }
        else if (d.state == "MI") {
            stateDataArray[22].value += 1;
        }
        else if (d.state == "MN") {
            stateDataArray[23].value += 1;
        }
        else if (d.state == "MO") {
            stateDataArray[24].value += 1;
        }
        else if (d.state == "MS") {
            stateDataArray[25].value += 1;
        }
        else if (d.state == "MT") {
            stateDataArray[26].value += 1;
        }
        else if (d.state == "NC") {
            stateDataArray[27].value += 1;
        }
        else if (d.state == "ND") {
            stateDataArray[28].value += 1;
        }
        else if (d.state == "NE") {
            stateDataArray[29].value += 1;
        }
        else if (d.state == "NH") {
            stateDataArray[30].value += 1;
        }
        else if (d.state == "NJ") {
            stateDataArray[31].value += 1;
        }
        else if (d.state == "NM") {
            stateDataArray[32].value += 1;
        }
        else if (d.state == "NV") {
            stateDataArray[33].value += 1;
        }
        else if (d.state == "NY") {
            stateDataArray[34].value += 1;
        }
        else if (d.state == "OH") {
            stateDataArray[35].value += 1;
        }
        else if (d.state == "OK") {
            stateDataArray[36].value += 1;
        }
        else if (d.state == "OR") {
            stateDataArray[37].value += 1;
        }
        else if (d.state == "PA") {
            stateDataArray[38].value += 1;
        }
        else if (d.state == "RI") {
            stateDataArray[39].value += 1;
        }
        else if (d.state == "SC") {
            stateDataArray[40].value += 1;
        }
        else if (d.state == "SD") {
            stateDataArray[41].value += 1;
        }
        else if (d.state == "TN") {
            stateDataArray[42].value += 1;
        }
        else if (d.state == "TX") {
            stateDataArray[43].value += 1;
        }
        else if (d.state == "UT") {
            stateDataArray[44].value += 1;
        }
        else if (d.state == "VA") {
            stateDataArray[45].value += 1;
        }
        else if (d.state == "VT") {
            stateDataArray[46].value += 1;
        }
        else if (d.state == "WA") {
            stateDataArray[47].value += 1;
        }
        else if (d.state == "WI") {
            stateDataArray[48].value += 1;
        }
        else if (d.state == "WV") {
            stateDataArray[49].value += 1;
        }
        else if (d.state == "WY") {
            stateDataArray[50].value += 1;
        }

    });

    // setting value array for choropleth
    var valueArray = [];

    stateDataArray.forEach(function(d){
        valueArray.push(d.value);
    });

    data.forEach(function(d){
        if(d.state =="FL"){
            floridaData.push(d);
        }
    });

    // debugging
//        console.log(stateDataArray);
//        console.log(valueArray);
    //console.log(floridaData);

    // setting values for choropleth color range
    var minValv4 = d3.min(valueArray);
    //console.log(minVal);
    var maxValv4 = d3.max(valueArray);
    //console.log(maxVal);
    var ramp = d3.scaleLinear().domain([minValv4,maxValv4]).range([lowColorv4,highColorv4]);


    d3.json("data/vis4/us-states.json", function (error, json) {
        if (error) throw error;

        // Loop through each state data value in the .csv file
        for (var i = 0; i < stateDataArray.length; i++) {

            // Grab State Name
            var dataState = stateDataArray[i].state;
            //var dataState = data[i].state;

            // Grab data value
            var dataValue = stateDataArray[i].value;
            //var dataValue = data[i].value;

            // Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {
                var jsonState = json.features[j].properties.name;

                if (dataState == jsonState) {

                    // Copy the data value into the JSON
                    json.features[j].properties.value = dataValue;

                    // Stop looking through the JSON
                    break;
                }
            }
        }


        // Bind the data to the SVG and create one path per GeoJSON feature
        g.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", pathv4)
            .style("stroke", "grey")
            .style("stroke-width", "1")
            .style("fill", function(d) { return ramp(d.properties.value) })
            //                .on("click", function(d){
            //                    clicked(d.properties["abbr"], data);
            //                });
            .on("click", clicked);
        // need to get symbol from json

//                    sendData = data.filter(function(c) { return c.state == d.properties["abbr"]; });
//                    console.log(sendData);
        //  clicked(sendData);
//                    var name = d.properties["abbr"];
//                    clicked(name, data);
//                    console.log(d.properties["abbr"]);
        //       });
//                .on("click", function(d){
//                    // need to get symbol from json
//                    updateStateData(d.properties["abbr"], data);
//                    console.log(d.properties["abbr"]);
//                });
        //.on("mouseover", tool_tip.show)
        //.on("mouseout", tool_tip.hide);

        // setting values for and appending legend bar and key (y axis)
        var w = 140, h = 300;

        var key = d3.select("svgv4")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("class", "vis4legend");

        var legend = key.append("defs")
            .append("svg:linearGradient")
            .attr("id", "gradient")
            .attr("x1", "100%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        legend.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", highColorv4)
            .attr("stop-opacity", 1);

        legend.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", lowColorv4)
            .attr("stop-opacity", 1);

        key.append("rect")
            .attr("width", w - 125)
            .attr("height", h)
            .style("fill", "url(#gradient)")
            .attr("transform", "translate(0,5)");

        var y = d3.scaleLinear()
            .range([h, 0])
            .domain([minValv4, maxValv4]);

        var yAxisv4 = d3.axisRight(y);

        key.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(13,5)")
            .call(yAxisv4);

    });
});

function clicked(d) {


    if (active.node() === this) return reset();
    active.classed("active", false);
    active = d3.select(this).classed("active", true);

    var bounds = pathv4.bounds(d),
        dx4 = bounds[1][0] - bounds[0][0],
        dy4 = bounds[1][1] - bounds[0][1],
        x4 = (bounds[0][0] + bounds[1][0]) / 2,
        y4 = (bounds[0][1] + bounds[1][1]) / 2,
        scalev4 = Math.max(1, Math.min(8, 0.9 / Math.max(dx4 / widthv4, dy4 / heightv4))),
        translate = [widthv4 / 2 - scalev4 * x4, heightv4 / 2 - scalev4 * y4];

    svgv4.transition()
        .duration(750)
        // .call(zoom.translate(translate).scale(scale).event); // not in d3 v4
        .call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scalev4) ); // updated for d3 v4

    // extra: showing circles for each facility
    floridaData.forEach(function(d) {
        // convert variables into numeric form
        d.latitude = d.latitude;
        //console.log(d.latitude);
        d.longitude = d.longitude;
        //console.log(d.longitude);
    });
    // Draw circles
    g.selectAll("circle")
        .data(floridaData)
        .enter()
        .append("circle")
        .attr("class", "circlev4")
        .attr("r", 1)
        .attr("transform", function(d) {
            return "translate(" + projection([d.longitude, d.latitude]) + ")";
        })
        .on("mouseover", function(d){
            console.log("MOUSEOVER");
            tool_tip.show;
        })
        .on("mouseout", function(d){
            console.log("MOUSEOUT");
            tool_tip.hide;
        })
        .on("click", function(d){

            // appending building information to column 3
            // TRAUMA SPS PRS CMHC PTSD SMA
            document.getElementById("column3").innerHTML =
                "<table>" +
                "<tr><td> Facility: " + d.name + "</td></tr>"+
                "<tr><td> State Mental Health Authority?: " + d.SMA + "</td></tr>" +
                "<tr><td> Community Mental Health Center?: " + d.CMHC + "</td></tr>" +
                "<tr><td> Psychosocial rehabilitation services?: " + d.PRS + "</td></tr>" +
                "<tr><td> Suicide prevention services?: " + d.SPS + "</td></tr>" +
                "<tr><td> Trauma therapy?: " + d.TRAUMA + "</td></tr>" +
                "<tr><td> PTSD services?: " + d.PTSD + "</td></tr>" + "</table>";
        });

    //svgv4.call(tool_tip);

    // });

}

function reset() {
    active.classed("active", false);
    active = d3.select(null);

    svgv4.transition()
        .duration(750)
        // .call( zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1) ); // not in d3 v4
        .call( zoom.transform, d3.zoomIdentity ); // updated for d3 v4
}

function zoomed() {
    g.style("stroke-width", 1.5 / d3.event.transform.k + "px");
    // g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"); // not in d3 v4
    g.attr("transform", d3.event.transform); // updated for d3 v4
}

// If the drag behavior prevents the default click,
// also stop propagation so we don’t click-to-zoom.
function stopped() {
    if (d3.event.defaultPrevented) d3.event.stopPropagation();
}