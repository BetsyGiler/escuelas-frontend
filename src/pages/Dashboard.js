import React from 'react';

class Dashboard extends React.Component{

    render(){

        return (
            <div className="flex-1">
                <div className="container mx-auto p-2">
                    <h2 className="font-bold text-xl">Sobre esta página</h2>
                    <p>
                        Esse quis cillum in consequat do magna officia Lorem consectetur sit labore aliqua officia. Sunt consectetur mollit dolore amet irure ut fugiat reprehenderit do Lorem ex est. Anim minim sunt velit proident consequat pariatur. Nisi ad irure culpa consectetur mollit velit cupidatat. Deserunt consequat ex reprehenderit nulla ad veniam minim tempor est. Aliqua Lorem et eiusmod voluptate irure labore amet id laboris culpa enim non culpa. Pariatur veniam magna tempor laboris do aute quis in culpa minim reprehenderit pariatur veniam ullamco.
                    </p>
                    <figure className="flex flex-row justify-center bg-gray-400 p-4">
                        <img className="w-64" src="https://backend.owacstore.com/storage/Destornilladorconbateria3.6V191091111407122015316517621348.jpg" alt="una imagen" />
                    </figure>
                </div>
            </div>
        )

    }

}

export default Dashboard;