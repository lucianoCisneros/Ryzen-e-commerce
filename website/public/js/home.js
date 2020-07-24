window.addEventListener('load', () => {
    let container = document.querySelector('.secondContainer')
    let firstContainer = document.querySelector('.firstContainer')

    window.addEventListener('scroll', function(e){
        container.style.animation = 'fadeIn 8s ease 0s';
    })
})