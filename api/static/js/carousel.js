// Activate Carousel
$("#carouselExampleControls").carousel();

// Enable Carousel Indicators
$(".item").click(function(){
  $("#carouselExampleControls").carousel(1);
});

// Enable Carousel Controls
$(".left").click(function(){
  $("#carouselExampleControls").carousel("prev");
});