$(document).ready(function() {
  $("#login-button").on('click', showForm);
  $("#login-form").on('submit', loginHandler);

  $(".new-comment-form").on('submit', newCommentHandler);

  $("div.vote-buttons form").on('submit', voteHandler);
});

var newCommentHandler = function(event) {
  event.preventDefault();
// this is the form
  $this = $(this)

  var comment = $this.find("textarea[name=body]").val();
  var url = $this.attr("action")
  console.log(url)
  var data = $(this).serialize();
  var request = $.ajax({
    url: url,
    method: 'POST',
    data: data
  })

  if ($.trim(comment) === "") {
    event.preventDefault();
    alert("Cannot submit empty comment.")
    return false;
  }
  request.done(function(response) {
    console.log(response)

    // answer comments
    $this.closest(".comment-list").find("ul").append("<li class='comment'>" + response + "</li>")

  })

  $(".new-comment-form").trigger("reset")

};

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
  event.preventDefault();
  var form = $(this)
  var $ballot_box = form.closest("div")
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
  var data;
  if (form.attr('class') === "up-vote"){
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

