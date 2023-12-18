window.addEventListener("load", inicio);

function inicio(){
    ocultarFormularios();
    document.querySelector("#InicioSesión").style.display= "block"   
    document.querySelector("#btnIrAregistro").addEventListener("click", registroUsuario);
    document.querySelector("#registrarme").addEventListener("click", verificarRegistro);
    document.querySelector("#volverAlInicio").addEventListener("click", volverAlInicio);
    document.querySelector("#volver").addEventListener("click", volverAlInicio);
    document.querySelector("#menuSalirAdmin").addEventListener("click",volverAlInicio);
    document.querySelector("#menuSalir").addEventListener("click", volverAlInicio);
    document.querySelector("#ingresar").addEventListener("click",ingresar);
    document.querySelector("#listarUsuarios").addEventListener("click", listarUsuarios);
    document.querySelector("#menuAlquilarMaquina").addEventListener("click", mostrarAlquilerMaquina);
    document.querySelector("#alquilar").addEventListener("click", alquilerMaquina);// boton para hacer efectivo el alquiler
    document.querySelector("#tipoInstancia").addEventListener("click", elegirMaquinaParaStock);// click del select 
    document.querySelector("#menuMisGastos").addEventListener("click", irATablaGastos);
    document.querySelector("#menuStock").addEventListener("click", mostrarStock);
    document.querySelector("#selectStock").addEventListener("change", modificarStockSelect);
    document.querySelector("#incrementarStock").addEventListener("click", sumarStock);
    document.querySelector("#disminuirStock").addEventListener("click", restarStock);
    document.querySelector("#menuVerAlquiler").addEventListener("click", irATablaAlquiler);
    document.querySelector("#filtroApagadoEncendido").addEventListener("change", tablaAlquiler);//click del select
    document.querySelector("#informeMaquinas").addEventListener("click", irATablaGanancias);

    miSistema.precargarDatos();
}

//Ocultar formularios
function ocultarFormularios(){
    document.querySelector("#menuUsuario").style.display= "none";
    document.querySelector("#menuAdmin").style.display= "none";
    document.querySelector("#registroUsuario").style.display= "none";
    document.querySelector("#registroExitoso").style.display= "none";  
    document.querySelector("#InicioSesión").style.display= "none"; 
    document.querySelector("#selectInstancias").style.display= "none";
    document.querySelector("#maquinasAlquiladas").style.display= "none";
    document.querySelector("#costosAlquiler").style.display= "none";  
    document.querySelector("#tablaDeUsuarios").style.display= "none";  
    document.querySelector("#maquinasAlquiladas").style.display= "none";   
    document.querySelector("#stock").style.display= "none";  
    document.querySelector("#informeDeMaquinas").style.display= "none";  
}

