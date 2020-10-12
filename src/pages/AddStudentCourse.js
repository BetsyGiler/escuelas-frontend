import React from 'react';

class AddStudentCourse extends React.Component{

    state = {
        form: {
            id_parallel: this.props.match.params.id,
            id_student: '',
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

        try{

            this.setState({
                cargando: true
            })

            console.log('formulario', this.state.form)

            const response = await fetch(`${process.env.REACT_APP_BACKEND}/courses/student`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.userToken
                },
                method: 'POST',
                body: JSON.stringify(this.state.form),
            })

            const data = await response.json();

            if(data.success){
                alert('Se matriculó el estudiante correctamente.')
                this.props.history.goBack()
            } else {
                this.setState({ cargando: false, error: 'No se pudo matricular el estudiante.'})
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
        
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <form onSubmit={this.handleSubmit} autoComplete="off" className="flex flex-col bg-white p-4 pb-2 w-1/2 text-gray-800">
                    <h2 className="font-bold text-2xl my-3">Matricular estudiante en el paralelo</h2>
                    <h3 className="px-2">Matricular estudiante</h3>
                    <div className="flex flex-row">
                        <input className="w-3/4 text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="text" name="id_student" placeholder="ID del estudiante" onChange={this.handleChange} value={this.state.form.id_student} required/>
                        <a className="flex-1 text-center p-2 m-2 bg-green-500 text-white rounded-lg font-bold box-content" href="/admin/estudiantes" target="_blank">Ver estudiantes</a>
                    </div>
                    <button className="bg-blue-600 text-white font-bold text-xl my-4 p-1 rounded-lg">
                        Registrar
                    </button>
                </form>
            </div>
        )

    }

}

export default AddStudentCourse;