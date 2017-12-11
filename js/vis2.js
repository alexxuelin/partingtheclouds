/*** LOAD DATA ***/

var vis2 = {};

loadDataVis2();

function loadDataVis2 () {

    var answers = [];

    d3.csv("data/vis2/vis2datafinal.csv", function (data) {


        data.forEach(function(d, i) {

            answers.push({});
            answers[i].emotion = data[i].Emotion;
            answers[i].dots = +data[i].Dots;
            answers[i].sentence = data[i].Sentence;
            answers[i].source = data[i].Source;
        });

        // create buttons to select emotion felt
        answers.forEach(function(d, i) {
            d3.select("#vis2-buttons")
                .append('button')
                .attr("type", "button")
                .attr("class", "btn btn-primary vis2-button")
                .attr("value", i)
                .style("background-color", colorScheme[i])
                .text(d.emotion);
        });

        // create vis2
        vis2 = new DotsVisualization("#dots", answers);

        // create listener for buttons

        $(".vis2-button").click(function() {
            vis2.updateVis($(this).val());

        });



    });


};

