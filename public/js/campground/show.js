$(function () {
  $('[data-toggle="popover"]').popover()
})

$(document).ready(function(){
    $('.feature-item').mouseover(() => {
        $('this').popover('show');
    });
    /* $('.editCommentButton').click( () => {
        alert('You clicked on me');
    }); */
 });