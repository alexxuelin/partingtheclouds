//Width, height of map, set zoom active state
var widthv4 = 750,
    heightv4 = 470,
    active = d3.select(null);

// set bounds on choropleth colors
var lowColorv4 = '#fff';
var highColorv4 = '#6b8e23';
// var lowColorv4 = '#f9f9f9';
// var highColorv4 = 'olivedrab';

//declaring example data
var floridaData = [];

//declaring state data
var alaskaData, alabamaData, arkansasData, arizonaData,
    californiaData, coloradoData, connecticutData,
    districtOfColumbiaData, delawareData,
    georgiaData, hawaiiData, iowaData, idahoData,
    illinoisData, indianaData, kansasData,
    kentuckyData, louisianaData, massachusettsData,
    marylandData, maineData, michiganData,
    minnesotaData, missouriData, mississippiData,
    montanaData, northCarolinaData, northDakotaData,
    nebraskaData, newHampshireData, newJerseyData,
    newMexicoData, nevadaData, newYorkData,
    ohioData, oregonData, oklahomaData,
    pennsylvaniaData, rhodeIslandData, southCarolinaData,
    southDakotaData, tennesseeData, texasData, utahData,
    virginiaData, vermontData, washingtonData,
    wisconsinData, westVirginiaData, wyomingData = [];

//declaring chosen state data
var chosenStateData = [];

// Define path generator
var projection = d3.geoAlbersUsa() // updated for d3 v4
    .scale(900)
    .translate([widthv4 / 2, heightv4 / 2]);

var zoom = d3.zoom()
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
    .attr("class", "backgroundv4")
    .attr("width", widthv4)
    .attr("height", heightv4)
    .on("click", reset);

var g = svgv4.append("g");

svgv4.call(zoom); // delete this line to disable free zooming

