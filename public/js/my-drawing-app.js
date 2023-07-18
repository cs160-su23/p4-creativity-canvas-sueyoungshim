/* The code for our drawing application! 
Feel free to delete any/all of it and replace with your own functionality. */

var path;
var currentColor = $('#palette').val();

tool.onMouseDown = function(event) { //This code in this function is called whenever the mouse is clicked.
    path = new Path();     // Create a new path each time.
    path.add(event.point);
    path.strokeColor = currentColor;
    path.strokeWidth = parseInt($('#thickness').val());
    path.strokeCap = 'round';
    path.strokeJoin = 'round';
    console.log(event.point); //this commands log to the Console the coordinates of the mouse click. Feel free to delete it! 
}
tool.onMouseDrag = function(event) {
    path.add(event.point); //Add points to the path as the user drags their mouse.
}

$('#pen').on('click', function (e) { //jquery click event code for our "pencil" button.
    currentColor = $('#palette').val();
})

$('#pencil').on('click', function (e) { //jquery button click code for our "green paint" button.
    console.log("pencil clicked");
    currentColor = $('#palette').val();
})

$('#brush').on('click', function (e) { //jquery button click code for our "green paint" button.
    console.log("brush clicked");
    currentColor = $('#palette').val();
})

$('#eraser').on('click', function (e) { //jquery button click code for our eraser button.
    currentColor = 'white';
})

$('#palette').on('input', function (e) {
    currentColor = $('#palette').val();
})

$('#thickness').on('input', function() {
    var thumb = $(this).find('::-webkit-slider-thumb');
    var value = parseInt($(this).val());

    thumb.css('width', value + 'px');
    thumb.css('height', value + 'px');
  });

// var thickness = document.getElementById('thickness');

// thickness.oninput = function() {
//     var thumb = $(this).find('::-webkit-slider-thumb');
//     var value = parseInt($(this).val());
//     var thumbSize = value + 'px';

//     if (value > 50) {
//         thumbSize = 50 + (value - 50) * 2;
//     }

//     thumb.css('width', thumbSize);
//     thumb.css('height', thumbSize);
//   };