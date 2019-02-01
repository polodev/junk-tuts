~~~js
// for widget accordion

$('.rt-accordion').each(function () {
  var id = $(this).data('id');
  accordion = $('#'+id);
  accordion.on('show.bs.collapse', function (e) {
    $(e.target).prev('.panel-heading').addClass('active');
  }).on('hide.bs.collapse', function (e) {
      $(e.target).prev('.panel-heading').removeClass('active');
  });
})

~~~
