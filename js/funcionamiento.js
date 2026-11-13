
import {
    obtenerAccidentes,
    obtenerAccidente,
    obtenerAsistencias,
    obtenerAsistencia,
    guardarAccidente,
    editarAccidente,
    guardarAsistencia,
    editarAsistencia
} from "./datos.js";

const configuraciones = {
    accidentes: {
        obtenerTodos: obtenerAccidentes,
        obtenerUno: obtenerAccidente,
        guardar: guardarAccidente,
        editar: editarAccidente,
        titulo: "Accidentes",
        campos: [
            { nombre: "fecha", etiqueta: "Fecha", tipo: "date" },
            { nombre: "ubicacion", etiqueta: "Ubicación", tipo: "text" },
            {
                nombre: "tipo",
                etiqueta: "Tipo de accidente",
                tipo: "select",
                opciones: ["Automovilístico", "Peatonal", "Motocicleta", "Otro"]
            },
            { nombre: "descripcion", etiqueta: "Descripción", tipo: "textarea" },
            {
                nombre: "estado",
                etiqueta: "Estado",
                tipo: "select",
                opciones: ["Pendiente", "En proceso", "Atendido"]
            }
        ],
        columnas: ["fecha", "ubicacion", "tipo", "estado"]
    },

    asistencias: {
        obtenerTodos: obtenerAsistencias,
        obtenerUno: obtenerAsistencia,
        guardar: guardarAsistencia,
        editar: editarAsistencia,
        titulo: "Asistencia ciudadana",
        campos: [
            { nombre: "ciudadano", etiqueta: "Nombre del ciudadano", tipo: "text" },
            { nombre: "fecha", etiqueta: "Fecha", tipo: "date" },
            { nombre: "ubicacion", etiqueta: "Ubicación", tipo: "text" },
            {
                nombre: "tipo",
                etiqueta: "Tipo de asistencia",
                tipo: "select",
                opciones: ["Médica", "Vial", "Protección civil", "Otra"]
            },
            { nombre: "descripcion", etiqueta: "Descripción", tipo: "textarea" },
            {
                nombre: "estado",
                etiqueta: "Estado",
                tipo: "select",
                opciones: ["Pendiente", "En proceso", "Atendido"]
            }
        ],
        columnas: ["ciudadano", "fecha", "ubicacion", "tipo", "estado"]
    }
};

const contenedor = document.getElementById("app");

if (contenedor) {
    iniciarModulo();
}

async function iniciarModulo() {
    const tipo = contenedor.dataset.tipo;
    const vista = contenedor.dataset.vista;
    const config = configuraciones[tipo];

    if (!config) {
        contenedor.innerHTML = "<p>Módulo no encontrado.</p>";
        return;
    }

    if (vista === "lista") {
        await mostrarLista(config, tipo);
    }

    if (vista === "detalle") {
        await mostrarDetalle(config, tipo);
    }

    if (vista === "formulario") {
        await mostrarFormulario(config, tipo);
    }
}

