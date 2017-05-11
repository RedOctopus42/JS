// **********************************************************************************
// ********************************* Classe ColorPalette ****************************
// *************************************************************************
/*global $*/
"use strict";


var ColorPicker = function(){
    this.canvas      = document.getElementById('color-palette');
    this.ctx         = this.canvas.getContext('2d');
    this.pickedColor = {};

    this.canvas.addEventListener('click', this.onClickCanvas.bind(this));

    this.fillGradient();

}


// Récupération des infos sur le pixel cliqué
ColorPicker.prototype.onClickCanvas = function(){
    var mouseX, mouseY, color;

    mouseX = event.pageX - this.canvas.offsetLeft;
    mouseY = event.pageY - this.canvas.offsetTop;
    color  = this.ctx.getImageData(mouseX,mouseY,1,1);

    this.pickedColor = {
        red : color.data[0],
        green : color.data[1],
        blue : color.data[2]
    };

    // déclenchement de l'évènement "maison"
    $(document).trigger('magical-slate:pick-color');
}

ColorPicker.prototype.fillGradient = function(){
    var gradient;

    // génération du dégradé de couleurs
    gradient = this.ctx.createLinearGradient(0,0,this.canvas.width,0)
    gradient.addColorStop(0  , 'rgb(255,0,0)');
    gradient.addColorStop(.15, 'rgb(255,0,255)');
    gradient.addColorStop(.32, 'rgb(0,0,255)');
    gradient.addColorStop(.49, 'rgb(0,255,255)');
    gradient.addColorStop(.66, 'rgb(0,255,0)');
    gradient.addColorStop(.83, 'rgb(255,255,0)');
    gradient.addColorStop(1  , 'rgb(255,0,0)');

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

    // génération du dégradé du noir au blanc
    gradient = this.ctx.createLinearGradient(0,0,0,this.canvas.height)
    gradient.addColorStop(0, 'rgba(256,256,256,1)');
    gradient.addColorStop(.5, 'rgba(256,256,256,0)');
    gradient.addColorStop(.5, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,1)');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
}