window.addEventListener('load', function(){
    document.querySelector('.delete').addEventListener('click', function(e){
        let confirmDelete = confirm('¿Estás seguro que querés borrar este producto?');

        if (!confirmDelete){
            e.preventDefault();
        }
    })

    document.querySelector('.price').addEventListener('load', function(e){
        if (e == '$0') {
            e.innerHTML = 'GRATUITO'
        }
    })
})