function escapar(texto) {
    return String(texto ?? "").replace(/[&<>"']/g, caracter => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caracter]);
}

async function mostrarLista(config, tipo) {
    const registros = await config.obtenerTodos();

    let contenido = `
        <div class="encabezado-modulo">
            <div>
                <h1>${config.titulo}</h1>
                <p>Consulta y administra los registros.</p>
            </div>
            <a class="boton" href="${tipo === "accidentes" ? "accidente" : "asistencia"}-formulario.html">
                + Nuevo registro
            </a>
        </div>
    `;

    if (registros.length === 0) {
        contenido += `
            <div class="vacio">
                <h2>No hay registros disponibles</h2>
                <p>Cuando agregues información aparecerá aquí.</p>
            </div>
        `;
    } else {
        contenido += `
            <div class="tabla-contenedor">
                <table>
                    <thead>
                        <tr>
                            ${config.columnas.map(c =>
                                `<th>${escapar(c.toUpperCase())}</th>`
                            ).join("")}
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${registros.map(registro => `
                            <tr>
                                ${config.columnas.map(c =>
                                    `<td>${escapar(registro[c])}</td>`
                                ).join("")}
                                <td>
                                    <a href="${tipo === "accidentes" ? "accidente" : "asistencia"}-detalle.html?id=${registro.id}">
                                        Ver detalle
                                    </a>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `;
    }

    contenedor.innerHTML = contenido;
}

async function mostrarDetalle(config, tipo) {
    const id = new URLSearchParams(window.location.search).get("id");
    const registro = await config.obtenerUno(id);

    if (!registro) {
        contenedor.innerHTML = `
            <div class="vacio">
                <h2>Registro no encontrado</h2>
                <a href="${tipo}.html">Regresar a la lista</a>
            </div>
        `;
        return;
    }

    let campos = Object.entries(registro).map(([clave, valor]) => `
        <div class="detalle-campo">
            <strong>${escapar(clave)}</strong>
            <span>${escapar(valor)}</span>
        </div>
    `).join("");

    contenedor.innerHTML = `
        <div class="encabezado-modulo">
            <div>
                <h1>Detalle del registro #${registro.id}</h1>
                <p>Información completa del registro.</p>
            </div>
        </div>

        <section class="detalle">
            ${campos}
        </section>

        <div class="acciones">
            <a class="boton" href="${tipo === "accidentes" ? "accidente" : "asistencia"}-formulario.html?id=${registro.id}">
                Editar registro
            </a>
            <a class="boton boton-secundario" href="${tipo}.html">
                Volver
            </a>
        </div>
    `;
}

async function mostrarFormulario(config, tipo) {
    const id = new URLSearchParams(window.location.search).get("id");
    const registro = id ? await config.obtenerUno(id) : null;

    if (id && !registro) {
        contenedor.innerHTML = `
            <div class="vacio">
                <h2>Registro no encontrado</h2>
                <a href="${tipo}.html">Regresar</a>
            </div>
        `;
        return;
    }

    const campos = config.campos.map(campo => {
        const valor = escapar(registro?.[campo.nombre] ?? "");

        if (campo.tipo === "select") {
            return `
                <label>
                    ${campo.etiqueta}
                    <select name="${campo.nombre}" required>
                        <option value="">Selecciona una opción</option>
                        ${campo.opciones.map(opcion => `
                            <option value="${escapar(opcion)}"
                                ${valor === opcion ? "selected" : ""}>
                                ${escapar(opcion)}
                            </option>
                        `).join("")}
                    </select>
                </label>
            `;
        }

        if (campo.tipo === "textarea") {
            return `
                <label>
                    ${campo.etiqueta}
                    <textarea name="${campo.nombre}" required>${valor}</textarea>
                </label>
            `;
        }

        return `
            <label>
                ${campo.etiqueta}
                <input
                    type="${campo.tipo}"
                    name="${campo.nombre}"
                    value="${valor}"
                    required
                >
            </label>
        `;
    }).join("");

    contenedor.innerHTML = `
        <div class="encabezado-modulo">
            <div>
                <h1>${registro ? "Editar" : "Nuevo"} registro</h1>
                <p>Completa la información solicitada.</p>
            </div>
        </div>

        <form id="form-registro" class="formulario">
            ${campos}

            <div class="acciones">
                <button class="boton" type="submit">
                    ${registro ? "Guardar cambios" : "Registrar"}
                </button>

                <a class="boton boton-secundario" href="${tipo}.html">
                    Cancelar
                </a>
            </div>

            <p id="mensaje-formulario" role="status"></p>
        </form>
    `;

    document.getElementById("form-registro").addEventListener("submit", evento => {
        evento.preventDefault();

        const formulario = new FormData(evento.target);
        const datos = Object.fromEntries(formulario.entries());

        if (registro) {
            config.editar(id, datos);
        } else {
            config.guardar(datos);
        }

        window.location.href = `${tipo}.html`;
    });
}
