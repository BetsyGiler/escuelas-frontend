import React from 'react';
import ReactDOM from 'react-dom';

import LoaderSpinner from 'react-loader-spinner'

const Loader = props => {

    const child = (
        <div className="absolute flex flex-col justify-center items-center h-screen w-screen top-0">
            <LoaderSpinner
                type="Grid"
                color="#27a3cc99"
                height={50}
                width={50}
                timeout={10000} //3 secs
            />
        </div>
    );

    const parent = document.getElementById('modal');

    return (
        ReactDOM.createPortal(child, parent)
    );

}

export default Loader;