$(document).ready(function() {
  $("#login-button").on('click', showForm);
  $("#login-form").on('submit', loginHandler);
});

var showForm = function(event) {
  event.preventDefault();
  $("#login-form").show();
  // return false
};

var loginHandler = function(event) {
  event.preventDefault();
  var $this = $(this)
  var data = $this.serialize()
  var ajaxPromise = $.ajax({
    url: '/sessions',
    method: 'POST',
    data: data
  })

  ajaxPromise.done(function() {
    console.log("success");
    $this.hide();
    $(".logged-out").hide();
    $(".logged-in li").first().text(data.username).show();
    $(".logged-in").show();
  })

};
