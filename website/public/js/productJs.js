window.addEventListener('load', function () {
let modal = document.getElementById('myModal');
let img = document.getElementById('myImg');
let span = document.getElementById('close');

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