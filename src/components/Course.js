import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Pregunta from './Pregunta';

const Course = props => {

    const [pregunta, setPregunta] = useState(false);

    const curso = props.curso;
    const position = props.position

    const preguntar = () => {
        setPregunta(true)
    }
    
    const eliminar = (condicion) => {
        
        if(condicion){
            props.eliminar(curso._id)
        }

        setPregunta(false)

    }

    return (
        <div className="relative mx-4 my-3">
            {
                (JSON.parse(localStorage.userInfo).role === 'ADMIN') && (
                    <React.Fragment>
                        {
                            (pregunta) &&
                            <Pregunta mensaje={'Está seguro de borrar el curso?'} accionSi={() => eliminar(true)} accionNo={() => eliminar(false)}/>
                        }
                        <Link to={`/admin/curso/${curso._id}/modificar`} className="absolute top-0 left-0 m-2 text-gray-400 hover:text-green-600">
                            <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <i onClick={preguntar} className="fas fa-times absolute top-0 right-0 m-2 text-gray-400 hover:text-red-600 cursor-pointer"></i>
                    </React.Fragment>
                )
            }
            <Link to={`/admin/cursos/${curso._id}`}>
                <div className="flex flex-col h-64 w-48 justify-center items-center bg-white shadow-md">
                    <i className={`fas fa-book text-2xl text-${getRandomColor(position)}-500 bg-${getRandomColor(position)}-200 p-3 mb-2 rounded-lg`}></i>
                    <h2 className="text-center font-bold mb-3 text-wrap px-2">{curso.name}</h2>
                </div>
            </Link>
        </div>
    );

}

const getRandomColor = (numero) => {

    if (numero % 4 === 0)
        return 'blue';
    
    if (numero % 4 === 1)
        return 'green';
        
    if (numero % 4 === 2)
        return 'red';

    if (numero % 4 === 3)
        return 'yellow';

}

export default Course;