import React from 'react';

class CreateCourse extends React.Component{

    state = {
        form: {
            name: '',
            parallels : []
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

    handleParallels = (e) => {

        const A_VALUE = 65;

        let paralelos = [];

        for(let i=A_VALUE; i < A_VALUE + parseInt(e.target.value) ; i++){
            paralelos.push({'paralelo': String.fromCharCode(i)})
        }

        this.setState({
            form: {
                ...this.state.form,
                parallels : paralelos
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

            console.log('formulario', this.state.form)

            const response = await fetch(`${process.env.REACT_APP_BACKEND}/courses`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.userToken
                },
                method: 'POST',
                body: JSON.stringify(this.state.form),
            })

            const data = await response.json();

            if(data.success){
                alert('Se ingresó el curso correctamente.')
                this.props.history.push('/admin/cursos')
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
                    <h2 className="font-bold text-2xl my-3">Crear curso</h2>
                    <h3 className="px-2">Agrega un nuevo curso y sus paralelos</h3>
                    <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="text" name="name" placeholder="Nombre del curso" onChange={this.handleChange} value={this.state.form.name} required/>
                    <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="number" name="paralelos" placeholder="Numero de paralelos" onChange={this.handleParallels} min="1" required/>
                    <button className="bg-blue-600 text-white font-bold text-xl my-4 p-1 rounded-lg">
                        Registrar
                    </button>
                </form>
            </div>
        )

    }

}

export default CreateCourse;