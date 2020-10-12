import React from 'react';
import { Link } from 'react-router-dom';

const Course = props => {

    const curso = props.curso;
    const position = props.position
    
    const eliminarCurso = async () => {
        

        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/courses/${curso._id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.userToken
                },
                method: 'DELETE'
            });

            const { success, message, error } = await response.json();

            if (success){
                alert(message)
                props.recargar()
            } else {
                if(error.message)
                    alert('No se pudo eliminar el curso: '+error.message)
                else
                    alert('No se pudo eliminar el curso')
            }


        } catch (error){
            alert('Ocurrió un error')
            console.log(error)
        }

    }

    return (
        <div className="relative mx-4 my-3">
            <i onClick={eliminarCurso} className="fas fa-times absolute top-0 right-0 m-2 text-gray-400 hover:text-red-600 cursor-pointer"></i>
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