import React from 'react';

import Header from '../components/Header';

const Standard = (props) => {
    return (
        <div>
            <Header/>
            <div className="min-h-screen flex flex-col">
                {
                    props.children
                }
            </div>
        </div>
    );
}

export default Standard