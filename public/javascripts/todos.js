$(document).ready(function(){
  $("#postComment").click(function(){
      var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);
      var url = "comment";
      $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
            $("#done").html(textStatus);
        }
      })
  });
  $("#getComments").click(function() {
    $.getJSON('comment', function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li>" + com.Name + " says: " + com.Comment + "</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    })
  });
  $("#deleteComments").click(function() {
    var url = "delete";
    console.log("handler");
      $.ajax({
        url:url,
        type: "POST",
        success: function(data,textStatus) {
            $("#done").html(textStatus);
        }
      })
  });
  $("#getUserComments").click(function(){
      var myobj = {Name:$("#searchname").val()};
      console.log(myobj);
      jobj = JSON.stringify(myobj);
      console.log(jobj);
      $("#json").text(jobj);
      var url = "user";
      $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
          $("#done").html(textStatus);
          console.log(data);
          var everything = "<ul>";
          for(var comment in data) {
            com = data[comment];
            everything += "<li>" + com.Name + " says: " + com.Comment + "</li>";
          }
          everything += "</ul>";
          $("#comments").html(everything);
        }
      })
  });
});