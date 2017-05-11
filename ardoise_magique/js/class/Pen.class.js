'use strict';


var Pen = function(){

    this.color = 'black';
    this.size = 1;

}

Pen.prototype.setColor = function(color){
    this.color = color;
}

Pen.prototype.setSize = function(size){
    this.size = size;
}

Pen.prototype.setRGBColor = function(red, green, blue){

    var color = 'rgb('+ red +','+ green +','+ blue  +')';

    this.setColor(color);

}

Pen.prototype.getRandomColor = function(x,y){
    var red = 256;
    var green;
    var blue;

    //maxred = 256;
    //max x = slate.width
    var canvas = document.querySelector('canvas');

    red = Math.floor(x * 256 / canvas.width);
    green = Math.floor(y * 256 / canvas.height);
    blue =  Math.floor(256-  256*x / canvas.width) ;

    return 'rgb('+ red +','+ green +','+ blue +')';
    //-> rgb(256,200,50);
}