import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = props => {

    const opciones = [
        {
            nombre: 'Cursos',
            url: 'cursos',
            icono: <i className="fas fa-vector-square"></i>
        },
        {
            nombre: 'Paralelos',
            url: 'paralelos',
            icono: <i className="fas fa-puzzle-piece"></i>
        }
    ]

    const mostrarOpciones = () => {

        return opciones.map( opcion => 
            <Link key={opcion.nombre} to={`/admin/${opcion.url}`}>
                <div className="flex flex-col items-center m-4 text-gray-600 border-b-2 pb-6">
                    {
                        opcion.icono
                    }
                    <h2>
                        {opcion.nombre}
                    </h2>
                </div>
            </Link>
        )

    }

    return(
        <div className="flex flex-col bg-white">
            {
                mostrarOpciones()
            }
        </div>
    );

}

export default SideBar;