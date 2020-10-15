import React from 'react';
import Footer from '../components/Footer';
import Pregunta from '../components/Pregunta';

class Dashboard extends React.Component{

    state = {
        integrantes: [
            {
                nombre: 'Damian Chinga',
                foto: '/fotos/3.jpeg'
            },
            {
                nombre: 'Joel García',
                foto: '/fotos/1.jpeg'
            },
            {
                nombre: 'Betsy Giler',
                foto: '/fotos/betsy.jpeg'
            },
            {
                nombre: 'Jesus Zambrano',
                foto: '/fotos/2.jpeg'
            },
        ]
    }

    mostrarIntegrantes = () => {

        return this.state.integrantes.map( integrante => {

            return (
                <figure key={integrante.nombre} className="flex flex-col justify-center items-center my-3 mx-4">
                    <img className="w-64 h-64 object-cover rounded-lg" src={integrante.foto} alt={integrante.nombre} />
                    <h2 className="font-semibold text-blue-600 text-xl">{integrante.nombre}</h2>
                </figure>
            )

        })

    }

    render(){

        return (
            <div className="flex-1">
                <div className="container mx-auto p-2 min-h-screen">
                    <h2 className="font-bold text-xl">Sobre esta página</h2>
                    <p className="font-semibold text-gray-600 mb-4">
                        Esta aplicación permite la gestión de centros educativos en un entorno en la nube.
                    </p>
                    <div>
                        <h2 className="font-semibold text-xl text-center">Integrantes del grupo</h2>
                        <div className="flex flex-row flex-wrap justify-around">
                            {
                                this.mostrarIntegrantes()
                            }
                        </div>
                    </div>
                    <h2 className="font-bold text-xl">Dirección</h2>
                    <div className="flex flex-row justify-center my-4">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5641.5153792954015!2d-80.45413195874787!3d-1.0457490780408718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sec!4v1602024735935!5m2!1ses!2sec" width="600" height="450" frameBorder="0" style={{ border: 0, height: '400px' }} allowFullScreen="" aria-hidden="false" tabIndex="0" title="mapa"></iframe>
                    </div>
                </div>
                <Footer />
            </div>
        )

    }

}

export default Dashboard;