/* The code for our drawing application! 
Feel free to delete any/all of it and replace with your own functionality. */

var path;
var currentColor = $('#palette').val();
var currentWidth = 5

tool.onMouseDown = function(event) { //This code in this function is called whenever the mouse is clicked.
    path = new Path();     // Create a new path each time.
    path.add(event.point);
    path.strokeColor = currentColor;
    path.strokeWidth = currentWidth;
    console.log(event.point); //this commands log to the Console the coordinates of the mouse click. Feel free to delete it! 
}
tool.onMouseDrag = function(event) {
    path.add(event.point); //Add points to the path as the user drags their mouse.
}

$('#pen').on('click', function (e) { //jquery click event code for our "pencil" button.
    currentColor = $('#palette').val();
    currentWidth = 5;       //change the width to 5
})
$('#pencil').on('click', function (e) { //jquery button click code for our "green paint" button.
    console.log("pencil clicked");
    currentColor = $('#palette').val();
    currentWidth = 15;
})
$('#brush').on('click', function (e) { //jquery button click code for our "green paint" button.
    console.log("brush clicked");
    currentColor = $('#palette').val();
    currentWidth = 15;
})
$('#eraser').on('click', function (e) { //jquery button click code for our eraser button.
    currentColor = 'white';
    currentWidth = 20;
})

$('#palette').on('input', function (e) {
    currentColor = $('#palette').val();
})

// $(window).on('resize', function() {
//     var canvas = $('#my-canvas')[0];
//     var container = $('#canvas')[0];
//     console.log(canvas);
//     console.log(container);

//     console.log($('#my-canvas').attr('width'));
//     console.log($('#canvas').attr('width'));


//     $('#my-canvas').attr('width', $('#canvas').attr('width'));
//     $('#my-canvas').attr('height', $('#canvas').attr('height'));

//   });
