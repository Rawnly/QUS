$(document).ready(function() {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

    $("#myTable").css('display', 'none');
    $("#add").css('display', 'none');
    $("#checks").css('display', 'none');
    $("footer").css('position', 'absolute');

    $('#user').keypress(function (e) {
      var key = e.which;
      if(key == 13)  // the enter key code
       {
         mobileConnect(); //Mobile
       }
    });

  } else {
    $("#mobile_info").css('display', 'none');

    $("#user").keyup(function() {
      deskConnect(); //Desktop
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
         .append($('<td>' + '<a href="' + email + '">'+ email +'<a>' + '</td>'))
         .append($('<td>' + '<a href="' + blog + '">'+ blog +'<a>' + '</td>'))
         .append($('<td>' + '<a href="' + 'https://www.google.it/maps/place/' + loc + '">'+ loc +'<a>' + '</td>'))
         .append($('<td>' + '<a href="' + repos_url + '">'+ repos +'<a>' + '</td>'));

      $("#myTable tbody").append(row);
   });
  }
});


function deskConnect() {
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
    //console.log(datas.login);

     pp = datas.avatar_url;
     name = datas.name;
     email = datas.email;
     blog = datas.blog;
     repos = datas.public_repos;
     loc = datas.location;
     repos_url = datas.html_url;

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

function mobileConnect() {
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

     pp = datas.avatar_url;
     name = datas.name;
     email = datas.email;
     blog = datas.blog;
     repos = datas.public_repos;
     loc = datas.location;
     repos_url = datas.html_url;

     $("#img_mobile").attr('src', pp);
     $("#m_name").html(name);
     $("#m_email").html( '<a href="mailto: ' + email + ' "> ' + email + ' </a> ');
     $("#m_blog").html( '<a href=" ' + blog + ' "> ' + blog + ' </a> ');
     $("#m_location").html(' <a href=" ' + 'https://www.google.it/maps/place/' + loc + ' "> ' + loc + ' </a> ');
     $("#m_repos").html( '<a href=" ' + repos_url + ' "> ' + repos + ' </a> ');
   },
   type: 'GET' //'GET' OR 'POST'
  });
}
