export interface emergencia {
    id: number,
    descripcion: string,
    victimas: number
}

export interface atencion {
    resAtencion: {
        id: number,
        descripcion: string,
        victimas: number,
        fecha: string,
        estado: string,
        medico: string
    }
}

export interface personal{
    id:number,
    nombre:string,
    apellido:string,
    fono:number,
    email:string,
    cargo:number,
    disponibilidad:string,
    password:string
}

export interface atencion{
    id:number,
    descripcion:string,
    victimas:number,
    fecha:string,
    estado:string,
    medico:string
}