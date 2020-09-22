$(function () {
  $('[data-toggle="popover"]').popover()
})

$(document).ready(function(){
    $('.feature-item').mouseover(() => {
        $('this').popover('show');
    });
 });