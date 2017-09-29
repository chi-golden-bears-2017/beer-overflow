$(document).ready(function() {
  $("#login-button").on('click', showForm);
  $("#login-form").on('submit', loginHandler);
  $(".new-comment-form").on('submit', newCommentHandler);
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
    console.log("success");
    console.log(response)
    $this.hide();
    $(".logged-out").hide();
    $(".logged-in li").first().text("Hello, " + response + "!")
    $(".logged-in").show();
  })

};

