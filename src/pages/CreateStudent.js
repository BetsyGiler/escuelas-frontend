import React from 'react';

class CreateStudent extends React.Component{

    state = {
        form: {
            name: '',
            last_name: '',
            born: '',
            identification: '',
            role: 'STUDENT',
            user_name: '',
            email: '',
            password: ''
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

            const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/signup`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.userToken
                },
                method: 'POST',
                body: JSON.stringify(this.state.form),
            })

            const data = await response.json();

            if(data.success){
                alert('Se ingresó el estudiante correctamente.')
                this.props.history.push('/admin/estudiantes')
            } else {
                this.setState({ cargando: false, error: 'No se pudo ingresar el estudiante.'})
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
                    <h2 className="font-bold text-2xl my-3">Registrar estudiante</h2>
                    <h3 className="px-2">Agregar un nuevo estudiante</h3>
                    <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="text" name="identification" placeholder="Cédula" onChange={this.handleChange} value={this.state.form.identification} required/>     
                    <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="text" name="name" placeholder="Nombre del estudiante" onChange={this.handleChange} value={this.state.form.name} required/>
                    <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="text" name="last_name" placeholder="Apellido del estudiante" onChange={this.handleChange} value={this.state.form.last_name} required/>
                    <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="date" name="born" placeholder="Fecha de nacimiento" onChange={this.handleChange} value={this.state.form.born} required pattern="\d{10}" title="Debe tener 10 dígitos"/>
                    <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="text" name="user_name" placeholder="Nombre de usuario" onChange={this.handleChange} value={this.state.form.user_name} required pattern=".{5,}" title="Debe tener un mínimo de 5 caracteres"/>
                    <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="email" name="email" placeholder="Correo electrónico" onChange={this.handleChange} value={this.state.form.email} required/>
                    <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="password" name="password" placeholder="Contraseña" onChange={this.handleChange} value={this.state.form.password} required/>
                    <button className="bg-blue-600 text-white font-bold text-xl my-4 p-1 rounded-lg">
                        Registrar
                    </button>
                </form>
            </div>
        )

    }

}

export default CreateStudent;