import React from 'react';
import { Link } from 'react-router-dom';

import Course from '../components/Course';

class CoursesPage extends React.Component{

    state = {
        cursos: [],
        cargando: false,
        error: ''
    }

    async componentDidMount (){

        this.setState({ cargando : false, error: '' })
        try{

            const response = await fetch(`${process.env.REACT_APP_BACKEND}/courses`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.userToken
                }
            });

            const { data } = await response.json();

            this.setState({
                cursos: data,
                cargando: false
            })

        } catch (error){
            this.setState({ cargando : false, error: error.message })
            console.log(error)
        }

    }

    mostrarCursos = () => {

        return this.state.cursos.map( (curso, i) => (
            <Course key={i} curso={curso} position={i} />
        ))

    }

    render(){

        return (
            <div className="flex-1 flex flex-col bg-gray-200">
                <div className="flex flex-row items-end">
                    <div>
                        <h2 className="my-4 font-bold text-2xl ml-4">
                            Cursos
                        </h2>
                        <h4 className="ml-6 text-gray-700 text-xl">
                            Aqui hay un listado de cursos
                        </h4>
                    </div>
                    <div className="w-64 flex flex-row justify-center">
                        <Link to="/admin/cursos/nuevo" className="text-white bg-blue-500 hover:bg-blue-400 p-2 rounded-full font-semibold">Crear nuevo curso <i className="fas fa-plus-circle mx-2"></i></Link>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap mt-4 ml-6">
                    {
                        this.mostrarCursos()
                    }
                </div>
            </div>
        )

    }

}

export default CoursesPage;