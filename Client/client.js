var canvas = document.createElement("canvas");
canvas.width = 500;
canvas.height = 500;
document.getElementsByTagName('body')[0].appendChild(canvas);

var context = canvas.getContext('2d');

var pic = new Image();
pic.onload = function()
{
	context.drawImage(pic, 0, 0, 300, 300);
}

pic.src = 'images/420praiseit.png';

