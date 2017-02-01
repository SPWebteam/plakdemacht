var canvas;
var canvasWidth;
var ctx;
var x;
var y;
var download;
var data;
var img;
var textcolor;
var lineHeight  = 190;
var startHeight = 550;
var lastY       = startHeight;
var maxChars    = 50;

var font  = '140pt HelveticaInseratLTPro';
var align = 'center';

var veranderbg1 = document.getElementById('thumb1');
var veranderbg2 = document.getElementById('thumb2');
var veranderbg3 = document.getElementById('thumb3');
var veranderbg4 = document.getElementById('thumb4');
var veranderbg5 = document.getElementById('thumb5');
var veranderbg6 = document.getElementById('thumb6');

window.onload = function () {
  prepareExample();
}

function changeBackground() {
  ctx.fillStyle = textcolor;
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, x, y);
  ctx.restore();
  text          = document.getElementById('custom-text').value;
  text = text.toUpperCase();
  var newHeight = startHeight - ((lastY - startHeight) / 2);
  wrapText(ctx, text, canvas.width / 2, newHeight, canvasWidth - canvasWidth / 15, lineHeight);
}

function prepareExample() {
  img = document.getElementById('bg1');
  textcolor = '#ffe000';

  veranderbg1.onclick = function () {
    img = document.getElementById('bg1');
    textcolor = '#ffe000';
    changeBackground();
  };

  veranderbg2.onclick = function () {
    img = document.getElementById('bg2');
    textcolor = '#ea0000';
    changeBackground();
  };

  veranderbg3.onclick = function () {
    img = document.getElementById('bg3');
    textcolor = '#ff4fa5';
    changeBackground();
  };

  veranderbg4.onclick = function () {
    img = document.getElementById('bg4');
    textcolor = '#ff4fa5';
    changeBackground();
  };

  veranderbg5.onclick = function () {
    img = document.getElementById('bg5');
    textcolor = '#ffe000';
    changeBackground();
  };

  veranderbg6.onclick = function () {
    img = document.getElementById('bg6');
    textcolor = '#00e000';
    changeBackground();
  };


  var deviceWidth = window.innerWidth;
  canvasWidth     = 1750;
  canvasHeight    = 2475;
  canvas          = document.getElementById('memecanvas');


  canvas.width  = canvasWidth;
  canvas.height = canvasHeight;
  ctx           = canvas.getContext('2d');

  x = canvas.width / 2 - img.width / 2;
  y = canvas.height / 2 - img.height / 2;

  ctx.drawImage(img, x, y);

  ctx.textAlign = align;
  ctx.lineWidth = 0;
  ctx.font      = font;
  ctx.fillStyle = textcolor;
  doTransform();

  ctx.textAlign = align;
  ctx.lineWidth = 0;
  ctx.font      = font;
//      ctx.textBaseline = 'top';

}

function doTransform() {
  text  = document.getElementById('custom-text').value;
  text = text.toUpperCase();
  chars = document.getElementById('charsLeft');

  chars.innerHTML = maxChars - text.length;

  if (text.length <= maxChars) {
    ctx.save();
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    // Finally, draw the image
    ctx.drawImage(img, x, y);

    ctx.restore();

    var newHeight = startHeight - ((lastY - startHeight) / 2);
    wrapText(ctx, text, canvas.width / 2, newHeight, canvasWidth - canvasWidth / 15, lineHeight);
  }
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line  = '';

  for (var n = 0; n < words.length; n++) {
    var testLine  = line + words[n] + ' ';
    var metrics   = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      //ctx.strokeText(line, x, y);
      ctx.fillText(line, x, y);
      line  = words[n] + ' ';
      y += lineHeight;
      lastY = y;
    }
    else {
      line = testLine;
    }
  }
  //ctx.strokeText(line, x, y);
  ctx.fillText(line, x, y);
}

function downloadCanvasAsPng() {
  ReImg.fromCanvas(document.querySelector('canvas')).downloadPng();
}

document.getElementById('checkboxAgreed').onchange = function () {
  document.getElementById('download_container').className = this.checked;
};

function onBlur(el) {
  if (el.value == '') {
    el.value = el.defaultValue;
  }
}

function onFocus(el) {
  if (el.value == el.defaultValue) {
    el.value = '';
  }
}
