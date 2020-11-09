var imagen;

function signup() 
{
    var user = document.forms["datos"].elements[0].value;
    var pass = document.forms["datos"].elements[1].value;
    var passConfirm = document.forms["datos"].elements[2].value;

    if(pass == passConfirm)
    {
        console.log(imagen)
        var data = {id:user, pass:pass, image:imagen}
        const Http = new XMLHttpRequest();
        Http.open("POST",`http://:5000/addUser`, true);
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
    else
    {
        alert("LAS CONTRASEÑAS DEBEN SER IGUALES");
    }
    
}


function capture() 
{
    var video = document.getElementById('video');
    video.pause();

    var canvas = document.getElementById("canvas");

    var contexto = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    contexto.drawImage(video, 0, 0, 200, 200);

    var foto = canvas.toDataURL();
    imagen = foto;
    video.play();
}