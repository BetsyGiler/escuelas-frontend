import React from 'react';
import { Link } from 'react-router-dom';

import Student from '../components/Student';
import Loader from '../components/Loader';

class StudentsPage extends React.Component{

    state = {
        estudiantes: [],
        cargando: false,
        error: ''
    }

    cargarEstudiantes = async () => {

        this.setState({ cargando : true, error: '' })
        try{

            const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/students`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.userToken
                }
            });

            const { data } = await response.json();

            this.setState({
                estudiantes: data,
                cargando: false
            })

        } catch (error){
            this.setState({ cargando : false, error: error.message })
            console.log(error)
        }

    }

    eliminarEstudiante = async (student_id) => {

        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/delete/${student_id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.userToken
                },
                method: 'DELETE'
            });

            const { success, message, error } = await response.json();

            if (success){
                alert('El estudiante ha sido eliminado.')
                this.cargarEstudiantes()
            } else {
                if(error.message)
                    alert('No se pudo eliminar el estudiante: '+error.message)
                else
                    alert('No se pudo eliminar el estudiante')
            }


        } catch (error){
            alert('Ocurrió un error')
            console.log(error)
        }

    }

    componentDidMount (){

        this.cargarEstudiantes()    

    }

    mostrarEstudiantes = () => {
        
        return this.state.estudiantes.map( (estudiante, i) => (
            <Student key={i} estudiante={estudiante} position={i} eliminar={this.eliminarEstudiante}/>
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
                            Estudiantes
                        </h2>
                        <h4 className="ml-6 text-gray-700 text-xl">
                            Aqui hay un listado de estudiantes
                        </h4>
                    </div>
                    <div className="w-64 ml-4 flex flex-row justify-center">
                        {
                            (JSON.parse(localStorage.userInfo).role === 'ADMIN') &&
                            <Link to="/admin/estudiantes/nuevo" className="text-white bg-blue-500 hover:bg-blue-400 p-2 rounded-full font-semibold">Registrar nuevo estudiante <i className="fas fa-plus-circle mx-2"></i></Link>
                        }
                    </div>
                </div>
                <div className="flex flex-row flex-wrap mt-4 ml-6">
                    {
                        this.mostrarEstudiantes()
                    }
                </div>
            </div>
        )
    }

}

export default StudentsPage;