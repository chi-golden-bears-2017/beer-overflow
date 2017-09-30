$(document).ready(function() {
  $("#login-button").on('click', showForm);
  $("#login-form").on('submit', loginHandler);
  $(".new-comment-form").on('submit', newCommentHandler);
  $("#please").on('submit', "div.vote-buttons form", voteHandler);
  $("#please").on('submit', '#new-answer', answerHandler)
  $(".best").on('click', bestAnswer)
});

var answerHandler = function(event) {
  event.preventDefault();
  $this = $(this)

  var answer = $this.find("textarea[name=body]").val();
  var url = $this.attr("action");

  var data = $(this).serializeArray();
  // var val1 = data[0].value
  // var val2 = data[1].value

  // data = val1 + " " + val2

  var request = $.ajax({
    url: url,
    method: 'POST',
    data: data
  })
  console.log("this is data console log")
  console.log(data)




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

