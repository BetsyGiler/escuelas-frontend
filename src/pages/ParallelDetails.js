import React from 'react';
import { Link } from 'react-router-dom';

import Student from '../components/Student';
import Loader from '../components/Loader';

class ParallelDetails extends React.Component{

    state = {
        paralelo: null,
        cargando: false,
        error: ''
    }

    cargarParalelo = async () => {

        this.setState({ cargando : true, error: '' })
        try{

            const response = await fetch(`${process.env.REACT_APP_BACKEND}/parallels/${this.props.match.params.id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.userToken
                }
            });

            const { data } = await response.json();

            this.setState({
                paralelo: data,
                cargando: false
            })

        } catch (error){
            this.setState({ cargando : false, error: error.message })
            console.log(error)
        }

    }

    eliminarEstudiante = async (student_id) => {

        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/parallels/${this.props.match.params.id}/student?student_id=${student_id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.userToken
                },
                method: 'DELETE'
            });

            const { success, message, error } = await response.json();

            if (success){
                alert('El estudiante ha sido eliminado.')
                this.cargarParalelo()
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

        this.cargarParalelo()

    }

    mostrarInfoParalelo = () => {

        const { paralelo } = this.state;

        if (!paralelo)
            return <div>Cargando...</div>

        return (
            <div>
                <h2 className="my-4 font-bold text-2xl ml-4">
                    Paralelo "{paralelo.letter}"
                </h2>
                <h2 className="ml-5 font-semibold text-gray-700 my-1">
                    Profesor/a: {`${paralelo.professor.name} ${paralelo.professor.last_name}`}
                </h2>
                <h2 className="ml-5 font-semibold text-gray-700 my-1">
                    Nivel: {`${paralelo.level}º`}
                </h2>
                <h2 className="ml-5 font-semibold text-gray-700 my-1">
                    Periodo: {`${paralelo.periodo}`}
                </h2>
            </div>
        )
    }

    mostrarEstudiantes = () => {

        if(!this.state.paralelo)
            return <div>Cargando ...</div>

        if (this.state.paralelo.students.length === 0)
            return <div>No hay estudiantes matriculados.</div>

        return this.state.paralelo.students.map( (student, i) => {
            console.log(student)
            return <Student key={i} estudiante={student} position={i} eliminar={this.eliminarEstudiante}/>
        }
        )

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
                        {
                            this.mostrarInfoParalelo()
                        }
                        <h4 className="ml-6 text-gray-700 text-xl">
                            Aqui hay un listado de los estudiantes matriculados en este paralelo
                        </h4>
                    </div>
                    <div className="w-64 flex flex-row justify-center">
                        {
                            (JSON.parse(localStorage.userInfo).role === 'ADMIN') &&
                            <Link to={`/admin/paralelo/${this.props.match.params.id}/matricular`} className="text-white bg-blue-500 hover:bg-blue-400 p-2 rounded-full font-semibold">Matricular estudiante <i className="fas fa-plus-circle mx-2"></i></Link>
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

export default ParallelDetails;