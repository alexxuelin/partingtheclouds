// Page 3 - How are You Feeling (Dots Visualization) by Dylan de Waart

DotsVisualization = function(_parentElement, _answers) {

    this.answers=_answers;
    this.parentElement=_parentElement;
    this.emotions = [];
    this.noEmotion = {};
    this.margin = {top: 0, right: 0, bottom: 0, left: 0};
    this.width = 475 - this.margin.left -this.margin.right;
    this.height = 475 - this.margin.top - this.margin.bottom;
    this.r = 7;

    this.initVis();

    $(".not-alone").hide();
};

DotsVisualization.prototype.initVis = function() {
    var vis=this;

    // create array with 100 default grey dots (no emotion selected)
    vis.noEmotion.nodes = [];
    vis.noEmotion.edges = [];
    for (var j=0; j<=100; j++) {
        vis.noEmotion.nodes.push({});
        if (j == 0) {
            vis.noEmotion.nodes[j].color = "red";
            vis.noEmotion.nodes[j].group = "self";
            vis.noEmotion.nodes[j].fx = 0;
            vis.noEmotion.nodes[j].fy = 0;
        }
        else {
            vis.noEmotion.nodes[j].color = "#9a9a9a";
            vis.noEmotion.nodes[j].group = "excluded";
        }
    }

    // create array for 101 dots for each answer; attribute each dot
    vis.answers.forEach(function(d, i) {
        vis.emotions.push({});
        //console.log(vis.emotions[i]);
        vis.emotions[i].nodes = [];
        vis.emotions[i].edges = [];
        for (var j=0; j<=100; j++) {
            vis.emotions[i].nodes.push({});
            if (j==0) {
                vis.emotions[i].nodes[j].color="red";
                vis.emotions[i].nodes[j].group="self";
                vis.noEmotion.nodes[j].fx = 0;
                vis.noEmotion.nodes[j].fy = 0;
            }
            else {
                if (j<=vis.answers[i].dots) {
                    vis.emotions[i].nodes[j].color=colorScheme[i]; //orange
                    vis.emotions[i].edges.push({source: 0, target: j});
                    vis.emotions[i].nodes[j].group="included";
                }
                else {
                    vis.emotions[i].nodes[j].color="#9a9a9a"; //grey
                    vis.emotions[i].nodes[j].group="excluded";
                }
            }
        }

    });

    // create svg drawing area

    vis.svg = d3.select(vis.parentElement)
        .append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + (vis.width/2) + "," + (vis.height/2) + ")");


};

DotsVisualization.prototype.updateVis = function(answer) {

    var vis=this;

    if (answer > -1) {
        $(".not-alone").show();
        $("#vis2-caption").html(vis.answers[answer].sentence).show();
    }
    else {
        $(".not-alone").hide();
    };


    d3.selectAll(".vis2-dot")
        .remove();

    // initial randomized grey dots pattern
    var dots = vis.svg.selectAll(".vis2-dot")
        .data(vis.noEmotion.nodes);

    var updateSelection = dots.enter()
        .append("circle")
        .attr("class", "vis2-dot")
        .attr('r', vis.r)
        .attr("fill", function (d) {
            return d.color;
        })
        .attr("stroke", function(d,i) {
            if (i==0) {return "#b30000";}
            else {return d.color;}
        });

    vis.simulation = d3.forceSimulation(vis.noEmotion.nodes);

    vis.simulation
        .velocityDecay(0.29)
        .force('charge', d3.forceManyBody().strength(-22).distanceMax(40))
        .force("collision", d3.forceCollide().radius(12))
        .force("center", d3.forceCenter().x(0).y(0))
        //.force("link", d3.forceLink(vis.noEmotion.edges).distance(1).strength(0.27))
        .on('tick', function () {

            updateSelection
                .attr('cx', function (d) {
                    return d.x;
                })
                .attr('cy', function (d) {
                    return d.y;
                });
        });

    // if answer selected bind new data and change simulation
    if (answer > -1) {

        setTimeout(function () {

            dots = vis.svg.selectAll(".vis2-dot")
                .data(vis.emotions[answer].nodes);

            updateSelection = dots
                .merge(dots)
                .attr("fill", function (d) {
                    return d.color;
                })
                .attr("stroke", function(d,i) {
                    if (i==0) {return "#b30000";}
                    else {return d.color;}
                });


            vis.simulation.nodes(vis.emotions[answer].nodes);

            vis.simulation
                .velocityDecay(0.7)
                .force("collision", d3.forceCollide().radius(function (d) {
                    if (d.group == "self" || d.group == "included") {
                        return vis.r + 2
                    }
                    else {
                        return 12
                    }
                }))
                .force("link", d3.forceLink(vis.emotions[answer].edges).distance(1).strength(0.27))
                .on('tick', function () {

                    updateSelection
                        .transition()
                        .duration(100)
                        .attr('cx', function (d) {
                            return d.x;
                        })
                        .attr('cy', function (d) {
                            return d.y;
                        });
                });



            //vis.simulation.restart();


        }, 500);


    };

};