//REGISTRO DE USUARIO
function registroUsuario(){
    ocultarFormularios();
    document.querySelector("#registroUsuario").style.display= "block";
}
function verificarRegistro(){
    let nombre= document.querySelector("#nombre").value;
    let apellido = document.querySelector("#apellido").value;
    let nombreUsuario = document.querySelector("#registroNombreUsuario").value;
    let contraseña = document.querySelector("#contraseña").value;
    let tarjeta = document.querySelector("#tarjetaCredito").value;
    let nombreApellidoValido= miSistema.verificarNombreyApellido(nombre, apellido);
    let nombreUsuarioValido = miSistema.verificarNombreUsuario(nombreUsuario);
    let nombreUsuarioRepetido = miSistema.verificarNombreUsuarioRepetido(nombreUsuario);
    let contraseñaValida = miSistema.verificarContraseñaValida(contraseña);
    let tarjetaValida = miSistema.algoritmoLuhn(tarjeta);
    let CVCtarjetaCredito =document.querySelector("#CVCtarjetaCredito").value;
    
    document.querySelector("#msjRegistroUsuario").innerHTML="";

    if(nombre=="" || apellido=="" || nombreUsuario=="" || contraseña=="" || tarjeta=="" || CVCtarjetaCredito==""){
        document.querySelector("#msjRegistroUsuario").innerHTML = "Todos los datos deben ser completados."
    } else {
        if (nombreApellidoValido == false) {
        document.querySelector("#msjRegistroUsuario").innerHTML += "<br><br> ERROR: nombre y/o apellido incorrecto<br><br>"
        }
        if (nombreUsuarioValido == false) {
            document.querySelector("#msjRegistroUsuario").innerHTML += "<br><br> El nombre de usuario debe contener al menos una letra y un número."
        }
        if (nombreUsuarioRepetido == true) {
            document.querySelector("#msjRegistroUsuario").innerHTML += "<br><br> Usuario ya utilizado, intente con otra opción."
        }
        if (contraseñaValida == false) {
            document.querySelector("#msjRegistroUsuario").innerHTML += "<br><br> Contraseña inválida."
        }
        if (tarjetaValida == false) {
            document.querySelector("#msjRegistroUsuario").innerHTML +="<br>Tarjeta de crédito incorrecta. Ingrese nuevamente"
        }
        if(isNaN(CVCtarjetaCredito) || (CVCtarjetaCredito.length)!=3){
            document.querySelector("#msjRegistroUsuario").innerHTML +="<br>El código CVC debe contener 3 números, los encuentra en el dorso de la tarjeta."
        }
    }
    if (nombreApellidoValido && nombreUsuarioValido && nombreUsuarioRepetido == false && contraseñaValida && tarjetaValida && !isNaN(CVCtarjetaCredito) && CVCtarjetaCredito.length==3) {
        miSistema.agregarUsuario(nombreUsuario, contraseña, nombre, apellido, tarjeta);
        ocultarFormularios();
        document.querySelector("#registroExitoso").style.display= "block";
    }
}
function ingresar(){
    let usuario= document.querySelector("#nombreUsuario").value;
    let contraseña=document.querySelector("#clave").value;
    let tipoUsuario = miSistema.revisarUsuarioContraseña(usuario,contraseña);
    if (tipoUsuario == "usuario"){ //si se pudo loguear y es ususario muestro menú del usuario
        ocultarFormularios(); 
        document.querySelector("#menuUsuario").style.display= "block";
        
    }
    if (tipoUsuario == "admin"){// si se pudo loguear y es administrador se muestra menú del administrador
        ocultarFormularios(); 
        document.querySelector("#menuAdmin").style.display= "block";
        
    }
    if(tipoUsuario == "incorrecto"){//no pudo loguearse
        document.querySelector("#mensajesLogin").innerHTML = "Usuario o contraseña incorrectos. Intente nuevamente.";
    } 
    if(tipoUsuario == "Usuario no habilitado"){//está pendiente o bloqueado
        document.querySelector("#mensajesLogin").innerHTML = "Usuario no habilitado.";
    }
    
}


function volverAlInicio(){
    ocultarFormularios();  
    document.querySelector("#nombreUsuario").value="";
    document.querySelector("#clave").value="";
    document.querySelector("#mensajesLogin").innerHTML ="";
    document.querySelector("#InicioSesión").style.display= "block"; 

}

//GESTIONAR ESTADO DE USUARIOS
function listarUsuarios(){
    ocultarFormularios();
    document.querySelector("#menuAdmin").style.display= "block";
    document.querySelector("#tablaDeUsuarios").style.display= "block";

    let lista = miSistema.obtenerUsuarioComun();   // la lista tiene objetos usuarios solamente
    let mensaje = "";
    if (lista.length>0){ // Tiene elementos
        let miTabla = document.querySelector("#tablaUsuarios");
        miTabla.innerHTML = "";
        tablaHTML = `<tr><th>Nombre de usuario</th><th>Estado</th><th>Acción</th></tr>`
        mensaje="";
        
        for (let pos=0;pos<lista.length;pos++){
            let objUsuario = lista[pos];
            tablaHTML+=`<tr><td>${objUsuario.nombreUsuario}</td>
            <td>${objUsuario.estado}</td>
            <td><input class="button" type="button" id="${objUsuario.nombreUsuario}" value="Cambiar"></td>
            </tr>`
        }
        miTabla.innerHTML+= tablaHTML;

        for (let pos=0;pos<lista.length;pos++){
            let objUsuario = lista[pos];
            document.querySelector("#"+ objUsuario.nombreUsuario).addEventListener("click", cambiarEstado)
        }
    }
    else {
        mensaje = "No hay datos para procesar (no hay usuarios de tipo Público).";
    }
    document.querySelector("#textoTablaUsuarios").innerHTML = mensaje;
}
function cambiarEstado(){
    let idUsuario= this.id
    miSistema.cambiarEstado(idUsuario);
    listarUsuarios();
}

