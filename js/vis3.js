// SVG drawing area

var margin = {top: 40, right: 40, bottom: 60, left: 60};

var width = 540 - margin.left - margin.right,
    height = 390 - margin.top - margin.bottom;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// slider
var tooltipSlider = document.getElementById('slider-tooltips');
noUiSlider.create(tooltipSlider, {
    start: [2008, 2015],
    tooltips: true,
    margin: 1,
    format: wNumb({decimals: 0}),
    range: {
        'min': 2008,
        'max': 2015
    }
});
tooltipSlider.noUiSlider.on('set', function(){updateLineChart(), hideBarChart();});

// loaddata
var male;
loadmaleData();
function loadmaleData() {
    d3.csv("data/Vis3/male-transposed.csv", function(error, csv) {
        csv.forEach(function(d){
            d.YEAR = +d.YEAR;
            d.THOUGHT = +d.THOUGHT;
            d.PLAN = +d.PLAN;
            d.ATTEMPT = +d.ATTEMPT;
        });
        // Store csv data in global variable
        male = csv;
    });
}

var female;
loadfemaleData();
function loadfemaleData() {
    d3.csv("data/Vis3/female-transposed.csv", function(error, csv) {
        csv.forEach(function(d){
            d.YEAR = +d.YEAR;
            d.THOUGHT = +d.THOUGHT;
            d.PLAN = +d.PLAN;
            d.ATTEMPT = +d.ATTEMPT;
        });
        // Store csv data in global variable
        female = csv;
    });
}

var bar_data;
d3.csv("data/Vis3/byage.csv", function(error, byage) {
    // clean bar chart data
    byage.forEach(function(d){
        for (var i = 2008; i < 2016; i++)
            d[i] = +d[i];
    });

    bar_data = byage;
});


// loading 4 data sets
var data;
loadtotalData();
function loadtotalData() {
    d3.csv("data/Vis3/total-transposed.csv", function(error, csv) {

        csv.forEach(function(d){
            d.YEAR = +d.YEAR;
            d.THOUGHT = +d.THOUGHT;
            d.PLAN = +d.PLAN;
            d.ATTEMPT = +d.ATTEMPT;
        });
        // Store csv data in global variable
        data = csv;

        // Draw the visualization for the first time
        updateLineChart();
    });
}

// Render main visualization - line chart
function updateLineChart() {

    // Scales
    var x = d3.scaleLinear()
        .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    // transition
    var t = d3.transition().duration(750);

    // get option for data type
    var option = d3.select("#data-type").property('value');

    var startyr = tooltipSlider.noUiSlider.get()[0];
    var endyr = tooltipSlider.noUiSlider.get()[1];

    // filter according to start and end years to update data
    filtered_alldata = data.filter(function(d){return d.YEAR >= startyr && d.YEAR <= endyr;});

    // add two more lines for males and females
    filtered_male = male.filter(function(d){return d.YEAR >= startyr && d.YEAR <= endyr;});
    filtered_female = female.filter(function(d){return d.YEAR >= startyr && d.YEAR <= endyr;});

    // var line
    var line = d3.line()
        .x(function (d) { return x(d.YEAR);})
        .y(function (d) { return y(d[option]);});

    // var axes
    x.domain([d3.min(filtered_alldata, function(d) { return d.YEAR; }), d3.max(filtered_alldata, function(d) { return d.YEAR; })]);
    y.domain([d3.min(filtered_alldata, function(d) { return d[option]; })-0.5, d3.max(filtered_alldata, function(d) { return d[option]; })+0.5]);

    var xAxis = d3.axisBottom(x).tickValues(d3.range(startyr, endyr)).tickFormat(d3.format(".0f"));
    var yAxis = d3.axisLeft(y);

    //axes
    var xxx = svg.selectAll(".axis--x")
        .data(filtered_alldata);

    var yyy = svg.selectAll(".axis--y")
        .data(filtered_alldata);

    xxx.enter().append("g")
        .merge(xxx)
        .attr("class", "axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    yyy.enter().append("g")
        .merge(yyy)
        .transition(t)
        .attr("class", "axis--y")
        .call(yAxis);

    xxx.exit().remove();
    yyy.exit().remove();
    
    // two more paths for male and female
    var male_path = svg.selectAll(".mline")
        .data(filtered_male);
    male_path.enter().append("path")
        .merge(male_path)
        .transition(t)
        .attr("class", "mline")
        .attr("data-legend","Male")
        .attr("d", line(filtered_male));
    male_path.exit().remove();

    var female_path = svg.selectAll(".fline")
        .data(filtered_female);
    female_path.enter().append("path")
        .merge(female_path)
        .transition(t)
        .attr("class", "fline")
        .attr("data-legend","Female")
        .attr("d", line(filtered_female));
    female_path.exit().remove();


    // path
    var path = svg.selectAll(".line")
        .data(filtered_alldata);
    path.enter().append("path")
        .merge(path)
        .transition(t)
        .attr("class", "line")
        .attr("data-legend","Total")
        .attr("d", line(filtered_alldata));
    path.exit().remove();


    // axes titles
    svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (-margin.left/1.8) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .text("Percetage")
        .style("font-weight", 400);

    svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (width/2) +","+(height+(margin.bottom-10))+")")  // centre below axis
        .text("Year")
        .style("font-weight", 400);

    // chart title
    svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (width/2) +"," + (-10)+")")  // centre below axis
        .text("Survey Results over Selected Years")
        .attr("class", "chart-title")
        .style("font-weight", 400);

    d3.selectAll(".chart-title").html("Suicidal " +  option.toLowerCase() + " data from " + startyr + " to " + endyr);

    // create option-specific tip
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-20, 0])
        .html(function(d) {
            selected_year = d.YEAR;
            male_data = male.filter(function(d){return d.YEAR == selected_year})[0][option];
            female_data = female.filter(function(d){return d.YEAR == selected_year})[0][option];

            return "<strong>" + d.YEAR + "  survey results on suicidal " + option.toLowerCase()+ "</strong>" +
                "<br>" + "Total: " + "<span style='color:yellow'>"+ d[option] + "%" + "</span>" +
                "<br>" + "Female: " + "<span style='color:yellow'>"+ female_data + "%" + "</span>" +
                "<br>" + "Male: " + "<span style='color:yellow'>"+ male_data + "%" + "</span>";
        });

    svg.call(tip);

    // dots
    var dots = svg.selectAll(".dot")
        .data(filtered_alldata);

    dots.enter().append("circle")
        .merge(dots)
        .attr("class", "dot")
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .on("click", function(d){return updateBarChart(d);})
        .transition(t)
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 8);
    dots.exit().remove();

}

