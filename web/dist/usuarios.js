
var alumnos = [];


function ObtenerUsuarios() 
{
    document.getElementById('usuario').innerHTML = localStorage.getItem('user');
    alumnos = [];
    const Http = new XMLHttpRequest();
    Http.open("GET",`http://34.70.8.211:5000/getUsers`, true);
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send();
    Http.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200)
        {
            var data = JSON.parse(Http.responseText)
            if (data.status) {
                datos = data.data;
                console.log(datos);
                for(let dato of datos)
                {
                    alumnos.push(dato);
                }
                var alumnosDiv = document.getElementById("alumnosDiv");
                while (alumnosDiv.firstChild) {
                    alumnosDiv.removeChild(alumnosDiv.firstChild);
                }
                for(alumno of alumnos)
                {
                    var newDiv = document.createElement("div");
                    var att1 = document.createAttribute("class");
                    att1.value = "col-md-4";
                    newDiv.setAttributeNode(att1)
                    var newDiv2 = document.createElement("div"); 
                    var att2 = document.createAttribute("class");
                    att2.value = "titulo";
                    newDiv2.setAttributeNode(att2);
                    var newContent = document.createTextNode(alumno.nombre);
                    newDiv2.appendChild(newContent);
                    newDiv.appendChild(newDiv2);
                    
                    alumnosDiv.appendChild(newDiv);
                }
            } else {
                alert("INTENTELO DE NUEVO");
            }
        }
    } 
}