// GESTION DE STOCK

let cant = 0; // Variable global para mantener el contador de stock

function mostrarStock() {
    ocultarFormularios();
    document.querySelector("#menuAdmin").style.display = "block";
    document.querySelector("#stock").style.display = "block";
}   
function elegirMaquinaParaStock(){
    modificarStock("selectStock");
    document.querySelector("#cantStock").value = "";
    document.querySelector("#cantStock").innerHTML= cant;
}
function modificarStockSelect(){
    modificarStock("selectStock")
    document.querySelector("#cantStock").value = cant;
}
function modificarStock(idSelect){
    let maquinaElegida = document.querySelector("#"+idSelect).value;
    let pos = 0;
    // Actualizar el valor de 'cant' según la máquina elegida
    switch (maquinaElegida) {
        case "c7s":
            cant = miSistema.listaInstancias[0].stock;
            pos=0;
            break;
        case "c7m":
            cant = miSistema.listaInstancias[1].stock;
            pos=1
            break;
        case "c7l":
            cant = miSistema.listaInstancias[2].stock;
            pos=2;
            break;
        case "r7s":
            cant = miSistema.listaInstancias[3].stock;
            pos=3;
            break;
        case "r7m":
            cant = miSistema.listaInstancias[4].stock;
            pos=4;
            break;
        case "r7l":
            cant = miSistema.listaInstancias[5].stock;
            pos=5;
            break;
        case "i7m":
            cant = miSistema.listaInstancias[6].stock;
            pos=6;
            break;
        case "i7l":
            cant = miSistema.listaInstancias[7].stock;
            pos=7;
            break;
    }
    // Mostrar el valor actual de 'cant' en el campo de entrada
    return pos;
}
function sumarStock() {
    let mensaje="Stock actualizado con éxito"
    let pos = modificarStock("selectStock");
    miSistema.listaInstancias[pos].stock++; // Incrementar la cantidad en miSistema.listaInstancias
    document.querySelector("#cantStock").value = miSistema.listaInstancias[pos].stock;
    document.querySelector("#msjStock").innerHTML= mensaje;

}
function restarStock() {
    let mensaje="";
    let pos = modificarStock("selectStock");
    if (miSistema.listaInstancias[pos].stock > miSistema.listaInstancias[pos].cantidadAlquiladas) {
        miSistema.listaInstancias[pos].stock--;
        mensaje= "Stock actualizado con éxito" // Decrementar la cantidad en miSistema.listaInstancias si es mayor que las maquinas de alquiler
        document.querySelector("#cantStock").value = miSistema.listaInstancias[pos].stock;
    }
    else{
        mensaje="No es posible realizar la modificación de Stock, no puede tener menos stock que máquinas en alquiler."
    }
    document.querySelector("#msjStock").innerHTML= mensaje;
}
// FIN GESTION DE STOCK