var background = $("#background");

// if selection changed, bar chart should be hidden
function hideBarChart() {
    // hide bars, display background
    $('#bars').replaceWith(background);
}

// bug - if click on dot again, bar chart doesn't display
function updateBarChart(d) {
    // hide background, display bars
    $('#bars').replaceWith('<div id="bars"></div>');
    $('#background').replaceWith('<div id="bars"></div>');

    var svg2 = d3.select("#bars").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // update bar chart
    var selected_year = d.YEAR;
    var option = d3.select("#data-type").property('value');
    // filter bar_data according to option
    var filtered_by_option = bar_data.filter(function (d){ return d['TYPE'] == option;});

    // create display data for the selected year
    var display = d3.range(0,10).map(function () {return 0;});
    var groups = d3.range(0,10).map(function () {return 'range';});

    for (i = 0; i < 10; i++)
        display[i] = filtered_by_option[i][selected_year], groups[i] = filtered_by_option[i].AGE;

    // draw the bar chart based on year and option selected
    bar_x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.25)
        .domain(d3.range(0,10));

    bar_y = d3.scaleLinear()
        .range([height,0]);

    bar_xAxis = d3.axisBottom()
        .scale(bar_x);

    bar_yAxis = d3.axisLeft()
        .scale(bar_y);

    svg2.append("g")
        .attr("class", "bar-x-axis axis")
        .attr("transform", "translate(0," + height + ")");

    svg2.append("g")
        .attr("class", "bar-y-axis axis");

    bar_y.domain([0,d3.max(display)+1]);

    // insert bars
    var bars = svg2.selectAll(".bar").data(display);
    bars.enter().append("rect")
        .attr("class", "bar")
        .merge(bars)
        .attr("width", bar_x.bandwidth())
        .attr("height", function(d){return height - bar_y(d);})
        .attr("x", function(d, index){return bar_x(index);})
        .attr("y", function(d){return bar_y(d);})
        .attr("fill", "#94618E")
        .on("mouseover", function(){
            d3.select(this)
                .attr("fill", "lightgray");
        })
        .on("mouseout", function(){
            d3.select(this)
                .attr("fill", "#94618E")
        });
    bars.exit().remove();

    // insert bar labels
    var barlabels = svg2.selectAll(".barlabels").data(display);
    barlabels.enter().append("text")
        .attr("class", "barlabels")
        .merge(barlabels)
        .attr("x", function(d, index){return bar_x(index) + bar_x.bandwidth()/5;})
        .attr("y", function(d){return bar_y(d) - 2;})
        .attr("fill", "black")
        .text(function(d){return d + "%"});
    barlabels.exit().remove();

    // Call axis function with the new domains
    svg2.select(".bar-y-axis")
        .call(bar_yAxis);

    svg2.select(".bar-x-axis").call(bar_xAxis)
        .selectAll("text")
        .text(function(d, i){
            var title = groups[i];
            return title;
        })   // show age groups
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d) {
            return "rotate(-45)"
        });

    // Axis titles
    svg2.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (-margin.left/2) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .text("Percetage")
        .style("font-weight", 400);

    svg2.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (width/2) +","+(height+(margin.bottom-10))+")")  // centre below axis
        .text("Age Groups")
        .style("font-weight", 400);

    var clickedCircle = this;
    d3.selectAll(".dot").each(function() {
        var currCircle = this;
        d3.select(this).select(".chart-title").style("visibility", function () {
            return (currCircle === clickedCircle) ? "visible" : "hidden";
        });
    });

    // chart title
    svg2.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate("+ (width/2) +"," + (-10)+")")  // centre below axis
        .attr("class", "chart-title-r")
        .style("font-weight", 400);

    d3.selectAll(".chart-title-r").html(selected_year + " data on suicidal " + option.toLowerCase() +  " across age groups")
}

