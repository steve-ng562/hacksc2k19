$(".submit").click(function(){
  console.log("Submitted");

var user = document.getElementById("user").value;
var pass = document.getElementById("pass").value;
console.log(user);

 $.ajax({
    url: 'http://34.212.86.167/client_login',
    type: 'POST',
    data: 
    {
    	"user": user,
    	"password": pass
    },
    dataType: 'json',
    success: function(response) {
			console.log(response);


			if(response.status != "Success")
				alert("Error: Account not found.");
			else
			{
				sessionStorage.setItem('user', user);
				window.location.replace('/dashboard.html');
			}
			
			
}

});

});