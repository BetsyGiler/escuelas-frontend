import React from 'react';

import Loader from '../components/Loader';

class CreateProfessor extends React.Component{

    state = {
        form: {
            name: '',
            last_name: '',
            born: '',
            identification: '',
            role: 'PROFESSOR',
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

    componentDidMount(){
        this.cargarProfesor()
    }

    cargarProfesor = async () => {

        this.setState({ cargando : true, error: '' })

        try{

            const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/data/${this.props.match.params.id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.userToken
                }
            });

            const { data } = await response.json();

            const { name, last_name, born, identification, user_name, email, cellphone } = data;

            this.setState({
                form: {
                    ...this.state.form,
                    name,
                    last_name,
                    born: born.split('T')[0],
                    identification,
                    user_name,
                    email,
                    cellphone
                },
                cargando: false
            })

        } catch (error){
            this.setState({ cargando : false, error: error.message })
            console.log(error)
        }

    }

    handleSubmit = async e => {

        e.preventDefault()

        try{

            this.setState({
                cargando: true
            })

            let metodo, idUser, mensaje;

            if(this.props.match.params.id){
                metodo = 'PUT';
                idUser = `/update/${this.props.match.params.id}`;
                mensaje = 'modificó'
            } else {
                metodo = 'POST';
                idUser = '/signup';
                mensaje = 'ingresó'
            }

            const response = await fetch(`${process.env.REACT_APP_BACKEND}/user${idUser}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.userToken
                },
                method: metodo,
                body: JSON.stringify(this.state.form),
            })

            const data = await response.json();

            if(data.success){
                alert(`Se ${mensaje} el profesor correctamente.`)
                this.props.history.goBack()
            } else {
                this.setState({ cargando: false, error: `No se pudo procesar la solicitud.`})
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
                {
                    (this.state.cargando) && (
                        <Loader />
                    )
                }
                <form onSubmit={this.handleSubmit} autoComplete="off" className="flex flex-col bg-white p-4 pb-2 w-1/2 text-gray-800">
                    <h2 className="font-bold text-2xl my-3">Registrar profesor</h2>
                    <h3 className="px-2">Agregar un nuevo profesor</h3>
                    <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="text" name="identification" placeholder="Cédula" onChange={this.handleChange} value={this.state.form.identification} required/>     
                    <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="text" name="name" placeholder="Nombre del profesor" onChange={this.handleChange} value={this.state.form.name} required/>
                    <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="text" name="last_name" placeholder="Apellido del profesor" onChange={this.handleChange} value={this.state.form.last_name} required/>
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

export default CreateProfessor;