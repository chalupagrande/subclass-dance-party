 var DougDancer = function(top, left, timeBetweenSteps){

  Dancer.call(this, top, left, timeBetweenSteps);

  this.$node.css('background-image', 'src/dougcalhoun.jpg');
  this.$node.html('<img class="doug" style="border-radius:50%" src="src/dougcalhoun.jpg" width="100"></img>');
  this.$node.css('border','none');

};

DougDancer.prototype = Object.create(Dancer.prototype);
DougDancer.prototype.constructor = DougDancer;

DougDancer.prototype.step = function(){
  Dancer.prototype.step.call(this);
  var r = Math.floor(Math.random() * 360);
  this.$node.css('transform','rotate('+ r + 'deg)');
};

