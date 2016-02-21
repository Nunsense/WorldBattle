$(document).ready( function() {
  $.ajax({
    url : '/api/games',
    type : 'POST',
    success : function(response){
      DrawGame(response.grid);
    },
    error : function(err){
      alert("something went wrong: " + err.message);
    }
  });
});

function DrawGame(grid) {
  var canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 100;
  canvas.height = 100;
  var ctx = canvas.getContext('2d');
  var image = ctx.createImageData(grid.w, grid.h);
  var data = image.data;

  var start = Date.now();

  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      var value = grid.cells[x][y].height;
      value *= 256;

      var cell = (x + y * image.height) * 4;
      data[cell] = data[cell + 1] = data[cell + 2] = value;
      data[cell] += Math.max(0, (25 - value) * 8);
      data[cell + 3] = 255; // alpha.
    }
  }

  var end = Date.now();
  ctx.fillColor = 'black';

  var imageObject = new Image();
  imageObject.onload = function() {
    ctx.fillRect(0, 0, image.width, image.height);
    ctx.putImageData(image, 0, 0);
    ctx.scale(10, 10);
    ctx.drawImage(imageObject, 0, 0);
  }
  imageObject.src = canvas.toDataURL();

  if (console) {
    console.log('Rendered in ' + (end - start) + ' ms');
  }
}
