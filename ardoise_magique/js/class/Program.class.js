/*global $, Pen, Slate, ColorPicker */
"use strict";
// **********************************************************************************
// ********************************* Classe Program *********************************
// **********************************************************************************



/// Définition de la classe


// constructeur
var Program = function(){
    // propriétés, cas particulier : une composition
    this.pen = new Pen();
    this.slate = new Slate(this.pen);
    this.colorPicker = new ColorPicker();
}

// changer la couleur du crayon
Program.prototype.onClickPenColor = function(event){

    // Récupération de l'élément qui à été cliqué
    var colorCircle = event.currentTarget;

    // Récupération de l'attribut data "couleur"
    var color = colorCircle.dataset.color;
    //var color = $(colorCircle).data('color');

    // Changement de la couleur du crayon
    this.pen.setColor(color);

    // on change la couleur de la pastille
    $(document).trigger('magical-slate:change-color');
}

// changer la taille du crayon
Program.prototype.onClickPenSize = function(event){

    // Récupération de l'élément qui à été cliqué
    var sizeButton = event.currentTarget;

    // Récupération de l'attribut data "taille"
    var size = sizeButton.dataset.size;

    // Changement de la taille du crayon
    this.pen.setSize(size);
}

// effacer tout le canvas
Program.prototype.onClickToolClear = function(){
    this.slate.clear();
}

// OUVRE le canvas dégradé du color picker
Program.prototype.onClickColorPicker = function(event){
    $(this.colorPicker.canvas).fadeIn();

    // fonctions pour refermer le canvas de dégradé
    event.stopPropagation();
    $(document).click(this.onClickDocument.bind(this));
}

// FERME le canvas dégradé du color picker
Program.prototype.onClickDocument = function(event){
    if(event.target != this.colorPicker.canvas){
        $(this.colorPicker.canvas).fadeOut();
        $(document).off('click');
    }
}


// réponse à l'évènement "maison" au click avec la pipette
Program.prototype.onPickColor = function(){
    // on récupère la propriété color du stylo
    var color = this.colorPicker.pickedColor;

    // on lui demande de changer la couleur
    this.pen.setRGBColor(color.red, color.green, color.blue);

    // on change la couleur de la pastille
    $(document).trigger('magical-slate:change-color');
}

Program.prototype.onChangeColor = function(){
    $('#current-color').css('backgroundColor',this.pen.color);
}

//méthode
Program.prototype.start = function(){
    // "this" vaut l'instance du Program (->program)

    // Installation des gestionnaires d'évènements de configuration du crayon.
    $('.pen-color').click(this.onClickPenColor.bind(this));
    $('#tool-eraser').click(this.onClickPenColor.bind(this));
    $('#tool-clear').click(this.onClickToolClear.bind(this));

    $('.pen-size').click(this.onClickPenSize.bind(this));

    $('#tool-color-picker').click(this.onClickColorPicker.bind(this));

    // écouteur sur un évènement "maison" déclenché par le color picker
    $(document).on('magical-slate:pick-color', this.onPickColor.bind(this));

    // écouteur d'évènement au changement de couleur;
    $(document).on('magical-slate:change-color', this.onChangeColor.bind(this));

}

/*
// setter, ou méthode d'encapsulation
Program.prototype.setColor = function(color){
    this.color = color;
}
*/


/// instantiation de la classe en appellant son constructeur
// var program = new Program();
// program.start();





