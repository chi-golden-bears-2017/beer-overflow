$(document).ready(function() {
  $("#login-button").on('click', showForm);
  $("#login-form").on('submit', loginHandler);
  $("div.vote-buttons button").on('click', voteHandler);

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
  var button = $(this)
  var $ballot_box = button.closest("div")
  var url;
  var questionId;
  var answerId;
  if ($ballot_box.attr('id') === 'question'){
    questionId = $('h2').attr('id')
    url = '/questions/' + questionId + '/votes'
  } else {
    answerId = $ballot_box.attr('id')
    url = '/answers/' + answerId + '/votes'
  }
  console.log(url)
  var data;
  if (button.attr('class') === "up-vote"){
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
    var new_total = "Total votes: " + response
    console.log(new_total)
    $ballot_box.find("p").text(new_total)
  })
};
