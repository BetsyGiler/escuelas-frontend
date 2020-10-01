import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {

    state = {
        form: {
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

            const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/login`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify(this.state.form),
            })

            const data = await response.json();

            if(data.success){
                localStorage.setItem('userToken', data.token);
                localStorage.setItem('userInfo', JSON.stringify(data.user))
                this.setState({ cargando: false })
            } else {
                alert("Datos incorrectos")
                this.setState({
                    form: {
                        email: '',
                        password: ''
                    },
                    cargando: false
                })
            }

        } catch(error){
            console.log(error)
            this.setState({
                error: error.message
            })
        }
    }

    render(){

        if(localStorage.userInfo){
            return <Redirect to="/"/>
        }

        return (
            <div className="flex flex-1 bg-gray-200">
                <div className="container mx-auto flex flex-col items-center flex-1">
                    <div className="flex flex-row bg-red-300 mt-40 w-1/2 shadow-xl">
                        <form onSubmit={this.handleSubmit} autoComplete="off" className="flex flex-col bg-white p-4 pb-2 w-1/2 text-gray-800">
                            <h2 className="font-bold text-2xl my-3">Login</h2>
                            <h3 className="px-2">Inicia sesión en tu cuenta</h3>
                            <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="text" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.form.email}/>
                            <input className="text-gray-900 p-2 my-2 border-b-2 placeholder-gray-600" type="password" name="password" placeholder="Contraseña" onChange={this.handleChange} value={this.state.form.password}/>
                            <button className="bg-blue-600 text-white font-bold text-xl my-4 p-1 rounded-lg">
                                Iniciar sesión
                            </button>
                        </form>
                        <div className="w-64 text-white">
                            <h2 className="text-4xl text-center my-5">Bienvenido</h2>
                            <p className="p-4 h-48 overflow-hidden">
                                Proident ipsum voluptate ea pariatur incididunt eu eiusmod eiusmod cupidatat. Elit aliquip cillum aliquip sunt. 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}

export default Login;