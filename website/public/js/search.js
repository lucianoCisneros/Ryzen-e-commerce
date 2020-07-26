//Declarando variables
window.addEventListener('load', function(){
bars_search = document.getElementById('container-search');
cover_container_search = document.getElementById('cover-container-search');
input_search = document.getElementById('input-search');
box_search = document.getElementById('box-search');

//Funcion para desplegar buscador

function mostrar_buscador (){
    bars_search.style.top = '50px';
    cover_container_search.style.display = 'block';
    input_search.focus();
    bars_search.style.position = 'absolute';
    box_search.style.position = 'absolute'

    if (input_search.value === '') {
        box_search.style.display = 'none';
    }
}

//Funcion para ocultar buscador

function ocultar_buscador(){
    bars_search.style.position = 'fixed';
    bars_search.style.top = '-84px';
    cover_container_search.style.display = 'none';
    input_search.value = '';
    box_search.style.display = 'none';
}

//Creando filtrado de busqueda
document.getElementById('input-search').addEventListener('keyup', buscador_interno);

function buscador_interno(){
    filter = input_search.value.toUpperCase();
    li = box_search.getElementsByTagName('li');

    //Recorriendo elementos a filtrar mediante
    for(i = 0; i < li.length; i++){
        a = li[i].getElementsByTagName('a')[0];
        textValue = a.textContent || a.innerText;

        if(textValue.toUpperCase().indexOf(filter) > -1){
            li[i].style.display = '';
            box_search.style.display = 'block';

            if(input_search.value === ''){
                box_search.style.display = 'none'
            }
        } else {
            li[i].style.display = 'none';
        }
    }
}

//Ejecutando funciones

document.getElementById('icon-search').addEventListener('click', mostrar_buscador);


document.getElementById('cover-container-search').addEventListener('click', ocultar_buscador);
})