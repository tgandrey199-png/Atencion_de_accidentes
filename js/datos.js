
export let accidentes = [
    {
        id: 1,
        fecha: "2026-11-10",
        ubicacion: "Centro de Puebla",
        tipo: "Automovilístico",
        descripcion: "Choque entre dos vehículos.",
        estado: "Pendiente"
    },
    {
        id: 2,
        fecha: "2026-11-11",
        ubicacion: "Angelópolis",
        tipo: "Peatonal",
        descripcion: "Accidente reportado en avenida.",
        estado: "Atendido"
    }
];

export let asistencias = [
    {
        id: 1,
        ciudadano: "Juan Pérez",
        fecha: "2026-11-10",
        ubicacion: "Centro de Puebla",
        tipo: "Médica",
        descripcion: "Solicitud de asistencia médica.",
        estado: "Pendiente"
    },
    {
        id: 2,
        ciudadano: "María López",
        fecha: "2026-11-11",
        ubicacion: "Angelópolis",
        tipo: "Vial",
        descripcion: "Solicitud de apoyo vial.",
        estado: "En proceso"
    }
];

export async function obtenerAccidentes() {
    return accidentes;
}

export async function obtenerAccidente(id) {
    return accidentes.find(a => a.id === Number(id));
}

export async function obtenerAsistencias() {
    return asistencias;
}

export async function obtenerAsistencia(id) {
    return asistencias.find(a => a.id === Number(id));
}

export function guardarAccidente(datos) {
    const nuevo = {
        id: Math.max(0, ...accidentes.map(a => a.id)) + 1,
        ...datos
    };

    accidentes.push(nuevo);
}

export function editarAccidente(id, datos) {
    const posicion = accidentes.findIndex(
        a => a.id === Number(id)
    );

    if (posicion !== -1) {
        accidentes[posicion] = {
            ...accidentes[posicion],
            ...datos
        };
    }
}

export function guardarAsistencia(datos) {
    const nueva = {
        id: Math.max(0, ...asistencias.map(a => a.id)) + 1,
        ...datos
    };

    asistencias.push(nueva);
}

export function editarAsistencia(id, datos) {
    const posicion = asistencias.findIndex(
        a => a.id === Number(id)
    );

    if (posicion !== -1) {
        asistencias[posicion] = {
            ...asistencias[posicion],
            ...datos
        };
    }
}