//ALQUILER DE MAQUINA 
function mostrarAlquilerMaquina(){
    ocultarFormularios();
    document.querySelector("#mensajeAlquiler").innerHTML="";
    document.querySelector("#menuUsuario").style.display= "block";
    document.querySelector("#selectInstancias").style.display= "block";
}
function alquilerMaquina() {
    let mensaje=""
    let pos= modificarStock("tipoInstancia");
    if (miSistema.listaInstancias[pos].stock - miSistema.listaInstancias[pos].cantidadAlquiladas >= 1) {
        miSistema.agregarAlquiler(miSistema.listaInstancias[pos]);
        mensaje= "Alquiler exitoso!"
    } else {
        mensaje="No fue posible realizar el alquiler."
    }
    document.querySelector("#mensajeAlquiler").innerHTML= mensaje;
}
function irATablaAlquiler(){
    ocultarFormularios();
    document.querySelector("#tablaInstanciasFiltro").innerHTML="";
    document.querySelector("#textoInstancias").innerHTML="";
    document.querySelector("#filtroApagadoEncendido").selectedIndex=0;
    document.querySelector("#menuUsuario").style.display= "block";
    document.querySelector("#maquinasAlquiladas").style.display= "block";
    
}
function tablaAlquiler(){
    let filtro= document.querySelector("#filtroApagadoEncendido").value;
    filtroTablaMaquinasAlquiladas(filtro)
}
function filtroTablaMaquinasAlquiladas(unFiltro) {
    let mensaje="";
    let lista= miSistema.generarListaFiltro(unFiltro, miSistema.usuarioLogueado)
    
    if (lista.length>0){
        document.querySelector("#tablaInstanciasFiltro").style.display= "block";
        let miTabla= document.querySelector("#tablaInstanciasFiltro");
        miTabla.innerHTML= "";
        let tablaHTML="";
        tablaHTML +=`<thead class="heading">
            <tr>
                <th>Instancia</th> <th>Estado</th> <th>Veces Iniciada</th> <th>Acción</th>
            </tr>
        </thead>`
        mensaje = "";
        for (let pos = 0; pos < lista.length; pos++) {
        let objAlquiler= lista[pos];
        tablaHTML+=`<tr> 
                <td>${objAlquiler.instancia.nombre}</td> <td>${objAlquiler.estado}</td> <td>${objAlquiler.contadorEncendido}</td>
                <td><input type="button" id="${objAlquiler.idAlquiler}" value="Cambiar"></td>`
        }
        miTabla.innerHTML+= tablaHTML;

        for (let pos=0;pos<lista.length;pos++){
            let objAlquiler = lista[pos];
            document.querySelector("#"+ objAlquiler.idAlquiler).addEventListener("click", cambiar);
        }


    } else {
        document.querySelector("#tablaInstanciasFiltro").style.display= "none";
        mensaje="No hay alquileres."
    }
    document.querySelector("#textoInstancias").innerHTML = mensaje;
}
function cambiar(){
    let idAlquiler = this.id;
    miSistema.cambiarEstadoMaquina(idAlquiler);
    tablaAlquiler();
}
// FIN ALQUILER

//GASTOS
function irATablaGastos(){
    ocultarFormularios();
    document.querySelector("#menuUsuario").style.display= "block";
    document.querySelector("#costosAlquiler").style.display= "block";
    document.querySelector("#textoCostos").innerHTML=""
    let tabla= miSistema.alquileresAgrupados()
    if (tabla==""){
    document.querySelector("#textoCostos").innerHTML = "No tienes alquileres aún." 
    }
    document.querySelector("#tablaCostos").innerHTML=tabla;
  
}

//GANANCIAS
function irATablaGanancias(){
    ocultarFormularios();
    document.querySelector("#menuAdmin").style.display = "block";
    document.querySelector("#informeDeMaquinas").style.display = "block";
    let tabla= miSistema.generarGanancias()
    let mensaje="";

    document.querySelector("#tablaInformeMaquinas").innerHTML=tabla;
    if(tabla == ""){
        mensaje = "No tienes alquileres aún.";
    }else{
        mensaje="El total de ingresos es: U$S " + miSistema.totalIngresos;
    }
    document.querySelector("#textoInformeMaquinas").innerHTML = mensaje;
}


//  Acceso al sistema
let miSistema = new Sistema ();