import React from 'react';

import Loader from '../components/Loader';

class CreateCourse extends React.Component{

    state = {
        form: {
            name: ''
        },
        cargando: false,
        error: ''
    }

    handleChange = (e) => {

        this.setState({
            form: {
                ...this.state.form,
                [e.target.name] : e.target.value
            }
        })
    }

    handleSubmit = async e => {

        e.preventDefault()

        console.log(this.state.form.parallels)

        try{

            this.setState({
                cargando: true
            })

            let metodo, idCurso, mensaje;

            if(this.props.match.params.id){
                metodo = 'PUT';
                idCurso = `/${this.props.match.params.id}`;
                mensaje = 'modificó'
            } else {
                metodo = 'POST';
                idCurso = '';
                mensaje = 'ingresó'
            }

            const response = await fetch(`${process.env.REACT_APP_BACKEND}/courses${idCurso}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.userToken
                },
                method: metodo,
                body: JSON.stringify(this.state.form),
            })

            const data = await response.json();

            if(data.success){
                alert(`Se ${mensaje} el curso correctamente.`)
                this.props.history.goBack()
            } else {
                this.setState({ cargando: false, error: 'No se pudo concretar la petición.'})
                alert(this.state.error)
            }

        } catch(error){
            console.log(error)
            this.setState({
                error: error.message,
                cargando: false
            })
            alert('Ocurrió un error inesperado: '+this.state.error)
        }
    }

    render(){
        
        const verbo = (this.props.match.params.id)? 'Modificar' : 'Crear';

        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                {
                    (this.state.cargando) && (
                        <Loader />
                    )
                }
                <form onSubmit={this.handleSubmit} autoComplete="off" className="flex flex-col bg-white p-4 pb-2 w-1/2 text-gray-800">
                    <h2 className="font-bold text-2xl my-3">{verbo} curso</h2>
                    <h3 className="px-2">{verbo} un nuevo curso</h3>
                    <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="text" name="name" placeholder="Nombre del curso" onChange={this.handleChange} value={this.state.form.name} required/>
                    {/* <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="number" name="paralelos" placeholder="Numero de paralelos" onChange={this.handleParallels} min="1" required/> */}
                    <button className="bg-blue-600 text-white font-bold text-xl my-4 p-1 rounded-lg">
                        Registrar
                    </button>
                </form>
            </div>
        )

    }

}

export default CreateCourse;