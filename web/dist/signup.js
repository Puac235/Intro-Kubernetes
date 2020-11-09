var imagen;

function signup() 
{
    var user = document.forms["datos"].elements[0].value;
    var nombre = document.forms["datos"].elements[1].value;
    var pass = document.forms["datos"].elements[2].value;


    var data = {id:user,nombre:nombre,pass:pass}
    const Http = new XMLHttpRequest();
    Http.open("POST",`http://34.70.8.211:5000/addUser`, true);
    Http.setRequestHeader("Content-Type", "application/json");
    console.log(data);
    Http.send(JSON.stringify(data));
    Http.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200)
        {
            var data = JSON.parse(Http.responseText)
            console.log(data)
            if (data.status) {
                alert("USUARIO CREADO");
                window.location = "login.html";
            } else {
                alert("INTENTELO DE NUEVO");
            }
        }
    }
    
}
