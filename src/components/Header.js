import React from 'react';
import { Link } from 'react-router-dom'

class Header extends React.Component{

    mostrarLogin = () => {
        
        if (localStorage.userInfo)
            return (
                <div className="flex flex-row justify-between">
                    <Link to="/admin">
                        Panel de administración
                    </Link>
                    
                    <div className="cursor-pointer hover:text-gray-400" 
                        onClick={() => {
                            localStorage.removeItem("userToken")
                            localStorage.removeItem("userInfo")
                            window.location = '/'
                        }}
                    >
                        <h2 className="mx-4">Cerrar sesión</h2>
                    </div>
                </div>
            )

        return (
            <div className="flex flex-row justify-between">
                <Link to="/login">
                    <h2 className="mx-4">Iniciar sesión</h2>
                </Link>
                <h2>Registrarse</h2>
            </div>
        )

    }

    render(){

        return (
            <header className="flex flex-row justify-between items-center bg-custom-color-2 p-4 text-white">
                <Link to="/">
                    <h1 className="text-2xl font-semibold"><i className="fab fa-uncharted px-2"></i> Symmetry</h1>
                </Link>
                {
                    this.mostrarLogin()
                }
            </header>
        )

    }

}

export default Header;