$(document).ready(function(){
  $("#postTask").click(function(){
      var myobj = {Task:$("#task").val(),Date:$("#duedate").val(), Complete:false};
      $("#goTaskForm")[0].reset();
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);
      var url = "task";
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
  $("#getTasks").click(function() {
    $.getJSON('task', function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var task in data) {
        task = data[task];
        everything += "<li>" + task.Task + " due on: " + task.Date + "</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    })
  });
//   $("#postComment").click(function(){
//       var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
//       jobj = JSON.stringify(myobj);
//       $("#json").text(jobj);
//       var url = "comment";
//       $.ajax({
//         url:url,
//         type: "POST",
//         data: jobj,
//         contentType: "application/json; charset=utf-8",
//         success: function(data,textStatus) {
//             $("#done").html(textStatus);
//         }
//       })
//   });
//   $("#getComments").click(function() {
//     $.getJSON('comment', function(data) {
//       console.log(data);
//       var everything = "<ul>";
//       for(var comment in data) {
//         com = data[comment];
//         everything += "<li>" + com.Name + " says: " + com.Comment + "</li>";
//       }
//       everything += "</ul>";
//       $("#comments").html(everything);
//     })
//   });
//   $("#deleteComments").click(function() {
//     var url = "delete";
//     console.log("handler");
//       $.ajax({
//         url:url,
//         type: "POST",
//         success: function(data,textStatus) {
//             $("#done").html(textStatus);
//         }
//       })
//   });
//   $("#getUserComments").click(function(){
//       var myobj = {Name:$("#searchname").val()};
//       console.log(myobj);
//       jobj = JSON.stringify(myobj);
//       console.log(jobj);
//       $("#json").text(jobj);
//       var url = "user";
//       $.ajax({
//         url:url,
//         type: "POST",
//         data: jobj,
//         contentType: "application/json; charset=utf-8",
//         success: function(data,textStatus) {
//           $("#done").html(textStatus);
//           console.log(data);
//           var everything = "<ul>";
//           for(var comment in data) {
//             com = data[comment];
//             everything += "<li>" + com.Name + " says: " + com.Comment + "</li>";
//           }
//           everything += "</ul>";
//           $("#comments").html(everything);
//         }
//       })
//   });
});