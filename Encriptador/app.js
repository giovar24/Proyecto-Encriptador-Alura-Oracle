/*
La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"
*/

// Definiendo variables
// Al asignar a variables elementos de la página, esto sincronizará sus características y hará más fácil leer el código.

let imagenMuneco = document.getElementById("imagenMuneco");
let textoDerecho2 = document.getElementById("caja_texto2");
let textoIzquierdo1 = document.getElementById("caja_texto1");
let textoDerecho3 = document.getElementById("caja_texto3");
let botonCopiar = document.getElementById("boton_copiar");
let vantanaModal =document.getElementById("dialogo");
let tmodal1 = document.getElementById("texto_modal1");
let tmodal2 = document.getElementById("texto_modal2");
let imagenModal = document.getElementById("maroImg");
let textoProcesado ="";
let proceso = 0;


// Función ocultar imagen del lado derecho.
function ocultarImagen() {
    imagenMuneco.style.display = "none";
    textoDerecho2.style.display = "none";
    botonCopiar.style.display = "block";
}

// Restablece la visibilidad de la imagen del lado derecho.
function mostrarImagen() {
    // Determina el tamaño de la pantalla para mostrar o no la imagen derecha
    if (screen.width.valueOf()> 768) {
        imagenMuneco.style.display = "block";
    }
    textoDerecho2.style.display = "block";
    botonCopiar.style.display = "none";
}

function validarTexto(opcion) {
    imagenModal.style.display = "block";
    let validado = 0;
    let regex = /[A-ZéíóáúñÑ]/g;
    let regex2 = /enter|imes|ai|ober|ufat/g;
    let texto = textoIzquierdo1.value.trim();

    if (texto === "Ingrese su texto aquí" || texto === "") {
        validado = 1;
    } else if (texto === textoProcesado){
        validado = 4;
    }else if  (regex.test(texto)) {
        validado = 2;
    } else if (opcion === 2 && regex2.test(texto) !== true) {
        validado = 3;
    }
    console.log(validado);

    desplegarModal(validado);
    return validado;
}

//Desplegando ventana modal
function desplegarModal(opcion){
    switch (opcion) {
        case 1:
            //alert("No se ha ingresado ningún texto");
            tmodal1.value = "¡Error!";
            tmodal2.value ="No se ha ingresado ningún texto"      
            vantanaModal.showModal();  
        break;
        case 2:
            //alert("El texto contiene caracteres inválidos");
            tmodal1.value = "¡Error!";
            tmodal2.value ="El texto contiene caracteres inválidos"      
            vantanaModal.showModal();       
         break;
         case 3:
            tmodal1.value = "¡Error!";
            tmodal2.value ="Ningún mensaje fue encontrado"   
            imagenModal.style.display= "none";    
            vantanaModal.showModal();
               
        break; 
        case 4:
            tmodal1.value = "";
            tmodal2.value =`El texto ya fue procesado como ${proceso=1?"encriptado":"desencriptado"}`;  
            vantanaModal.showModal();
        break;   

    
        default:
            break;
    }
}



// Función encriptar texto
function encriptarTexto() {

    if (validarTexto(1)===0){
    
        // Almaceno texto de la caja de texto en una variable
        let texto = textoIzquierdo1.value.trim();

        // Ocultando imágenes
        ocultarImagen();

        // Definimos un objeto con las reglas de reemplazo (para una expresión regular)
        let reglas = {
            'e': 'enter',
            'i': 'imes',
            'a': 'ai',
            'o': 'ober',
            'u': 'ufat'
        };

        /* Reemplazando el texto, también se puede hacer con for anidados pero así es más sencillo.
           Se utiliza la función => para crear una función dentro de la sentencia.
           /[aeiou]/g es una expresión regular que se utiliza para buscar las vocales 
        */
       
        let textoEncriptado = texto.replace(/[aeiou]/g, (match) => {
            return reglas[match] || match; // Si no hay regla, dejamos la vocal original
        });

        // Desplegando el texto en la caja de texto del lado derecho   
        textoDerecho3.value = textoEncriptado;
        textoProcesado = texto;
        proceso =1;
        botonCopiar.style.display = "block";
    }  
}

function desencriptar() {

    if(validarTexto(2)===0){
        
        // Creando variables para la función.
        let texto = textoIzquierdo1.value;

        // Definimos un objeto con las reglas de reemplazo (para una expresión regular)
        const reglas = {
            'enter': 'e',
            'imes': 'i',
            'ai': 'a',
            'ober': 'o',
            'ufat': 'u'
        };

        // Ocultando imágenes
        ocultarImagen();

        // Reemplazando las palabras dentro del texto mediante replace() y RegEx 
        let textoDesencriptado = texto.replace(/enter|imes|ai|ober|ufat/g, (match) => {
        return reglas[match] || match; // Si no hay regla, no cambiamos la palabra
        });

        // Desplegando el texto en la caja de texto del lado derecho 
        textoProcesado = texto;  
        textoDerecho3.value = textoDesencriptado;
        proceso =2;
        botonCopiar.style.display = "block";
    }
}

// Función que devuelve los valores originales 
function reset() {
    textoIzquierdo1.value = "Ingrese su texto aquí";
    textoDerecho3.value = "Ningún mensaje fue encontrado";
    mostrarImagen();
    botonCopiar.innerHTML = "Copiar";
    botonCopiar.removeAttribute("disabled");
    botonCopiar.style.backgroundColor = "#D8DFE8";
    textoProcesado ="";
    proceso = 0;
}

function copiarTexto() {
    navigator.clipboard.writeText(textoDerecho3.value);
    botonCopiar.style.backgroundColor = "#9b9b9b";
    botonCopiar.setAttribute("disabled","true");
    tmodal1.value = "";
    tmodal2.value ="¡El texto ha sido copiado al portapeles!" 
    imagenModal.style.display= "none"; 
    vantanaModal.showModal();
    


}
function cerrar(){
    tmodal2.value ="";
    tmodal1.value="";
    vantanaModal.close();
       
    
}







