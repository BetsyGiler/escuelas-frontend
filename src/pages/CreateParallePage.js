import React from 'react';

class CreateParallelPage extends React.Component{

    state = {
        form: {
            periodo: '',
            letter: '',
            level: '',
            course_id: this.props.match.params.id,
            professor_id: '',
            students: []
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
            console.log(`${process.env.REACT_APP_BACKEND}/courses/${this.props.match.params.id}/parallels`)

            const response = await fetch(`${process.env.REACT_APP_BACKEND}/courses/${this.props.match.params.id}/parallels`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.userToken
                },
                method: 'POST',
                body: JSON.stringify(this.state.form),
            })

            const data = await response.json();

            if(data.success){
                alert('Se ingresó el paralelo correctamente.')
                this.props.history.push(`/admin/cursos/${this.props.match.params.id}`)
            } else {
                this.setState({ cargando: false, error: 'No se pudo ingresar el curso.'})
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
                    <h2 className="font-bold text-2xl my-3">Crear paralelo</h2>
                    <h3 className="px-2">Agrega un nuevo paralelo</h3>
                    <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="text" name="periodo" placeholder="Periodo" onChange={this.handleChange} value={this.state.form.periodo} required/>
                    <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="text" name="letter" placeholder="Letra del paralelo" onChange={this.handleChange} value={this.state.form.letter} required/>
                    <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="number" min="1" max="10" name="level" placeholder="Nivel del paralelo" onChange={this.handleChange} value={this.state.form.level} required/>
                    <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="text" name="professor_id" placeholder="ID del profesor" onChange={this.handleChange} value={this.state.form.professor_id} required/>
                    <button className="bg-blue-600 text-white font-bold text-xl my-4 p-1 rounded-lg">
                        Registrar
                    </button>
                </form>
            </div>
        )

    }

}

export default CreateParallelPage;