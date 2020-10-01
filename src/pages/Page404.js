import React from 'react';

class Page404 extends React.Component{

    render(){

        return (
            <div className="h-screen w-screen text-center flex flex-col justify-center bg-custom-color-5">
                <h1 className="text-5xl text-white">
                    Error 404 <br/> Página no encontrada
                </h1>
            </div>
        )

    }

}

export default Page404;