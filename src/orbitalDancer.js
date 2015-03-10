var OrbitalDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, 100, 'randomPlanet" style="background-color:' + this.randomColor());
  this._timeBetweenSteps = 100;
  this._sun = this.randomSun();
  $($(this.$node)).orbit($(this._sun),{period: timeBetweenSteps*10});
};

OrbitalDancer.prototype = Object.create(Dancer.prototype);
OrbitalDancer.prototype.constructor = OrbitalDancer;
OrbitalDancer.prototype.randomColor = function(){
	 //replace with color
  var colors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
  var r = Math.floor(Math.random() * colors.length);
  return colors[r];
};
OrbitalDancer.prototype.randomSun = function(){
  return $('.sun')[Math.floor(Math.random() * $('.sun').length)];
};
OrbitalDancer.prototype.step = function(){
  Dancer.prototype.step.call(this);
};

    ( function ( $ ) {
        jQuery.fn.orbit = function(s, options){
            var settings = {
                            orbits:    100000     // Number of times to go round the orbit e.g. 0.5 = half an orbit
                           ,period:    5000  // Number of milliseconds to complete one orbit.
                           ,maxfps:    30    // Maximum number of frames per second. Too small gives "flicker", too large uses lots of CPU power
                           ,clockwise: true  // Direction of rotation.
            };
            $.extend(settings, options);  // Merge the supplied options with the default settings.
        
            return(this.each(function(){
                var p        = $(this);

/* First obtain the respective positions */

                var p_top    = p.css('top' ),
                    p_left   = p.css('left'),
                    s_top    = s.css('top' ),
                    s_left   = s.css('left');

/* Then get the positions of the centres of the objects */

                var p_x      = parseInt(p_top ) + p.height()/2,
                    p_y      = parseInt(p_left) + p.width ()/2,
                    s_x      = parseInt(s_top ) + s.height()/2,
                    s_y      = parseInt(s_left) + s.width ()/2;

/* Find the Adjacent and Opposite sides of the right-angled triangle */
                var a        = s_x - p_x,
                    o        = s_y - p_y;

/* Calculate the hypotenuse (radius) and the angle separating the objects */

                var r        = Math.sqrt(a*a + o*o);
                var theta    = Math.acos(a / r);
                
/* Calculate the number of iterations to call setTimeout(), the delay and the "delta" angle to add/subtract */

                var niters   = Math.ceil(Math.min(4 * r, settings.period, 0.001 * settings.period * settings.maxfps));
                var delta    = 2*Math.PI / niters;
                var delay    = settings.period  / niters;
                if (! settings.clockwise) {delta = -delta;}
                niters      *= settings.orbits;

/* create the "timeout_loop function to do the work */

                var timeout_loop = function(s, r, theta, delta, iter, niters, delay, settings){
                    setTimeout(function(){

/* Calculate the new position for the orbiting element */

                        var w = theta + iter * delta;
                        var a = r * Math.cos(w);
                        var o = r * Math.sin(w);
                        var x = parseInt(s.css('left')) + (s.height()/2) - a;
                        var y = parseInt(s.css('top' )) + (s.width ()/2) - o;

/* Set the CSS properties "top" and "left" to move the object to its new position */

                        p.css({top:  (y - p.height()/2),
                               left: (x - p.width ()/2)});

/* Call the timeout_loop function if we have not yet done all the iterations */

                        if (iter < (niters - 1))  timeout_loop(s, r, theta, delta, iter+1, niters, delay, settings);
                    }, delay);
                };

/* Call the timeout_loop function */

                timeout_loop(s, r, theta, delta, 0, niters, delay, settings);
            }));
        }
    }) (jQuery);