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

        // Aquí chequeamos si todos los ramos del semestre están hechos
        checkSemestreCompleted(ramo);
    });

    // Nuevo: hover para iluminar ramo relacionado
    ramo.addEventListener('mouseenter', () => {
        const idRelacionado = ramo.getAttribute('data-relacionado');
        if (idRelacionado) {
            const ramoRelacionado = document.querySelector(`.ramo[data-id="${idRelacionado}"]`);
            if (ramoRelacionado) {
                ramoRelacionado.classList.add('iluminado');
            }
        }
    });

    ramo.addEventListener('mouseleave', () => {
        const idRelacionado = ramo.getAttribute('data-relacionado');
        if (idRelacionado) {
            const ramoRelacionado = document.querySelector(`.ramo[data-id="${idRelacionado}"]`);
            if (ramoRelacionado) {
                ramoRelacionado.classList.remove('iluminado');
            }
        }
    });
});

function showModal() {
    const modal = document.getElementById('modal-felicidades');
    if (modal) modal.style.display = 'flex';
}

function hideModal() {
    const modal = document.getElementById('modal-felicidades');
    if (modal) modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const btnCerrar = document.getElementById('cerrar-modal');
    if (btnCerrar) {
        btnCerrar.addEventListener('click', hideModal);
    }
});

function checkSemestreCompleted(ramo) {
    // Obtenemos el div padre de semestre
    const semestreDiv = ramo.closest('.semestre');
    if (!semestreDiv) return;

    // Obtenemos todos los ramos dentro de ese semestre
    const ramosDelSemestre = semestreDiv.querySelectorAll('.ramo');

    // Verificamos si TODOS están marcados con la clase 'hecho'
    const todosHechos = Array.from(ramosDelSemestre).every(r => r.classList.contains('hecho'));

    if (todosHechos) {
        showModal();
    }
}
