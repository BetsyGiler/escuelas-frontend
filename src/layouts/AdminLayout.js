import React from 'react';

import Header from '../components/Header';
import SideBar from '../components/SideBar';

const AdminLayout = (props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <div className="flex-1 flex flex-row bg-gray-200">
                <SideBar />
                {
                    props.children
                }
            </div>
        </div>
    );
}

export default AdminLayout