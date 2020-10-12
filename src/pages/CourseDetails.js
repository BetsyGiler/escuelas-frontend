import React from 'react';
import { Link } from 'react-router-dom';

import Course from '../components/Course';
import Parallel from '../components/Parallel';

class CourseDetails extends React.Component{

    state = {
        curso: null,
        parallels: [],
        cargando: false,
        error: ''
    }

    async componentDidMount (){

        this.setState({ cargando : false, error: '' })
        try{


            //Pedimos los datos del curso
            const responseCourse = await fetch(`${process.env.REACT_APP_BACKEND}/courses/${this.props.match.params.id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.userToken
                }
            });

            const courseData = await responseCourse.json();

            this.setState({
                curso: courseData.data,
                cargando: false
            })

            //Pedimos los paralelos del curso
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/courses/${this.props.match.params.id}/parallels`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.userToken
                }
            });

            const { data } = await response.json();

            this.setState({
                parallels: data,
                cargando: false
            })

        } catch (error){
            this.setState({ cargando : false, error: error.message })
            console.log(error)
        }

    }

    mostrarNombreCurso = () => {

        if (!this.state.curso)
            return 'Cargando...';
        else
            return this.state.curso.name;

    } 
    mostrarParalelos = () => {

        if (this.state.parallels.length === 0)
            return <div>No hay paralelos registrados.</div>

        return this.state.parallels.map( (paralelo, i) => {
            console.log(paralelo)
            return <Parallel key={i} paralelo={paralelo} position={i} />
        }
        )

    }

    render(){

        return (
            <div className="flex-1 flex flex-col bg-gray-200">
                <div className="flex flex-row items-end">
                    <div>
                        <h2 className="my-4 font-bold text-2xl ml-4">
                            Curso de {this.mostrarNombreCurso()}
                        </h2>
                        <h4 className="ml-6 text-gray-700 text-xl">
                            Aqui hay un listado de los paralelos
                        </h4>
                    </div>
                    <div className="w-64 flex flex-row justify-center">
                        <Link to={`/admin/cursos/${this.props.match.params.id}/nuevoParalelo`} className="text-white bg-blue-500 hover:bg-blue-400 p-2 rounded-full font-semibold">Crear nuevo paralelo <i className="fas fa-plus-circle mx-2"></i></Link>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap mt-4 ml-6">
                    {
                        this.mostrarParalelos()
                    }
                </div>
            </div>
        )

    }

}

export default CourseDetails;