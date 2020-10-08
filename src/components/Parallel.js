import React from 'react';

const Parallel = props => {

    const { paralelo } = props
    const { position } = props

    return (
        <button className="mx-4 my-3">
            <div className="flex flex-col h-64 w-48 justify-around py-4 items-center bg-white shadow-md hover:bg-gray-200">
                <h2 className="font-bold text-xl">{paralelo.periodo}</h2>
                <i className={`fas fa-pencil-ruler font-bold text-xl text-${getRandomColor(position)}-500 bg-${getRandomColor(position)}-200 p-3 mb-2 rounded-lg`}></i>
                <h2 className="font-semibold text-2xl">"{paralelo.letter}"</h2>
                <h2 className="font-bold text-gray-600">Nivel {paralelo.level}</h2>
                <h2 className={`font-semibold text-${getRandomColor(position)}-600`}>Nº de estudiantes: {paralelo.students.length}</h2>
            </div>
        </button>
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