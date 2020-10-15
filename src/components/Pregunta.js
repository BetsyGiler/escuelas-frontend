import React from 'react';
import ReactDOM from 'react-dom';

const Pregunta = props => {

    const child = (
        <div className="fixed flex flex-col justify-center items-center h-screen w-screen top-0 bg-black bg-opacity-25">
            <div className="h-32 w-64 bg-white flex flex-col justify-around p-3 box-content rounded-lg">
                <p className="p-1 text-center font-bold">
                    {props.mensaje}
                </p>
                <div className="flex flex-row justify-around">
                    <button className="bg-red-600 w-24 rounded-lg font-semibold text-white" onClick={props.accionSi}>Si</button>
                    <button className="bg-blue-600 w-24 rounded-lg font-semibold text-white" onClick={props.accionNo}>No</button>
                </div>
            </div>
        </div>
    );

    const parent = document.getElementById('modal');

    return (
        ReactDOM.createPortal(child, parent)
    );

}

export default Pregunta;