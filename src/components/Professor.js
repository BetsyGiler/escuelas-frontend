import React from 'react';
import { Link } from 'react-router-dom';

const Professor = props => {

    const profesor = props.profesor;
    const position = props.position

    const copiarId = () => {

        const elem = document.createElement('textarea');
        elem.value = profesor._id;
        document.body.appendChild(elem);
        elem.select();
        document.execCommand('copy');
        document.body.removeChild(elem);

        alert('ID del profesor copiado')

    }

    return (
        <div className="relative mx-4 my-3">
            <Link to={`/admin/profesores/${profesor._id}/modificar`} className="absolute top-0 left-0 m-2 text-gray-400 hover:text-green-600">
                <i className="fas fa-pencil-alt"></i>
            </Link>
            <button onClick={copiarId} className="flex flex-col h-64 w-48 justify-center items-center bg-white shadow-md hover:bg-gray-200">
                <i className={`fas fa-chalkboard-teacher text-2xl text-${getRandomColor(position)}-500 bg-${getRandomColor(position)}-200 p-3 mb-2 rounded-lg`}></i>
                <h2 className="text-center font-bold mb-1 text-wrap px-2">{profesor.name} {profesor.last_name}</h2>
                <h2 className="text-gray-700 text-xs m-0">{profesor.born.split('T')[0]}</h2>
                <div className={`m-2 text-${getRandomColor(position)}-500`}>
                    <i className="fas fa-envelope"></i>
                    <h2 className="text-gray-700 text-xs">{profesor.email}</h2>
                </div>
                <h2 className="font-bold">{profesor.user_name}</h2>
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

export default Professor;