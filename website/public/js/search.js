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

//Mobile

    bars_search_mb = document.getElementById('container-search-mb');
    cover_container_search_mb = document.getElementById('cover-container-search-mb');
    input_search_mb = document.getElementById('input-search-mb');
    box_search_mb = document.getElementById('box-search-mb');

    //Funcion para desplegar buscador

    function mostrar_buscador_mb() {
        bars_search_mb.style.top = '50px';
        cover_container_search_mb.style.display = 'block';
        input_search_mb.focus();
        bars_search_mb.style.position = 'absolute';
        box_search_mb.style.position = 'absolute'

        if (input_search_mb.value === '') {
            box_search_mb.style.display = 'none';
        }
    }

    //Funcion para ocultar buscador

    function ocultar_buscador_mb() {
        bars_search_mb.style.position = 'fixed';
        bars_search_mb.style.top = '-84px';
        cover_container_search_mb.style.display = 'none';
        input_search_mb.value = '';
        box_search_mb.style.display = 'none';
    }

    //Creando filtrado de busqueda
    document.getElementById('input-search-mb').addEventListener('keyup', buscador_interno_mb);

    function buscador_interno_mb() {
        filter = input_search_mb.value.toUpperCase();
        li = box_search_mb.getElementsByTagName('li');

        //Recorriendo elementos a filtrar mediante
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName('a')[0];
            textValue = a.textContent || a.innerText;

            if (textValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = '';
                box_search_mb.style.display = 'block';

                if (input_search_mb.value === '') {
                    box_search_mb.style.display = 'none'
                }
            } else {
                li[i].style.display = 'none';
            }
        }
    }

    //Ejecutando funciones

    document.getElementById('icon-search-mb').addEventListener('click', mostrar_buscador_mb);


    document.getElementById('cover-container-search-mb').addEventListener('click', ocultar_buscador_mb);
})