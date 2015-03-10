$(document).ready(function(){
  window.dancers = [];
  //--

  $('body').on('click', '.dancer', function(){
    
  });
  $('body').on('click', '.sun', function(){
    $(this).css({
      'background-color' : 'white'
    }).animate({
      'width': "200px",
      'height': '200px'
    },400,
      function(){
        $(this).animate({
          'width': "5px",
          'height': '5px'
        },100);
        $(this).css('background-color', 'black');
      }
    );
  });
  //~~~~~ Top Bar Handlers

  $(".addDancerButton").on("click", function(event){

    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    $('body').append(dancer.$node);
  });
});

