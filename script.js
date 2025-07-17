const ramos = document.querySelectorAll('.ramo');

ramos.forEach(ramo => {
    const id = ramo.getAttribute('data-id');
    const estado = localStorage.getItem('ramo_' + id);
    if (estado === 'hecho') {
        ramo.classList.add('hecho');
    }

    ramo.addEventListener('click', () => {
        ramo.classList.toggle('hecho');
        if (ramo.classList.contains('hecho')) {
            localStorage.setItem('ramo_' + id, 'hecho');
        } else {
            localStorage.removeItem('ramo_' + id);
        }
    });
});
