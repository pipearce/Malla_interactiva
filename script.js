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

    // Hover para iluminar ramos relacionados (soporta múltiples ids separados por coma)
    ramo.addEventListener('mouseenter', () => {
        const relacionados = ramo.getAttribute('data-relacionado');
        if (relacionados) {
            relacionados.split(',').forEach(idRel => {
                const idLimpio = idRel.trim();
                const ramoRelacionado = document.querySelector(`.ramo[data-id="${idLimpio}"]`);
                if (ramoRelacionado) {
                    ramoRelacionado.classList.add('iluminado');
                }
            });
        }
    });

    ramo.addEventListener('mouseleave', () => {
        const relacionados = ramo.getAttribute('data-relacionado');
        if (relacionados) {
            relacionados.split(',').forEach(idRel => {
                const idLimpio = idRel.trim();
                const ramoRelacionado = document.querySelector(`.ramo[data-id="${idLimpio}"]`);
                if (ramoRelacionado) {
                    ramoRelacionado.classList.remove('iluminado');
                }
            });
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

