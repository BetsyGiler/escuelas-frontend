import React from 'react';

class Footer extends React.Component{

    render(){
        return (
            <div>
            <div className="bg-custom-color-2 flex flex-col md:flex-row justify-around items-center p-16 text-white">
                <div id="contactos" className="font-bold">
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <h3><i className="fab fa-instagram"></i> Instagram</h3>
                    </a>
                    <a href={``} target="_blank" rel="noopener noreferrer">
                        <h3><i className="fab fa-whatsapp"></i> WhatsApp</h3>
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <h3><i className="fab fa-facebook-square"></i> Facebook</h3>
                    </a>
                </div>
                <div className="mt-8 md:mt-0">
                    <h3 className="font-semibold">Av. Universitaria y Che Guevara</h3>
                    <h3 className="text-center">2020</h3>
                </div>
            </div>
            </div>
        );
    }

}

export default Footer;