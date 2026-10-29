document.addEventListener("DOMContentLoaded", function () {
    
    const selectTourCalc = document.getElementById("selectTourCalc");
    const numPersonas = document.getElementById("numPersonas");
    const montoTotal = document.getElementById("montoTotal");

    function calcularTotal() {
        if (selectTourCalc && numPersonas && montoTotal) {
            const precioBase = parseFloat(selectTourCalc.value) || 0;
            const cantidad = parseInt(numPersonas.value, 10) || 1;
            const total = precioBase * cantidad;
            montoTotal.textContent = `S/ ${total.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    }

    if (selectTourCalc && numPersonas && montoTotal) {
        calcularTotal();
        selectTourCalc.addEventListener("change", calcularTotal);
        numPersonas.addEventListener("input", calcularTotal);
        numPersonas.addEventListener("change", calcularTotal);
    }

    const botonesFiltro = document.querySelectorAll(".btn-filtro");
    const tarjetasTour = document.querySelectorAll(".tarjeta-tour");

    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", function () {
            botonesFiltro.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            const categoria = this.getAttribute("data-categoria");

            tarjetasTour.forEach(card => {
                if (categoria === "todos" || card.getAttribute("data-categoria") === categoria) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    const frmContacto = document.getElementById("frmContacto");
    const alertaContacto = document.getElementById("alertaContacto");

    if (frmContacto) {
        frmContacto.addEventListener("submit", function (e) {
            e.preventDefault();

            let nombre = document.getElementById("nombre").value.trim();
            let email = document.getElementById("email").value.trim();
            let telefono = document.getElementById("telefono").value.trim();
            let tour = document.getElementById("tour").value;
            let mensaje = document.getElementById("mensaje").value.trim();

            if (nombre === "" || email === "" || telefono === "" || tour === "" || mensaje === "") {
                mostrarAlerta("Todos los campos son obligatorios.", "danger");
                return;
            }

            if (!email.includes("@") || !email.includes(".") || email.includes(" ")) {
    mostrarAlerta("Ingrese un correo electrónico válido.", "danger");
    return;}

            mostrarAlerta("¡Consulta enviada con éxito a Inti Tours!", "success");
            frmContacto.reset();
        });
    }

    function mostrarAlerta(mensaje, tipo) {
        if (alertaContacto) {
            alertaContacto.className = `alert alert-${tipo} alert-dismissible fade show`;
            alertaContacto.innerHTML = `${mensaje} <button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
            alertaContacto.classList.remove("d-none");
        }
    }
});