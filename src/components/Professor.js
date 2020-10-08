import React from 'react';

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
        <button onClick={copiarId} className="mx-4 my-3">
            <div className="flex flex-col h-64 w-48 justify-center items-center bg-white shadow-md hover:bg-gray-200">
                <i className={`fas fa-chalkboard-teacher text-2xl text-${getRandomColor(position)}-500 bg-${getRandomColor(position)}-200 p-3 mb-2 rounded-lg`}></i>
                <h2 className="text-center font-bold mb-1 text-wrap px-2">{profesor.name} {profesor.last_name}</h2>
                <h2 className="text-gray-700 text-xs m-0">{profesor.born.split('T')[0]}</h2>
                <div className={`m-2 text-${getRandomColor(position)}-500`}>
                    <i className="fas fa-envelope"></i>
                    <h2 className="text-gray-700 text-xs">{profesor.email}</h2>
                </div>
                <h2 className="font-bold">{profesor.user_name}</h2>
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

export default Professor;