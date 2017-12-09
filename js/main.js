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







