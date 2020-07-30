window.addEventListener('load', () => {
    let categorias = document.querySelectorAll('.categorieDiv');
    let categoriasNombre = document.querySelectorAll('.categorieDiv span');
    let productos1 = document.querySelectorAll('.productsJS');
    let editOption = document.querySelector('.name p');

    var categoryClick
    for (let i = 0; i < categorias.length; i++) {
        categorias[i].addEventListener('click', (e) => {
                categorias.forEach(e => {
                    e.classList.add('productCategory');
                    categoryClick = i;
                })

            for (let y = 0; y < productos1.length; y++) {
                let hasClass = productos1[y].classList.contains('productCategory' + (categoryClick + 1));
                if (hasClass) {
                    productos1[y].classList.remove('productCategory')
                }
            }

            editOption.innerHTML += ' - ' + categoriasNombre[i].innerHTML;
    })
    }
})