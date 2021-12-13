/**
 * Cargar la libreria de Jquery y ubicar el cursor en login
 */
 $(document).ready(function () {
    console.log("estas en la pagina de Inicio");
    init();
});
function init(){
    var miNombreUsuario = sessionStorage.getItem("nombreUsuario");
    $(".nombreUsuario").html(miNombreUsuario);
}

/**
 * Configura mensaje de bienvenida o de error según el caso
 */
 function estadoInicial(){
    $("#login").focus()
 }


/**
 * Autenticar al usuario en la aplicaciòn
 */
function loginUser(){
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    if(document.getElementById('loginEmail').value=="") {
        alert("El campo de correo es necesario para continuar");
        document.getElementById('loginEmail').style.background="#757575";
        document.getElementById('loginEmail').placeholder="Ingrese Correo... ";
        document.getElementById('loginEmail').focus();
        return false;
    }
    else if(document.getElementById('loginPassword').value==""){
        alert("El campo de contraseña es necesario para continuar");
        document.getElementById('loginPassword').style.background="#757575";
        document.getElementById('loginPassword').placeholder="Ingrese Contraseña... ";
        document.getElementById('loginPassword').focus();
        return false;
    }
    else if (email != "" && password != "") {
        $.ajax({
            url: "http://168.138.249.154:8080/api/user/" + email + "/" + password,
            type: "GET",
            contentType: 'application/json',
            datatype: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                if (respuesta.id == null) {
                    alert("no existe un usuario con estos datos: Correo:"+ email+ " Contraseña:" + password); 
                    document.getElementById("login").style.display='block';
                    document.getElementById("user").style.display='none';
                    document.getElementById("welcome").style.display='none';
                  
                }else{
                    alert("Bienvenido: "+ respuesta.name);
                    sessionStorage.setItem("nombreUsuario",respuesta.name);
                    document.getElementById("login").style.display='none';
                    document.getElementById("user").style.display='none';
                    document.getElementById("welcome").style.display='block';
                 
                }
                $('input').val("");
                $("#userName").focus();
            },
            error: function(result) {
                window.location.reload();
                alert("El Usuario no esta registrado");
                console.log(result);
            } 
        });
        return false;
    }
}
// fin validar

/**
 * Crear un usuario en la aplicaciòn
 */
function saveUser(){
    let userName = document.getElementById("userName").value;
    let email = document.getElementById("userEmail").value;
    let password = document.getElementById("userPassword").value;
    let passwordC = document.getElementById("userPasswordC").value;

    if (userName!= "" && email != "" && password != "" && passwordC != "") {
        $.ajax({
            type:'GET',
            contentType: "application/json",
            dataType: 'JSON',
            url:"http://168.138.249.154:8080/api/user/"+ email,
            success:function(responseJ) {
                if (responseJ == false) {
                    if (password == passwordC) {
                        $.ajax({
                            type:'POST',
                            contentType: "application/json; charset=utf-8",
                            dataType: 'JSON',
                            data: JSON.stringify({
                                "name": userName,
                                "email":email,
                                "password":password 
                            }
                            ),
                            url:"http://168.138.249.154:8080/api/user/new",
                            success:function(response) {
                                console.log(response);
                                console.log("El Usuario se Guardo Correctamente");
                                alert("El Usuario se Guardo Correctamente");
                                window.location.reload();
                                $("#userName").val("");
                                $("#userEmail").val("");
                                $("#userPassword").val("");
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                window.location.reload();
                                alert("El Usuario no se Guardo Correctamente");
                            }
                        });  
                    } 
                    else{
                        alert("claves no coinciden");
                        $("#passwordC").focus();
                    }    
                }else{
                    alert("El Correo ya existe en la DB");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload();
            }
        });
    }
    return false;
}

function registrarUsuario(){
    document.getElementById("inicioSesion").style.display='none';
    document.getElementById("addUsuario").style.display='block';
    document.getElementById("inicioBienv").style.display='none';
} 

function iniciarSesion(){
    document.getElementById("inicioSesion").style.display='block';
    document.getElementById("addUsuario").style.display='none';
    document.getElementById("inicioBienv").style.display='none';
}
