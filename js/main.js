// initialize fullPage.js
var backgroundColor = "white";
var firstTime = true;

// credit for colorScheme: colorbrewer2.org
// var colorScheme = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a']
var colorScheme = ['#94618E', '#8c96c6', '#b3cde3', '#b2e2e2', '#66c2a4','#2ca25f','#006d2c', '#08519c', '#3182bd','#6baed6']


$(document).ready(function() {
    $('#fullpage').fullpage({
        navigation: true,
        anchors: ['Page1', 'Page2', 'Page3', 'Page4', 'Page5', 'Page6', 'Page7'],
        verticalCentered: false,
        // background color for each slide

        sectionsColor : [backgroundColor, backgroundColor, backgroundColor,
                            backgroundColor, backgroundColor, backgroundColor],

        afterLoad: function( anchorLink, index, slideAnchor, slideIndex){
            var loadedSlide = $(this);


            // Actions and animimations to be started on loading section of a page


            if(index == 1){

                if (document.getElementById("typewritter").innerHTML.length == 0 ){
                    var i = 0;
                    var txt = "If you or someone you know is in a dark place, follow along with us. We want to help you part the clouds.";
                    var speed = 60; /* The speed/duration of the effect in milliseconds */
                    setTimeout(typeWriter, 1000);
                    function typeWriter() {
                        if (i < txt.length) {
                            document.getElementById("typewritter").innerHTML += txt.charAt(i);
                            i++;
                            setTimeout(typeWriter, speed);
                        }
                    }
                }

                // Actions after loading section for page 1
                if (firstTime == true) {
                    clearPulse1();
                    startTime1();
                    firstTime = false;
                }
            }

            if(index == 2){
                // Actions after loading section for page 2
            }
            if(index == 3){
                // Actions after loading section for page 3
                vis2.updateVis(-1);
            }
            if(index == 4){

                if (document.getElementById("storm1").innerHTML.length == 0){
                    var i = 0;
                    var txt = "All storms pass. Even the most brutal ones. And they will pass faster than you think.";
                    var speed = 40; /* The speed/duration of the effect in milliseconds */
                    typeWriter_i();
                    function typeWriter_i() {
                        if (i < txt.length) {
                            document.getElementById("storm1").innerHTML += txt.charAt(i);
                            i++;
                            setTimeout(typeWriter_i, speed);
                        }
                    }
                }

                if (document.getElementById("storm2").innerHTML.length == 0){
                    var j = 0;
                    var txtj = "According to Stumbling on Happiness by Harvard professor Daniel Gilbert, human beings tend to mispredict their own emotional responses to future events.";

                    setTimeout(typeWriter_j, 3000);
                    function typeWriter_j() {
                        if (j < txtj.length) {
                            document.getElementById("storm2").innerHTML += txtj.charAt(j);
                            j++;
                            setTimeout(typeWriter_j, speed);
                        }
                    }
                }

                if (document.getElementById("storm3").innerHTML.length == 0){
                    var l = 0;
                    var txtl = "On average, bad events proved less intense and more transient than test participants predicted.";

                    setTimeout(typeWriter_l, 7000);
                    function typeWriter_l() {
                        if (l < txtl.length) {
                            document.getElementById("storm3").innerHTML += txtl.charAt(l);
                            l++;
                            setTimeout(typeWriter_l, speed);
                        }
                    }
                }
                

            }
            if(index == 5){
                // Actions after loading section for page 5
            }
            if(index == 6){
                // Actions after loading section for page 6
            }

            if(index == 7){
                // Actions after loading section for page 7
            }


        },

        onSlideLeave: function( anchorLink, index, slideAnchor, slideIndex){
            var loadedSlide = $(this);


            // Actions and animimations to be started on loading section of a page


            if(index == 1){
                // Actions after loading section for page 1
            }

            if(index == 2){
                // Actions after loading section for page 2
            }
            if(index == 3){
                // Actions after loading section for page 3
            }
            if(index == 4){
                // Actions after loading section for page 4
            }
            if(index == 5){
                // Actions after loading section for page 5
            }
            if(index == 6){
                // Actions after loading section for page 6
            }

            if(index == 7){
                // Actions after loading section for page 7
            }


        }
    });


});

//







