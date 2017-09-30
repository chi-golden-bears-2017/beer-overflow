$(document).ready(function() {
  $("#login-button").on('click', showForm);
  $("#login-form").on('submit', loginHandler);
  $("div#answer-list").on('submit', ".new-comment-form", newCommentHandler);
  $("#please").on('submit', "div.vote-buttons form", voteHandler);
  $("#please").on('submit', '#new-answer', answerHandler)
  $("div#answer-list").on('click', ".best", bestAnswer)
});

var answerHandler = function(event) {
  event.preventDefault();
  $this = $(this)

  var answer = $this.find("textarea[name=body]").val();
  var url = $this.attr("action");
  var data = $(this).serializeArray();
  var request = $.ajax({
    url: url,
    method: 'POST',
    data: data
  })

  if ($.trim(answer) === "") {
    event.preventDefault();
    alert("Cannot submit empty answer.")
    return false;
  }

  request.done(function(response) {
    $("#answer-list").append(response)
  })
    $("#new-answer").trigger("reset")
    $(".new-comment-form").trigger("reset")
};

var newCommentHandler = function(event) {
  event.preventDefault();
  $this = $(this)

  var comment = $this.find("textarea[name=body]").val();
  var url = $this.attr("action")
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
    $this.closest(".comment-list").find("ul").append("<li class='comment'>" + response.body + "<p>Comment by: " + response.username + "</p></li>")
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
    if (response === "error")  {
      response = "Invalid username or password."
      $(".logged-out").prepend(response );
    } else {
      $(".logged-out").hide();
      $(".logged-in li").first().text("Hello, " + response + "!")
      $(".logged-in").show();
    };
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
    console.log(form)
    console.log($ballot_box.closest('div.answer').find('p.vote-count'));
    var $voteCount = $ballot_box.closest('div.answer').find('p.vote-count')
    $voteCount.text(new_total)
  });
};

var bestAnswer = function(event) {
  var $this = $(this)
  console.log($this.attr('id'))

  var questionId = $("h2").attr("id")
  var url = '/questions/' + questionId
  var answerId = $this.attr('id')
  var data = {answer_id: answerId}

  var ajaxPromise = $.ajax({
    url: url,
    method: 'POST',
    data: data
  })

  ajaxPromise.done(function(response) {
    $(".best").show();
    $this.hide();
    console.log($(".best-answer"))
    $(".best-answer").remove();
    $this.closest("p").append("<p class='best-answer'>Best Answer Badge</p>");
  })
};

// (visible to all users)

