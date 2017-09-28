$(document).ready(function() {
  console.log('document.ready fired')
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
  console.log(this)
  var data = $(this).serialize()
  console.log($(this).serialize())
  var ajaxPromise = $.ajax({
    url: '/sessions',
    method: 'POST',
    data: data
  })

  ajaxPromise.done(function() {
    console.log("success");
    // hide form
    // hide login and sign up buttons
    // show username and logout buttons
  })

};
