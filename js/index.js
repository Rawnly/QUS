$(document).ready(function() {
  $("#user").keyup(function() {
    connect();
  });
  checkBoxStatus = 1;
  $("#photo_url").click(function () {
    window.open(pp);
  });
  $("#checkbox1").click(function() {
    if ( $(this).prop('checked') ) {
      checkBoxStatus = 1;
      return checkBoxStatus;
    } else {
      checkBoxStatus = 0;
      return checkBoxStatus;
    }
  });
  $("#add").click(function () {
    var row = $("<tr>");
    if (checkBoxStatus == 1) {
      row.append($("<td>" + '<img id="photo_url" src="' + pp + '" class="y_photo"/>' + "</td>"));
    } else {
      row.append($("<td>" + '' + "</td>"));
    }
    row.append($("<td>" + name + "</td>"))
       .append($('<td>' + '<a href="mailto:' + email + '">'+ email +'<a>' + '</td>'))
       .append($('<td>' + '<a href="' + blog + '">'+ blog +'<a>' + '</td>'))
       .append($('<td>' + '<a href="' + 'https://www.google.it/maps/place/' + loc + '">'+ loc +'<a>' + '</td>'))
       .append($("<td>" + repos + "</td>"));

    $("#myTable tbody").append(row);
 });
});


function connect() {
  var client_id = '9f45883b8cf779f4c8ec';
  var client_secret = 'd94a6f256dc080765f6ceda57cebfb641864f1f1';

  var user = $('#user').val(); //get the input value
  var user_url = 'https://api.github.com/users/' + user + '?client_id=' + client_id + '&client_secret=' + client_secret; // set the url

  $.ajax({
   url: user_url,
   data: {
      format: 'json'
   },
   error: function() {
     confirm('An error is occurred! :s ');
   },
   dataType: 'jsonp',
   success: function(data) {
     var datas = data.data;
     console.log(datas.login);

     pp = datas.avatar_url;
     name = datas.name;
     email = datas.email;
     blog = datas.blog;
     repos = datas.public_repos;
     loc = datas.location;

     if ( datas.login !== undefined ) {
       $("#photo_url").attr("src", pp);
       $("#name").html(name);
       $("#email").html(email);
       $("#blog").html(blog);
       $("#location").html(loc);
       $("#repos").html(repos);
     } else if ($("#user").val() === '' || $("#user").val() === ' ') {
       $("#photo_url").attr("src", null);
       $("#name").html(" ");
       $("#email").html(" ");
       $("#blog").html(" ");
       $("#location").html(" ");
       $("#repos").html(" ");
     } else {
       $("#photo_url").attr("src", null);
       $("#name").html("This user not exist");
       $("#email").html(" ");
       $("#blog").html(" ");
       $("#location").html(" ");
       $("#repos").html(" ");
     }
   },
   type: 'GET' //'GET' OR 'POST'
  });
}
