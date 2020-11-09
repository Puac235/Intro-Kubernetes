
function login() 
{
    var user = document.forms["datos"].elements[0].value;
    var pass = document.forms["datos"].elements[1].value;

    var data = {user:user, pass:pass}
    const Http = new XMLHttpRequest();
    Http.open("POST",`http://34.70.8.211:5000/login`, true);
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(data));
    Http.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200)
        {
            var data = JSON.parse(Http.responseText)
            console.log(data)
            if (data.status) {
                datos = data.data;
                alert("Bienvenido!");
                localStorage.setItem("user", user);
                window.location = "admin.html";
                
            } else {
                alert("USUARIO NO ENCONTRADO");
            }
        }
    }
}

function registro()
{
    window.location = "signup.html";
}