// define tool tip parameters
var tool_tip = d3.tip()
    .attr("class", "d3-tipv4")
    .offset([-8, 0])
    .html(function(d) {
        return d.TITLE;
        console.log(TITLE);
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
        d.STATE = d.state;
        d.TITLE = d.name1;
        d.ADDR = d.street1;
        d.WEBSITE = d.website;
        d.PHONE = d.phone;

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
            ALASKA = data;
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

    //brute force to the max
    alaskaData = data.filter(function(d){ return d.state == "AK"; });
    alabamaData = data.filter(function(d){ return d.state == "AL"; });
    arkansasData = data.filter(function(d){ return d.state == "AR"; });
    arizonaData = data.filter(function(d){ return d.state == "AZ"; });
    californiaData = data.filter(function(d){ return d.state == "CA"; });
    coloradoData = data.filter(function(d){ return d.state == "CO"; });
    connecticutData = data.filter(function(d){ return d.state == "CT"; });
    districtOfColumbiaData = data.filter(function(d){ return d.state == "DC"; });
    delawareData = data.filter(function(d){ return d.state == "DE"; });
    floridaData = data.filter(function(d){ return d.state == "FL"; });
    georgiaData = data.filter(function(d){ return d.state == "GA"; });
    hawaiiData = data.filter(function(d){ return d.state == "HI"; });
    iowaData = data.filter(function(d){ return d.state == "IA"; });
    idahoData = data.filter(function(d){ return d.state == "ID"; });
    illinoisData = data.filter(function(d){ return d.state == "IL"; });
    indianaData = data.filter(function(d){ return d.state == "IN"; });
    kansasData = data.filter(function(d){ return d.state == "KS"; });
    kentuckyData = data.filter(function(d){ return d.state == "KY"; });
    louisianaData = data.filter(function(d){ return d.state == "LA"; });
    massachusettsData = data.filter(function(d){ return d.state == "MA"; });
    marylandData = data.filter(function(d){ return d.state == "MD"; });
    maineData = data.filter(function(d){ return d.state == "ME"; });
    michiganData = data.filter(function(d){ return d.state == "MI"; });
    minnesotaData = data.filter(function(d){ return d.state == "MN"; });
    missouriData = data.filter(function(d){ return d.state == "MO"; });
    mississippiData = data.filter(function(d){ return d.state == "MS"; });
    montanaData = data.filter(function(d){ return d.state == "MT"; });
    northCarolinaData = data.filter(function(d){ return d.state == "NC"; });
    northDakotaData = data.filter(function(d){ return d.state == "ND"; });
    nebraskaData = data.filter(function(d){ return d.state == "NE"; });
    newHampshireData = data.filter(function(d){ return d.state == "NH"; });
    newJerseyData = data.filter(function(d){ return d.state == "NJ"; });
    newMexicoData = data.filter(function(d){ return d.state == "NM"; });
    nevadaData = data.filter(function(d){ return d.state == "NV"; });
    newYorkData = data.filter(function(d){ return d.state == "NY"; });
    ohioData = data.filter(function(d){ return d.state == "OH"; });
    oklahomaData = data.filter(function(d){ return d.state == "OK"; });
    oregonData = data.filter(function(d){ return d.state == "OR"; });
    pennsylvaniaData = data.filter(function(d){ return d.state == "PA"; });
    rhodeIslandData = data.filter(function(d){ return d.state == "RI"; });
    southCarolinaData = data.filter(function(d){ return d.state == "SC"; });
    southDakotaData = data.filter(function(d){ return d.state == "SD"; });
    tennesseeData = data.filter(function(d){ return d.state == "TN"; });
    texasData = data.filter(function(d){ return d.state == "TX"; });
    utahData = data.filter(function(d){ return d.state == "UT"; });
    virginiaData = data.filter(function(d){ return d.state == "VA"; });
    vermontData = data.filter(function(d){ return d.state == "VT"; });
    washingtonData = data.filter(function(d){ return d.state == "WA"; });
    wisconsinData = data.filter(function(d){ return d.state == "WI"; });
    westVirginiaData = data.filter(function(d){ return d.state == "WV"; });
    wyomingData = data.filter(function(d){ return d.state == "WY"; });

    // setting values for choropleth color range
    var minValv4 = d3.min(valueArray);
    var maxValv4 = d3.max(valueArray);
    var ramp = d3.scaleLinear().domain([minValv4,maxValv4]).range([lowColorv4,highColorv4]);


    d3.json("data/vis4/us-states.json", function (error, json) {
        if (error) throw error;

        // Loop through each state data value in the .csv file
        for (var i = 0; i < stateDataArray.length; i++) {

            // Grab State Name
            var dataState = stateDataArray[i].state;

            // Grab data value
            var dataValue = stateDataArray[i].value;

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
            .on("click", clicked);

        // setting values for and appending legend bar and key (y axis)
        var w = 32, h = 300;

        var key = d3.select("#national-chart")
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
            .attr("width", 32)
            .attr("height", h)
            .style("fill", "url(#gradient)")
            .attr("transform", "translate(0,5)");

        var y = d3.scaleLinear()
            .range([h, 0])
            .domain([minValv4, maxValv4]);

        var yAxisv4 = d3.axisRight(y);

        key.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(0,5)")
            .call(yAxisv4);

    });
});

function clicked(d) {

    var name = d.properties["abbr"];

    if (name == "AK") { chosenStateData = alaskaData; }
    else if (name == "AL") { chosenStateData = alabamaData; }
    else if (name == "AR") { chosenStateData = arkansasData; }
    else if (name == "AZ") { chosenStateData = arizonaData; }
    else if (name == "CA") { chosenStateData = californiaData; }
    else if (name == "CO") { chosenStateData = coloradoData; }
    else if (name == "CT") { chosenStateData = connecticutData; }
    else if (name == "DC") { chosenStateData = districtOfColumbiaData; }
    else if (name == "DE") { chosenStateData = delawareData; }
    else if (name == "FL") { chosenStateData = floridaData; }
    else if (name == "GA") { chosenStateData = georgiaData; }
    else if (name == "HI") { chosenStateData = hawaiiData; }
    else if (name == "IA") { chosenStateData = iowaData; }
    else if (name == "ID") { chosenStateData = idahoData; }
    else if (name == "IL") { chosenStateData = illinoisData; }
    else if (name == "IN") { chosenStateData = indianaData; }
    else if (name == "KS") { chosenStateData = kansasData; }
    else if (name == "KY") { chosenStateData = kentuckyData; }
    else if (name == "LA") { chosenStateData = louisianaData; }
    else if (name == "MA") { chosenStateData = massachusettsData; }
    else if (name == "MD") { chosenStateData = marylandData; }
    else if (name == "ME") { chosenStateData = maineData; }
    else if (name == "MI") { chosenStateData = michiganData; }
    else if (name == "MN") { chosenStateData = minnesotaData; }
    else if (name == "MO") { chosenStateData = missouriData; }
    else if (name == "MS") { chosenStateData = mississippiData; }
    else if (name == "MT") { chosenStateData = montanaData; }
    else if (name == "NC") { chosenStateData = northCarolinaData; }
    else if (name == "ND") { chosenStateData = northDakotaData; }
    else if (name == "NE") { chosenStateData = nebraskaData; }
    else if (name == "NH") { chosenStateData = newHampshireData; }
    else if (name == "NJ") { chosenStateData = newJerseyData; }
    else if (name == "NM") { chosenStateData = newMexicoData; }
    else if (name == "NV") { chosenStateData = nevadaData; }
    else if (name == "NY") { chosenStateData = newYorkData; }
    else if (name == "OH") { chosenStateData = ohioData; }
    else if (name == "OR") { chosenStateData = oregonData; }
    else if (name == "OK") { chosenStateData = oklahomaData; }
    else if (name == "PA") { chosenStateData = pennsylvaniaData; }
    else if (name == "RI") { chosenStateData = rhodeIslandData; }
    else if (name == "SC") { chosenStateData = southCarolinaData; }
    else if (name == "SD") { chosenStateData = southDakotaData; }
    else if (name == "TN") { chosenStateData = tennesseeData; }
    else if (name == "TX") { chosenStateData = texasData; }
    else if (name == "UT") { chosenStateData = utahData; }
    else if (name == "VA") { chosenStateData = virginiaData; }
    else if (name == "VT") { chosenStateData = vermontData; }
    else if (name == "WA") { chosenStateData = washingtonData; }
    else if (name == "WI") { chosenStateData = wisconsinData; }
    else if (name == "WV") { chosenStateData = westVirginiaData; }
    else if (name == "WY") { chosenStateData = wyomingData; }

    g.selectAll("circle").classed("active", true);

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
        .call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scalev4) ); // updated for d3 v4

    // extra: showing circles for each facility
    chosenStateData.forEach(function(d) {
        // convert variables into numeric form
        d.latitude = d.latitude;

        d.longitude = d.longitude;

    });

    // Draw circles
    // create circles and append data
    var circle = g.selectAll("circle")
        .data(chosenStateData);

    circle.enter().append("circle")
        .attr("class", "circlev4")
        .merge(circle)
        .on("click", function(d){

            // appending building information to column 2
            // TRAUMA SPS PRS CMHC PTSD SMA
            document.getElementById("column2").innerHTML =
                "<table width=\"550\">" +
                "<tr><td>" +'<span style="color:yellow">' + 'Facility: ' + '</span>' + d.TITLE + "</td></tr>"+
                "<tr><td>" +'<span style="color:yellow">' + 'Address: ' + '</span>' + d.ADDR + "</td></tr>"+
                "<tr><td>" +'<span style="color:yellow">' + 'Website: ' + '</span>' + d.WEBSITE + "</td></tr>"+
                "<tr><td>" +'<span style="color:yellow">' + 'Phone Number: ' + '</span>' + d.PHONE + "</td></tr>"+
                "<tr><td>" +'<span style="color:yellow">' + 'State Mental Health Authority: ' + '</span>' + d.SMA + "</td></tr>"+
                "<tr><td>" +'<span style="color:yellow">' + 'Community Mental Health Center: ' + '</span>' + d.CMHC + "</td></tr>"+
                "<tr><td>" +'<span style="color:yellow">' + 'Psychosocial rehabilitation services: ' + '</span>' + d.PRS + "</td></tr>"+
                "<tr><td>" +'<span style="color:yellow">' + 'Suicide prevention services: ' + '</span>' + d.SPS + "</td></tr>"+
                "<tr><td>" +'<span style="color:yellow">' + 'Trauma therapy: ' + '</span>' + d.TRAUMA + "</td></tr>"+
                "<tr><td>" +'<span style="color:yellow">' + 'PTSD services: ' + '</span>' + d.PTSD + "</td></tr>"+  "</table>";
        })
        .on("mouseover", tool_tip.show)
        .on("mouseout", tool_tip.hide)
        .transition()
        .duration(200)
        .attr("r", 1)
        .attr("opacity", 0.8)
        .attr("transform", function(d) {
            return "translate(" + projection([d.longitude, d.latitude]) + ")";
        });

    svg.call(tool_tip);

    circle.exit().remove();

}

function reset() {

    g.selectAll("circle")
        .attr("class", "circlev4")
        .attr("opacity", 0)
        .on("mouseover", tool_tip.hide);

    active.classed("active", false);
    active = d3.select(null);

    svgv4.transition()
        .duration(750)
        .call( zoom.transform, d3.zoomIdentity ); // updated for d3 v4
}

function zoomed() {
    g.style("stroke-width", 2 / d3.event.transform.k + "px");
    g.attr("transform", d3.event.transform); // updated for d3 v4
}

// If the drag behavior prevents the default click,
// also stop propagation so we don’t click-to-zoom.
function stopped() {
    if (d3.event.defaultPrevented) d3.event.stopPropagation();
}