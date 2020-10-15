import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Pregunta from './Pregunta';

const Parallel = props => {

    const [pregunta, setPregunta] = useState(false);

    const { paralelo, position } = props

    const preguntar = () => {
        setPregunta(true)
    }

    const eliminar = (condicion) => {

        if(condicion){
            props.eliminar(paralelo)
        }

        setPregunta(false)

    }

    return (
        <div className="relative mx-4 my-3">
            {
                (pregunta) &&
                <Pregunta mensaje={'Está seguro de borrar el paralelo?'} accionSi={() => eliminar(true)} accionNo={() => eliminar(false)}/>
            }
            {
                (JSON.parse(localStorage.userInfo).role === 'ADMIN') &&
                <i onClick={preguntar} className="fas fa-times absolute top-0 right-0 m-2 text-gray-400 hover:text-red-600 cursor-pointer"></i>
            }
            <Link to={`/admin/paralelo/${paralelo._id}`}>
                <div className="flex flex-col h-64 w-48 justify-around py-4 items-center bg-white shadow-md hover:bg-gray-200">
                    <h2 className="font-bold text-xl">{paralelo.periodo}</h2>
                    <i className={`fas fa-pencil-ruler font-bold text-xl text-${getRandomColor(position)}-500 bg-${getRandomColor(position)}-200 p-3 mb-2 rounded-lg`}></i>
                    <h2 className="font-semibold text-2xl">"{paralelo.letter}"</h2>
                    <h2 className="font-bold text-gray-600">Nivel {paralelo.level}</h2>
                    <h2 className={`font-semibold text-${getRandomColor(position)}-600`}>Nº de estudiantes: {paralelo.students.length}</h2>
                </div>
            </Link>
        </div>
    )

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

export default Parallel;