import React from 'react';
import { Link } from 'react-router-dom';

const Course = props => {

    const curso = props.curso;
    const position = props.position


    return (
        <Link to={`/admin/cursos/${curso._id}`} className="mx-4 my-3">
            <div className="flex flex-col h-64 w-48 justify-center items-center bg-white shadow-md">
                <i className={`fas fa-book text-2xl text-${getRandomColor(position)}-500 bg-${getRandomColor(position)}-200 p-3 mb-2 rounded-lg`}></i>
                <h2 className="text-center font-bold mb-3 text-wrap px-2">{curso.name}</h2>
            </div>
        </Link>
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