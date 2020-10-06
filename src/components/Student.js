import React from 'react';

const Student = props => {

    const estudiante = props.estudiante;
    const position = props.position


    return (
        <button className="mx-4 my-3">
            <div className="flex flex-col h-64 w-48 justify-center items-center bg-white shadow-md">
                <i className={`fas fa-user-graduate text-2xl text-${getRandomColor(position)}-500 bg-${getRandomColor(position)}-200 p-3 mb-2 rounded-lg`}></i>
                <h2 className="text-center font-bold mb-1 text-wrap px-2">{estudiante.name} {estudiante.last_name}</h2>
                <h2 className="text-gray-700 text-xs m-0">{estudiante.born.split('T')[0]}</h2>
                <div className={`m-2 text-${getRandomColor(position)}-500`}>
                    <i class="fas fa-envelope"></i>
                    <h2 className="text-gray-700 text-xs">{estudiante.email}</h2>
                </div>
                <h2 className="font-bold">{estudiante.user_name}</h2>
            </div>
        </button>
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

export default Student;