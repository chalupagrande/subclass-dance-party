var Sun = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps, 'sun');
  this._timeBetweenSteps = timeBetweenSteps;
};

Sun.prototype = Object.create(Dancer.prototype);
Sun.prototype.constructor = Sun;
Sun.prototype.step = function(){
  Dancer.prototype.step.call(this);
  //this.$node.toggle();
};