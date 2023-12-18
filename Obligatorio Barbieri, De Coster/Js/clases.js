class Sistema {
    constructor(){
        this.listaUsuarios = new Array();
        this.listaAlquiler = new Array();
        this.usuarioLogueado= null; //va a guardar un objeto no asignado aún.
        this.listaInstancias= new Array();
        this.ultimoIdUsuario=0;
        this.ultimoAlquiler=0;
        this.totalIngresos=0;
    }

    precargarDatos(){
        // Precargo usuarios
        this.agregarUsuario("Admin1", "Admin1", "Fernando", "Perez", "1234-1234-1234-1234");//admin
        this.listaUsuarios[0].estado="activo"
        this.listaUsuarios[0].tipo="admin"

        this.agregarUsuario("Admin2", "Admin2", "Lorena", "Martinez", "1234-1234-1234-1234");//admin
        this.listaUsuarios[1].estado="activo";
        this.listaUsuarios[1].tipo="admin";

        this.agregarUsuario("Admin3", "Admin3", "Facundo", "Ibañez", "1234-1234-1234-1234"); //admin
        this.listaUsuarios[2].estado="activo";
        this.listaUsuarios[2].tipo="admin";

        this.agregarUsuario("Admin4", "Admin4", "Lucía", "Romero", "1234-1234-1234-1234");//admin
        this.listaUsuarios[3].estado="activo";
        this.listaUsuarios[3].tipo="admin";

        this.agregarUsuario("Admin5", "Admin5", "Julio", "Canzani", "1234-1234-1234-1234");//admin
        this.listaUsuarios[4].estado="activo";
        this.listaUsuarios[4].tipo="admin";

        this.agregarUsuario("usu1","Usu1111","María","Gonzalez", "1234-1234-1234-1234"); //ususario común
        this.listaUsuarios[5].estado="activo";
    
        this.agregarUsuario("usu2","Usu2222","Mario", "Castro", "1234-1234-1234-1234"); //ususario común
        this.listaUsuarios[6].estado="activo";

        this.agregarUsuario("usu3","Usu3333","Pedro", "Alvarez", "1234-1234-1234-1234");//ususario común
        this.listaUsuarios[7].estado="activo";

        this.agregarUsuario("usu4","Usu4444","Paula", "Perez", "1234-1234-1234-1234");//ususario común
        this.listaUsuarios[8].estado="bloqueado";


        this.agregarUsuario("usu5","Usu5555","Florencia", "Castillos", "1234-1234-1234-1234");//ususario común
        this.listaUsuarios[9].estado="pendiente"
        
        //precarga de instancias
        this.agregarInstancia("c7.small", "0", "20", "2.50");
        this.agregarInstancia("c7.medium", "9", "30", "3.50");
        this.agregarInstancia("c7.large", "10", "50", "6");
        this.agregarInstancia("r7.small", "10", "35", "4");
        this.agregarInstancia("r7.medium", "18", "50", "6.50");
        this.agregarInstancia("r7.large", "9", "60", "7");
        this.agregarInstancia("i7.medium", "15", "30", "3.50");
        this.agregarInstancia("i7.large", "16", "50", "6.50");  
       
        //precarga de alquileres
        this.agregarAlquiler( this.listaInstancias[2]);
        this.listaAlquiler[0].usuario= this.listaUsuarios[5];

        this.agregarAlquiler( this.listaInstancias[2]);
        this.listaAlquiler[1].usuario= this.listaUsuarios[5];

        this.agregarAlquiler( this.listaInstancias[1]);
        this.listaAlquiler[2].usuario= this.listaUsuarios[5];

        this.agregarAlquiler( this.listaInstancias[1]);
        this.listaAlquiler[3].usuario= this.listaUsuarios[7];

        this.agregarAlquiler( this.listaInstancias[3]);
        this.listaAlquiler[4].usuario= this.listaUsuarios[7];

        this.agregarAlquiler( this.listaInstancias[4]);
        this.listaAlquiler[5].usuario= this.listaUsuarios[7];

        this.agregarAlquiler( this.listaInstancias[4]);
        this.listaAlquiler[6].usuario= this.listaUsuarios[9];

        this.agregarAlquiler( this.listaInstancias[7]);
        this.listaAlquiler[7].usuario= this.listaUsuarios[9];

        this.agregarAlquiler( this.listaInstancias[7]);
        this.listaAlquiler[8].usuario= this.listaUsuarios[9];

        this.agregarAlquiler( this.listaInstancias[6]);
        this.listaAlquiler[9].usuario= this.listaUsuarios[9];

        
    }
   
   // PUSHS
    agregarUsuario(unNombreUsuario, unaContraseña, unNombre, unApellido, unaTarjeta, unTipo, unEstado){
        let esta = this.verificarNombreUsuarioRepetido(unNombreUsuario);
        if (!esta){
            let objUsuario = new Usuario(unNombreUsuario, unaContraseña, unNombre, unApellido, unaTarjeta, unTipo, unEstado);
            this.listaUsuarios.push(objUsuario);
        
        }
        return !esta;
    }
    agregarInstancia(unNombre, stock, unPrecioAlquiler, unPrecioEncendido){
        let objInstancia = new TipoInstancia(unNombre, stock, unPrecioAlquiler, unPrecioEncendido);
        this.listaInstancias.push(objInstancia);
    }
    agregarAlquiler(unObjInstancia){
        let objAlquiler = new Alquiler(unObjInstancia, this.usuarioLogueado, this.ultimoAlquiler);
        this.listaAlquiler.push(objAlquiler);
        this.ultimoAlquiler++;
        this.sumarCantidadAlquiladas(unObjInstancia);

    }
    sumarCantidadAlquiladas(objInstancia){
        for (let pos=0; pos< this.listaInstancias.length; pos++){
            if (this.listaInstancias[pos].nombre == objInstancia.nombre){
                this.listaInstancias[pos].cantidadAlquiladas ++;
            }
        }
    }
    restarCantidadAlquiladas(objInstancia){
        for (let pos=0; pos< this.listaInstancias.length; pos++){
            if (this.listaInstancias[pos].nombre == objInstancia.nombre){
                this.listaInstancias[pos].cantidadAlquiladas --;
            }
        }
    }

    // VERIFICACIONES DEL REGISTRO

    verificarNombreyApellido (unNombre, unApellido){
        let nombreApellidoValido= true;
        
        for (let pos=0; pos<unNombre.length ; pos++ ){
            let letra = unNombre.charAt(pos);
            if(letra.charCodeAt(0)!= 32 && letra.charCodeAt(0)<65 && letra.charCodeAt(0)>90 && letra.charCodeAt(0)<97 && letra.charCodeAt(0)>122){
            nombreApellidoValido=false;
            }
        }
        for (let pos=0; pos<unApellido.length ; pos++ ){
            let letra = unApellido.charAt(pos);
            if(letra.charCodeAt(0)!= 32 && letra.charCodeAt(0)<65 && letra.charCodeAt(0)>90 && letra.charCodeAt(0)<97 && letra.charCodeAt(0)>122){
                nombreApellidoValido=false;
            }
        }
        return nombreApellidoValido
    }
    
    verificarNombreUsuario (unUsuario){
        let nombreUsuarioValido=true;
        let contadorNumero=0;
        let contadorLetra=0;
        for (let pos=0; pos<unUsuario.length ; pos++ ){
            let caracter = unUsuario.charAt(pos);
            if(!isNaN (caracter)){ //es un número
                contadorNumero++;
            } 
            if (caracter.charCodeAt(0)>=65 && caracter.charCodeAt(0)<=90 || caracter.charCodeAt(0)>=97 && caracter.charCodeAt(0)<=122){
                 contadorLetra++;
            }
        }        
        if(contadorLetra==0 || contadorNumero==0){
            nombreUsuarioValido=false;
        }    
             
        return nombreUsuarioValido;
    }

    verificarContraseñaValida(unaContraseña){
        let contraseñaValida=false;
        let contadorMin = 0;
        let contadorMay = 0;
        let contadorNumero = 0;
        let espacios=0;
            for(let pos=0; pos< unaContraseña.length; pos++){
                let letra=unaContraseña.charAt(pos)
                if(letra== " "){
                espacios++;  
                }
                if(letra.charCodeAt(0)>=65 && letra.charCodeAt(0)<=90){
                    contadorMay++;
                }
                if(letra.charCodeAt(0)>=97 && letra.charCodeAt(0)<=122){
                    contadorMin++;
                }
                if(letra.charCodeAt(0)>=48 && letra.charCodeAt(0)<=57){
                    contadorNumero++;
                }
            }    
            if(contadorMay>0 && contadorMin>0 && contadorNumero>0 && espacios==0){
                contraseñaValida=true;
            }
        return contraseñaValida;
    }
       
    //VERIFICACIÓN DE TARJETA
    algoritmoLuhn(pNumero) {
    /*Se estara iterando numero a numero, desde el final del string hasta el primer caracter, se estarán
        sumando y sustituyendo por duplicado cuando sea par, ya que sería el segundo nro. */
    let suma = 0;
    let digitoVerificadorX = Number(pNumero.charAt(pNumero.length - 1));
    let contador = 0; //para saber cuando estamos en los segundos, lo pares.
    let haynro = true;
    let i = pNumero.length - 2; //el penúltimo.
    
    
    //Mientras que esté parado en una posición valida
    while (i >= 0 && haynro) {
        //Obtener el numero
        let caracter = pNumero.charAt(i);
        //Valida que el número sea válido
        if (!isNaN(caracter)) {
        let num = Number(caracter);
        //Duplicando cada segundo dígito
        if (contador % 2 == 0) {
            num = this.duplicarPar(num); //porque si es mayor a 9 se deben sumar.
        }
        suma += num;
        } else {
        haynro = false;
        }
        i--;
        contador++;
    }
    let digitoVerificadorValido = this.checkDigito(suma, digitoVerificadorX);
    let modulodelasumaValiado = this.checkModulo(suma, digitoVerificadorX);
    return digitoVerificadorValido && modulodelasumaValiado;
      
    }
    
    duplicarPar(pNum) {
    pNum = pNum * 2;
    if (pNum > 9) {
        /*Si el resultado del multiplicación es mayor a 9 entonces lo descomponemos y sumamos. 
        Como el numero sera x>=10 && x<=19
        Entonces es 1+(num % 10) 1 más el resto de dividir entre 10.*/
        pNum = 1 + (pNum % 10);
    }
    return pNum;
    }
    
    checkDigito(pSuma, pDigito) {
    /* 1. Calcular la suma de los dígitos (67).
    2. Multiplicar por 9 (603).
    3. Tomar el último dígito (3).
    4. El resultado es el dígito de chequeo.*/
    let total = 9 * pSuma;
    let ultimoNro = total % 10
    return ultimoNro === pDigito;
    }
    
    checkModulo(pSuma, pDigito) {
    /*
    Si el total del módulo 10 es igual a O (si el total termina en cero), entonces el número es válido 
    de acuerdo con la fórmula Luhn, de lo contrario no es válido.
    */
    let total = pSuma + pDigito;
    let validacionFinal = false;
    if (total % 10 === 0 && total !== 0) {
        validacionFinal = true;
    }
    return validacionFinal;
    }
    //FIN VERIFICACIÓN TARJETA
    
    verificarNombreUsuarioRepetido(unNombreUsuario){
        let existe = false;
        for (let pos=0;pos<this.listaUsuarios.length && !existe; pos++){
            let objUsuario = this.listaUsuarios[pos]
            if (objUsuario.nombreUsuario==unNombreUsuario){
                existe = true;
            }
        }
        return existe;
    }
    
    //LOGIN
    revisarUsuarioContraseña (unNombreUsuario, unaContraseña){
        let res = "incorrecto";
        let seguir = true;
         for (let pos = 0; pos < this.listaUsuarios.length && seguir; pos++) {
             let unUsuario = this.listaUsuarios[pos];
             if(unUsuario.nombreUsuario.toUpperCase()== unNombreUsuario.toUpperCase() && unUsuario.contraseña== unaContraseña ){
                if(unUsuario.estado=="activo"){
                 res= unUsuario.tipo;
                 this.usuarioLogueado= unUsuario;
                } else{
                     res= "Usuario no habilitado"
                }
                 seguir = false;   
             }
         }
         return res;
    }
    // TABLA DE USUARIOS Y ESTADOS
    obtenerUsuarioComun(){
        let resultado= new Array();
        for (let pos=0; pos<this.listaUsuarios.length; pos++){
            let objUsuario= this.listaUsuarios[pos];
            if(objUsuario.tipo=="usuario"){
                resultado.push(objUsuario);
            }
        }
        return resultado;
    }
    cambiarEstado(idUsuario){ 
        for (let pos=0; pos<this.listaUsuarios.length; pos++){
            let objUsuario= this.listaUsuarios[pos];
            if(objUsuario.nombreUsuario== idUsuario){
                if (objUsuario.estado=="activo"){
                    objUsuario.estado= "bloqueado";
                    this.eliminarAlquileres(objUsuario);
                    

                } else { 
                    if(objUsuario.estado== "pendiente"){
                        objUsuario.estado="activo";

                    } else {
                        if(objUsuario.estado== "bloqueado"){
                            objUsuario.estado="activo";
                            
                        }
                    }
                }
               
            }
        }
        
    }

    eliminarAlquileres(unUsuario){

        for (let n = this.listaAlquiler.length - 1; n >= 0; n--){
            if(this.listaAlquiler[n].usuario.nombreUsuario== unUsuario.nombreUsuario){
                this.listaAlquiler.splice(n,1); // elimino el alquiler del usuario que acabo de bloquear
                this.restarCantidadAlquiladas(this.listaAlquiler[n].instancia);
            }
        }
    } 
    
    // FIN TABLA DE USUARIOS Y ESTADOS 

    // TABLA DE MAQUINAS ALQUILADAS Y ESTADOS
    
    generarListaFiltro(unFiltro, unUsuario){
        if (unFiltro== "T") { // genera lista de todos los alquileres
            let listaAlquilerTodos = new Array();
            for (let pos=0;pos<this.listaAlquiler.length;pos++){
                let objAlquiler = this.listaAlquiler[pos];
                if (objAlquiler.usuario==unUsuario){
                    listaAlquilerTodos.push(objAlquiler);
                }
            } 
            return listaAlquilerTodos;
        }
        if(unFiltro== "A"){ // genera lista unicamente con las instancias apagadas
            let listaAlquilerApagado= new Array();
            for (let pos=0;pos<this.listaAlquiler.length;pos++){
                let objAlquiler = this.listaAlquiler[pos];
                if (objAlquiler.usuario==unUsuario &&  objAlquiler.estado== "apagado"){
                    listaAlquilerApagado.push(objAlquiler);
                }
            }  
            return listaAlquilerApagado;     
        }
        if(unFiltro== "E"){ // genera lista unicamente con las instancias encendidas
            let listaAlquilerEncendido = new Array();
            for (let pos=0;pos<this.listaAlquiler.length;pos++){
                let objAlquiler = this.listaAlquiler[pos];
                if (objAlquiler.usuario==unUsuario &&  objAlquiler.estado== "encendido"){
                    listaAlquilerEncendido.push(objAlquiler);
                }
            }
            return listaAlquilerEncendido;
        }     
    }
    cambiarEstadoMaquina(idAlquiler){
        for (let pos=0; pos<this.listaAlquiler.length; pos++){
            let objAlquiler= this.listaAlquiler[pos];
            if(objAlquiler.idAlquiler== idAlquiler){
                if (objAlquiler.estado=="encendido"){
                    objAlquiler.estado= "apagado";
                    
                } else {
                        objAlquiler.estado="encendido";
                        objAlquiler.contadorEncendido++;  
                    } 
            }
        }
    
    }
   
    // FIN TABLAS DE MAQUINAS ALQUILADAS Y ESTADOS
    
    // INFO TABLA GASTOS
    alquileresAgrupados(){
        let tablaHTML="";
        let lista= this.generarListaFiltro("T", this.usuarioLogueado);
        if(lista.length>0){
            tablaHTML = `<thead class="heading"><tr><th>Tipo de instancia</th><th>Costo por encendido</th><th>Veces encendidas</th><th>Gasto total</th></tr></thead>`
            for (let i = 0; i <this.listaInstancias.length; i++) {
                let objInstancia= this.listaInstancias[i]
                let contadorTotalEncendidos = 0;
                let contadorTotalAlquileres = 0;
                for (let pos = 0; pos < lista.length; pos++) {
                    let objAlquiler= lista[pos];
                    if (objAlquiler.instancia==objInstancia) {
                    contadorTotalEncendidos+= objAlquiler.contadorEncendido;
                    contadorTotalAlquileres++; 
                    }
                }
                if (contadorTotalAlquileres > 0) {
                    tablaHTML+=`<tr><td>${objInstancia.nombre}</td>
                    <td>U$S ${objInstancia.encendido}</td>
                    <td> ${contadorTotalEncendidos}</td>
                    <td>U$S ${(contadorTotalEncendidos * objInstancia.encendido) + (objInstancia.alquiler*contadorTotalAlquileres)}<td> 
                    </tr>`
                }
            }   
        }
        return tablaHTML;
    }
    
    //INFORME DE MAQUINAS
    
    generarGanancias(){
        let tablaHTML="";
        this.totalIngresos=0;
        if(this.listaAlquiler.length>0){ // Si existen alquileres
            tablaHTML = `<thead class="heading"><tr><th>Tipo de instancia</th><th>Cantidad en Alquiler</th><th>Ingreso Total Actual</th></tr></thead>`
            for (let i = 0; i <this.listaInstancias.length; i++) {
                let objInstancia= this.listaInstancias[i]
                let contadorTotalEncendidos = 0;
                
                for (let pos = 0; pos < this.listaAlquiler.length; pos++) {
                    let objAlquiler= this.listaAlquiler[pos];
                    if (objAlquiler.instancia==objInstancia) {
                    contadorTotalEncendidos+= objAlquiler.contadorEncendido;
                    }
                }
                if (objInstancia.cantidadAlquiladas > 0) {
                    tablaHTML+=`<tr><td>${objInstancia.nombre}</td>
                    <td>${objInstancia.cantidadAlquiladas} </td>
                    <td>U$S ${(contadorTotalEncendidos * objInstancia.encendido) + (objInstancia.alquiler*objInstancia.cantidadAlquiladas)}<td></tr>`
                    this.totalIngresos+=(contadorTotalEncendidos * objInstancia.encendido) + (objInstancia.alquiler*objInstancia.cantidadAlquiladas);
                }
            }   
        }
        return tablaHTML;

    }
}    

class Usuario{
    constructor(unNombreUsuario, unaContraseña, unNombre, unApellido, unaTarjeta){
        this.nombre = unNombre;
        this.apellido = unApellido;
        this.nombreUsuario= unNombreUsuario;
        this.contraseña = unaContraseña;
        this.tarjetaDeCredito = unaTarjeta;
        this.tipo = "usuario";
        this.estado= "pendiente";
        this.id= "USUARIO_ID_" + miSistema.ultimoIdUsuario;
        miSistema.ultimoIdUsuario++;
    }
}

class Alquiler{
    constructor(unObjInstancia, unObjUsuario, unIdAlquiler){
        this.instancia = unObjInstancia;
        this.usuario = unObjUsuario;
        this.estado = "encendido";
        this.contadorEncendido = 0;
        this.idAlquiler = "INSTANCE_ID_" + unIdAlquiler;
    }
}

class TipoInstancia {
    constructor(unNombre, unaCantidad, unPrecioAlquiler, unPrecioEncendido){
        this.nombre= unNombre;
        this.stock= unaCantidad;
        this.cantidadAlquiladas = 0;
        this.alquiler=unPrecioAlquiler;
        this.encendido= unPrecioEncendido;
    }
}