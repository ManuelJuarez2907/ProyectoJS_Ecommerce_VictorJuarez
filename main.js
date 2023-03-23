class Producto{
    constructor(nombre,precio,stock){
        this.nombre=nombre;
        this.precio=precio;
        this.stock=stock;
        this.total=0;
    }
    get_datos(){

        console.log("<------- DATOS PRODUCTO ------->");
        console.log("Nombre: " , this.nombre);
        console.log("Precio: " , this.precio);
        console.log("Stock: ", this.stock);
        console.log("");
    }
}




let lista_de_usuarios = [];
function registrar(){
    let nombre_usuario = document.getElementById("user");
    let pass_usuario = document.getElementById("pass");


    let usuario = {nombre:nombre_usuario.value , password:pass_usuario.value};

    lista_de_usuarios.push(usuario);

    let lista_JSON = JSON.stringify(lista_de_usuarios);

    localStorage.setItem("arreglo_usuarios" , lista_JSON);
}



function login(){

    let nombre_usuario = document.getElementById("user");
    let pass_usuario = document.getElementById("pass");
    let lista_recuperada_JSON = localStorage.getItem("arreglo_usuarios");

    lista_de_usuarios = JSON.parse(lista_recuperada_JSON);

    for( let usuario of lista_de_usuarios){

        if(nombre_usuario.value==usuario.nombre && pass_usuario.value==usuario.password){
            cajas.innerHTML = `<h2>Bienvenido al ecommerce ${nombre_usuario.value}. Podes comprar.</h2>`;
            let template= "";
            for(producto of lista_de_productos){
                
                template_productos=` 
                                    <div>
                                        <img src="" alt="">
                                        <h3 class="producto">${producto.nombre}</h3>
                                        <h3 class="precio">${producto.precio}</h3>
                                        <h3 class="stock">Stock:${producto.stock}</h3>
                                        <button class="btn_compra">Agregar al carrito</button">
                                    </div>`;
                template=template+template_productos;
            }
            productos.innerHTML = template;
        }else if(nombre_usuario.value!=usuario.nombre){
            cajas.innerHTML=`<h2>Usuario no registrado.</h2>`;
        }else if(nombre_usuario.value==usuario.nombre && pass_usuario.value!=usuario.password){
            cajas.innerHTML=`<h2>Contraseña incorrecta.</h2>`;
        }else{
            cajas.innerHTML=`<h2>Credenciales incorrectas</h2>`;
        }
    }

        let btn_agregar_carrito= document.querySelectorAll(".btn_compra");

        for( let boton of btn_agregar_carrito){
            boton.addEventListener("click" , agregar_al_carrito);    
        }
    
}



let carrito = [];

function agregar_al_carrito(e){

    //console.log("SE CLICKEO EL BOTON:" , e.target)

    let hijo = e.target;
    let padre = hijo.parentNode;
    //let abuelo = padre.parentNode;

    let nombre_producto = padre.querySelector(".producto").textContent;
    let precio_producto = padre.querySelector(".precio").textContent;
    let stock_producto = padre.querySelector(".stock").textContent;


    let producto_para_agregar = {
        nombre: nombre_producto,
        precio: precio_producto,
        stock: stock_producto,
        cantidad: 1
    };

    //GUARDAR EN EL LOCALSTORAGE
    //carrito.push(producto);

    mostrar_carrito( producto_para_agregar);
}



function mostrar_carrito( producto_para_agregar){
    for(producto of lista_de_productos){
        if(producto_para_agregar.nombre == producto.nombre){
            let span_cantidad=document.querySelector(`.tabla_cantidad_${producto.nombre}`);
            span_cantidad.innerHTML =`${producto_para_agregar.cantidad}`;
            let celda_cantidad = span_cantidad.parentNode;
            celda_cantidad.append (span_cantidad);  
        }
    }
    
}



let total= 0;
function incrementar_cantidad(e){
    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;

    let nombre_producto= abuelo.querySelector("h4").textContent
    console.log(nombre_producto);
    for(producto of lista_de_productos){
        if(nombre_producto == producto.nombre){
            producto.total= parseInt(padre.querySelector("span").textContent)+1;        
            console.log(producto.total)
            padre.querySelector("span").innerHTML=producto.total
        }
    }
}


function decrementar_cantidad(e){
    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;
    
    let span_cantidad = parseInt (padre.querySelector("span").textContent);
    let nombre_producto= abuelo.querySelector("h4").textContent;
    
    for(producto of lista_de_productos){
        if(nombre_producto == producto.nombre && span_cantidad>=1){
            producto.total= span_cantidad-1;        
            console.log(producto.total)
            padre.querySelector("span").innerHTML=producto.total
        }
    }
}


function borrar_producto(e){

    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;

    abuelo.remove();

}







let cajas = document.getElementById("cajas");

cajas.innerHTML = `     <h1>Bienvenido</h1>
                        <input id="user" type="text">
                        <label for="user">Usuario</label>
                        <input id="pass" type="text">
                        <label for="pass">Contraseña</label>
                        <input type="button" value="LOGIN" id="login">
                        <input type="button" value="REGISTRARSE" id="registrarse">`;

let productos = document.getElementById("productos");
productos.innerHTML = `<h3>Tenes que loguearte para ver los productos</h3>`;

let btn_registrarse = document.getElementById("registrarse");
btn_registrarse.addEventListener("click", registrar);

let btn_login = document.getElementById("login");
btn_login.addEventListener("click", login);

let lista_de_productos =[];
let productouno = new Producto("ESPEJO" , 10000 , 10);
let productodos = new Producto("MACETA" , 5000 , 5);
let productotres = new Producto("MACRAME" , 3000 , 20);

lista_de_productos.push(productouno);
lista_de_productos.push(productodos);
lista_de_productos.push(productotres);

let tabla = document.getElementById("tbody");
for(producto of lista_de_productos){
    let fila = document.createElement("tr");
    fila.class= `fila_${producto.nombre}`;
    fila.innerHTML = `<td><button class="btn btn-danger borrar_elemento">Borrar</button></td>
                      <td class=tabla_${producto.nombre}><h4>${producto.nombre}</h4></td>
                      <td>${producto.precio}</td>
                      <td>${producto.stock}</td>
                      <td>
                            <button class="incrementar">+</button>
                            <button class="decrementar">-</button>
                            <span class="tabla_cantidad_${producto.nombre}">1</span>
                      </td>
                      `;                  
    tabla.append( fila );
}
/*
for (i = 0; i < lista_de_productos.length; i++) {
    let produno=productouno.total(0);
    console.log();
  }
*/
btn_incrementar = document.querySelectorAll(".incrementar");
console.log(btn_incrementar);
for ( boton_i of btn_incrementar){
    boton_i.addEventListener("click",incrementar_cantidad);
}

btn_decrementar = document.querySelectorAll(".decrementar");
console.log(btn_decrementar);
for ( boton_d of btn_decrementar){
    boton_d.addEventListener("click",decrementar_cantidad);
}

let btn_borrar = document.querySelectorAll(".borrar_elemento");    
for( let boton_b of btn_borrar){
    boton_b.addEventListener("click" , borrar_producto);
}