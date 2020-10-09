import React from 'react';
import { Link } from 'react-router-dom';

import Student from '../components/Student';

class ParallelDetails extends React.Component{

    state = {
        students: [],
        cargando: false,
        error: ''
    }

    async componentDidMount (){

        this.setState({ cargando : false, error: '' })
        try{

            const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/students`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.userToken
                }
            });

            const { data } = await response.json();

            // const newData = data.filter(  )

            this.setState({
                students: data,
                cargando: false
            })

        } catch (error){
            this.setState({ cargando : false, error: error.message })
            console.log(error)
        }

    }

    mostrarEstudiantes = () => {

        if (this.state.students.length === 0)
            return <div>No hay estudiantes matriculados.</div>

        return this.state.students.map( (student, i) => {
            console.log(student)
            return <Student key={i} estudiante={student} position={i} />
        }
        )

    }

    render(){

        return (
            <div className="flex-1 flex flex-col bg-gray-200">
                <div className="flex flex-row items-end">
                    <div>
                        <h2 className="my-4 font-bold text-2xl ml-4">
                            Paralelo {this.props.match.params.id}
                        </h2>
                        <h4 className="ml-6 text-gray-700 text-xl">
                            Aqui hay un listado de los estudiantes matriculados en este paralelo
                        </h4>
                    </div>
                    <div className="w-64 flex flex-row justify-center">
                        <Link to={`/admin/paralelo/${this.props.match.params.id}/matricular`} className="text-white bg-blue-500 hover:bg-blue-400 p-2 rounded-full font-semibold">Matricular estudiante <i className="fas fa-plus-circle mx-2"></i></Link>
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