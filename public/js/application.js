$(document).ready(function() {
  $("#login-button").on('click', showForm);
  $("#login-form").on('submit', loginHandler);
  $("#vote-buttons button").on('click', voteHandler);

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

  ajaxPromise.done(function(response) {
    $this.hide();
    $(".logged-out").hide();
    $(".logged-in li").first().text("Hello, " + response + "!")
    $(".logged-in").show();
  })
};

var voteHandler = function(event) {
  // event.preventDefault();
  var button = $(this)
  console.log(button)
  var questionId = $('h2').attr('id')
  var url = '/questions/' + questionId + '/votes'
  var data;
  if (button.attr('id') === "up-vote"){
    data = {value: 1}
  } else {
    data = {value: -1}
  }

  var ajaxPromise = $.ajax({
    url: url,
    method: 'POST',
    data: data
  })

  ajaxPromise.done(function(response) {
    // $this.hide();
    // $(".logged-out").hide();
    // $(".logged-in li").first().text("Hello, " + response + "!")
    // $(".logged-in").show();
  })
};
