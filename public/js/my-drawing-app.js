/* The code for our drawing application! 
Feel free to delete any/all of it and replace with your own functionality. */

var path;
var currentColor = $('#palette').val();
var strokes = [];

tool.onMouseDown = function(event) { //This code in this function is called whenever the mouse is clicked.
    path = new Path();     // Create a new path each time.
    path.add(event.point);
    path.strokeColor = currentColor;
    path.strokeWidth = parseInt($('#thickness').val());
    path.strokeCap = 'round';
    path.strokeJoin = 'round';
    strokes.push(path);
    console.log(strokes);
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

var thickness = document.getElementById('thickness');



thickness.oninput = function() {
    var thumb = $(this).find('::-webkit-slider-thumb');
    var value = $(this).val();
    var thumbSize = value + 'px';

    for(var j = 0; j < document.styleSheets[2].rules.length; j++) {
        var rule = document.styleSheets[2].rules[j];
        if(rule.cssText.match("webkit-slider-thumb")) {
            rule.style.height=thumbSize;
            rule.style.width=thumbSize;
        }
    }
  };



// saving canvas works
var canvas = document.getElementById('my-canvas');
var createNewButton = document.getElementById('create-new');
var imagePreview = document.getElementById('past-works');

createNewButton.addEventListener('click', save);

function clearCanvas() {
    var context = canvas.getContext('2d');
    rect = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log(strokes);
    for (var i = 0; i < strokes.length; i++) {
        strokes[i].remove();
    }
    console.log("cleared");
}

function save() {
    console.log("button clicked");
    // Save the canvas as an image
    var dataUrl = canvas.toDataURL('image/png');
  
    // Create a container div for the image
    var container = document.createElement('div');
    container.style = 'padding: 20px; display: inline-block;';
  
    // Create an <img> element to display the image
    var img = document.createElement('img');
    img.src = dataUrl;
    img.style = "background-color: white"
  
    // Append the image to the container
    container.appendChild(img);
  
    // Append the container to the image preview container
    imagePreview.appendChild(container);

    console.log("Clearing canvas");
    clearCanvas();
  }