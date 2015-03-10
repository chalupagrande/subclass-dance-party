var OrbitalDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);
  this._timeBetweenSteps = timeBetweenSteps;
  this.$node = $('<span class="dancer"></span>');
};

OrbitalDancer.prototype = Object.create(Dancer.prototype);
OrbitalDancer.prototype.constructor = OrbitalDancer;
OrbitalDancer.prototype.step = function(){
  Dancer.prototype.step.call(this);

  // find radius (distance);



};