/* The code for our drawing application! 
Feel free to delete any/all of it and replace with your own functionality. */

var path;
var currentColor = $('#palette').val();
var strokes = [];
var prevTool = ['pen'];

// function getArrayLength(arr) {
//     let count = 0;
//     console.log('function called');
//     for (var element of arr) {
//         console.log(element);
//         count++;
//     }
//     return count;
//   }

tool.onMouseDown = function(event) { //This code in this function is called whenever the mouse is clicked.
    path = new Path();     // Create a new path each time.
    path.add(event.point);
    path.strokeColor = currentColor;
    path.strokeWidth = parseInt($('#thickness').val());
    path.strokeCap = 'round';
    path.strokeJoin = 'round';
    try {
        var seg = path._segments[2];
        console.log('actual stroke');
        strokes.push(path);
      }
    catch(err) {
        console.log('just a click');
      }
}
tool.onMouseDrag = function(event) {
    path.add(event.point); //Add points to the path as the user drags their mouse.
}

$('#pen').on('click', function (e) { //jquery click event code for our "pencil" button.
    currentColor = $('#palette').val();
    prevTool.unshift('pen');
})

$('#pencil').on('click', function (e) { //jquery button click code for our "green paint" button.
    console.log("pencil clicked");
    currentColor = $('#palette').val();
    prevTool.unshift('pencil');
})

$('#brush').on('click', function (e) { //jquery button click code for our "green paint" button.
    console.log("brush clicked");
    currentColor = $('#palette').val();
    prevTool.unshift('brush');
})

$('#eraser').on('click', function (e) { //jquery button click code for our eraser button.
    currentColor = 'white';
    prevTool.unshift('eraser');
})

$('#palette').on('input', function (e) {
    currentColor = $('#palette').val();
    for(var j = 0; j < document.styleSheets[2].rules.length; j++) {
        var rule = document.styleSheets[2].rules[j];
        if(rule.cssText.match("webkit-slider-thumb")) {
            rule.style.background = $('#palette').val();
        }
    }
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
            rule.style.height = thumbSize;
            rule.style.width = thumbSize;
        }
    }
  };

// touch gestures
var canvas = document.getElementById('my-canvas');
var tools = document.getElementsByClassName('tools')[0];

// We create a manager object, which is the same as Hammer(), but without the presetted recognizers. 
var mc = new Hammer.Manager(canvas);
var toolsManager = new Hammer.Manager(tools);

var tap = new Hammer.Tap({ event: 'tap' });
mc.add(tap);
mc.on('tap', function(ev) {
    console.log('tap');
    strokes.pop().remove();
    strokes.pop().remove();
    // document.getElementById(prevTool[1]).click();
});

var swipe = new Hammer.Swipe();
toolsManager.add(swipe);
toolsManager.on('swipe', function(ev) {
    console.log('swipe');
    var tools = $($(".tools")[0]);
    var animationDuration = 2000; // Duration of the animation in milliseconds
    console.log($('#canvas').width());
    console.log(tools.width());
    var targetPositionX = $('#canvas').width() - tools.width() - 50; // Move to the rightmost position
    var targetPositionY = $('#canvas').height() - tools.height() - 10; // Move to the bottommost position

    // Animate the div
    tools.animate(
    {
        left: targetPositionX,
        top: targetPositionY
    },
    animationDuration
    );

});

var press = new Hammer.Press({ time: 1000 });
mc.add(press);
mc.on('press', function(ev) {
    console.log('press');
    var tools = document.getElementsByClassName('tools')[0];
    var leftBar = document.getElementsByClassName('col-3')[0];

    if (tools.style.display == 'none') {
        tools.style.display = '';
        leftBar.style.display = '';
    } else {
        tools.style.display = 'none';
        leftBar.style.display = 'none';
    }
})







// saving canvas works
var canvas = document.getElementById('my-canvas');
var createNewButton = document.getElementById('create-new');
var imagePreview = document.getElementById('past-works');

createNewButton.addEventListener('click', save);

function clearCanvas() {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log(strokes);
    for (var i = 0; i < strokes.length; i++) {
        strokes[i].remove();
    }
    strokes = [];
    console.log("cleared");
}

function save() {
    console.log("button clicked");
    // Save the canvas as an image
    var dataUrl = canvas.toDataURL('image/png');
  
    // Create a container div for the image
    var container = document.createElement('div');
    container.style = 'padding: 30px; padding-left: 45px; padding-bottom: 0px; display: inline-block;';
  
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