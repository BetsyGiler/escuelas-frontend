import React from 'react';

const Student = props => {

    const estudiante = props.estudiante;
    const position = props.position

    const copiarId = (props) => {

        const elem = document.createElement('textarea');
        elem.value = estudiante._id;
        document.body.appendChild(elem);
        elem.select();
        document.execCommand('copy');
        document.body.removeChild(elem);

        alert('ID del estudiante copiado')

    }

    const eliminarEstudiante = () => {
        props.eliminar(estudiante._id)
    }

    return (
        <div className="relative mx-4 my-3">
            <i onClick={eliminarEstudiante} className="fas fa-times absolute top-0 right-0 m-2 text-gray-400 hover:text-red-600 cursor-pointer"></i>
            <button onClick={copiarId} className="flex flex-col h-64 w-48 justify-center items-center bg-white shadow-md">
                <i className={`fas fa-user-graduate text-2xl text-${getRandomColor(position)}-500 bg-${getRandomColor(position)}-200 p-3 mb-2 rounded-lg`}></i>
                <h2 className="text-center font-bold mb-1 text-wrap px-2">{estudiante.name} {estudiante.last_name}</h2>
                {
                    (estudiante.born) &&
                    <h2 className="text-gray-700 text-xs m-0">{estudiante.born.split('T')[0]}</h2>
                }
                {
                    (estudiante.email) && (
                        <div className={`m-2 text-${getRandomColor(position)}-500`}>
                            <i className="fas fa-envelope"></i>
                            <h2 className="text-gray-700 text-xs">{estudiante.email}</h2>
                        </div>
                    )
                }
                {
                    (estudiante.user_name) && (
                        <h2 className="font-bold">{estudiante.user_name}</h2>
                    )
                }
            </button>
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

export default Student;