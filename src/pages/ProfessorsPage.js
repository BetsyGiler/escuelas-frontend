import React from 'react';
import { Link } from 'react-router-dom';

import Professor from '../components/Professor';
import Loader from '../components/Loader';

class ProfessorsPage extends React.Component{

    state = {
        profesores: [],
        cargando: false,
        error: ''
    }

    async componentDidMount (){

        this.setState({ cargando : true, error: '' })
        try{

            const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/professors`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.userToken
                }
            });

            const { data } = await response.json();

            this.setState({
                profesores: data,
                cargando: false
            })

        } catch (error){
            this.setState({ cargando : false, error: error.message })
            console.log(error)
        }

    }

    mostrarProfesores = () => {
        
        if (!this.state.profesores)
            return <div>No se pueden visualizar la lista de profesores.</div>

        if (this.state.profesores.length == 0)
            return <div>No se pueden visualizar la lista de profesores.</div>

        return this.state.profesores.map( (profesor, i) => (
            <Professor key={i} profesor={profesor} position={i} />
        ))
    }
    render(){
        return (
            <div className="flex-1 flex flex-col bg-gray-200">
                {
                    (this.state.cargando) && (
                        <Loader />
                    )
                }
                <div className="flex flex-row items-end">
                    <div>
                        <h2 className="my-4 font-bold text-2xl ml-4">
                            Profesores
                        </h2>
                        <h4 className="ml-6 text-gray-700 text-xl">
                            Aqui hay un listado de profesores
                        </h4>
                    </div>
                    <div className="w-64 ml-4 flex flex-row justify-center">
                        <Link to="/admin/profesores/nuevo" className="text-white bg-blue-500 hover:bg-blue-400 p-2 rounded-full font-semibold">Registrar nuevo profesor <i className="fas fa-plus-circle mx-2"></i></Link>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap mt-4 ml-6">
                    {
                        this.mostrarProfesores()
                    }
                </div>
            </div>
        )
    }

}

export default ProfessorsPage;