window.addEventListener('load', function () {
let modal = document.getElementById('myModal');
let img = document.getElementById('myImg');
let span = document.getElementById('close');
let specs = document.getElementById('especificacionesDetalles');
let manuals = document.getElementById('manuals');
let specsLink = document.getElementById('specsA');
let manualLink = document.getElementById('manualA');

manualLink.addEventListener('click', (e) => {
    specs.classList.remove('especificacionesDetalles')
    specs.classList.add('manuals')
    manuals.classList.remove('manuals')
    manuals.classList.add('especificacionesDetalles')
})

specsLink.addEventListener('click', (e) => {
    specs.classList.remove('manuals')
    specs.classList.add('especificacionesDetalles')
    manuals.classList.remove('especificacionesDetalles')
    manuals.classList.add('manuals')
})

if (window.innerWidth > 991){
img.addEventListener('click', function(){
    modal.style.display = "flex";
    img.src = this.src;
    addEventListener('keydown', function () {
        modal.style.display = "none";
    })
})
}

})