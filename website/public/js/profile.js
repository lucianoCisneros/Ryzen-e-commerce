window.addEventListener('load', () => {
    let categorias = document.querySelectorAll('.categorieDiv');
    let categoriasNombre = document.querySelectorAll('.categorieDiv span');
    let productos1 = document.querySelectorAll('.productsJS');
    let editOption = document.querySelector('.name p');
    let returnOption = document.querySelector('.name span')

    let categoryClick
    for (let i = 0; i < categorias.length; i++) {
        categorias[i].addEventListener('click', () => {
                categorias.forEach(e => {
                    e.classList.add('noDisplay');
                })
            categoryClick = i;

            for (let y = 0; y < productos1.length; y++) {
                let hasClass = productos1[y].classList.contains('productCategory' + (categoryClick + 1));
                if (hasClass) {
                    productos1[y].classList.remove('noDisplay')
                }
            }

            editOption.innerHTML += ' - ' + categoriasNombre[i].innerHTML;
            returnOption.classList.remove('noDisplay')
        })
    }

    returnOption.addEventListener('click', () => {
        categorias.forEach(e => {
            e.classList.remove('noDisplay');
        })
        productos1.forEach(e => {
            e.classList.add('noDisplay');
        })
        editOption.innerHTML = 'Seleccione la opción a editar';
        returnOption.classList.add('noDisplay');
    })
})