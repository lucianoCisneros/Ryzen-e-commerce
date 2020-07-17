window.addEventListener('load', function () {
let modal = document.getElementById('myModal');
let img = document.getElementById('myImg');
let span = document.getElementById('close');

img.addEventListener('click', function(){
    modal.style.display = "block";
    img.src = this.src;
    addEventListener('keydown', function () {
        modal.style.display = "none";
    })
})
})