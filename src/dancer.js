// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps){
  //variables
  this.$node = $('<span class="dancer"></span>');
  this._timeBetweenSteps = timeBetweenSteps;
  this.setPosition(top, left);

  //starts the object animation (step)
  this.step();
};

Dancer.prototype.setPosition = function(top, left){
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.step = function(){
  setTimeout(this.step.bind(this), this._timeBetweenSteps);
};