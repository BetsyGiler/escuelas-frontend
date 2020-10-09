import React from 'react';

class ProfilePage extends React.Component{

    state = {
        usuario: JSON.parse(localStorage.userInfo)
    }

    render(){

        const { usuario } = this.state;

        return (
            <div className="flex-1 flex flex-col bg-gray-200">
                <div className="flex flex-row items-end">
                    <div>
                        <h2 className="my-4 font-bold text-2xl ml-4">
                            Mi perfil
                        </h2>
                        <h4 className="ml-6 text-gray-700 text-xl">
                            Información del usuario
                        </h4>
                    </div>
                </div>
                <div className="flex flex-col flex-wrap mt-4 ml-6 bg-white p-4 w-1/2 rounded-lg shadow">
                    <h2 className="font-bold text-2xl my-4">
                        {usuario.role}
                    </h2>
                    <h2>
                        <span className="font-semibold">Cédula: </span>{usuario.identification}
                    </h2>
                    <h2>
                        <span className="font-semibold">Nombre completo: </span>{usuario.name} {usuario.last_name}
                    </h2>
                    <h2>
                        <span className="font-semibold">Fecha de nacimiento: </span>{usuario.born.split('T')[0]}
                    </h2>
                    <h2>
                        <span className="font-semibold">Nombre completo: </span>{usuario.name} {usuario.last_name}
                    </h2>
                    <h2>
                        <span className="font-semibold">Teléfono: </span>{usuario.cellphone}
                    </h2>
                    <h2>
                        <span className="font-semibold">Correo electrónico: </span>{usuario.email}
                    </h2>
                </div>
            </div>
        )
    }

}

export default ProfilePage;