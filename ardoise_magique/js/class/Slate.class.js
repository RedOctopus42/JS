'use strict';
/* global Pen*/

// constructeur de classe
var Slate = function(pen){
    this.canvas     = document.getElementById('slate');
    this.ctx        = this.canvas.getContext('2d');
    this.isDrawing  = false;
    this.pen        = pen;
    this.position   = {};

    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
}


Slate.prototype.onMouseDown = function(){
    // "this" vaut Slate grace au bind lors de son appel
    // et pas this.canvas ca ça devrait l'être

    // on récupère les coordonées initiales de la souris avant de démarrer le dessin
    this.position = this.getMouseLocation();
    this.isDrawing = true;
}

Slate.prototype.getMouseLocation = function(){
    var mouseX = event.pageX - this.canvas.offsetLeft;
    var mouseY = event.pageY - this.canvas.offsetTop;

    return {x:mouseX, y:mouseY};
}

Slate.prototype.onMouseUp = function(){
    this.isDrawing = false;
}

Slate.prototype.clear = function(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
}



Slate.prototype.onMouseMove = function(){
    // on récupère la position actuelle le la souris avant de tracer
    var new_position = this.getMouseLocation();
    var old_position = this.position;

    if(this.isDrawing == true){
        this.ctx.beginPath();

        // on trace un trait depuis l'ancienne position
        this.ctx.moveTo(old_position.x, old_position.y);

        // jusqu'a à la nouvelle
        this.ctx.lineTo(new_position.x, new_position.y);

        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = this.pen.color;
        this.ctx.lineWidth = this.pen.size;
        this.ctx.stroke();
    }

    this.position.x = new_position.x;
    this.position.y = new_position.y;
}



