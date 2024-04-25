
import React from 'react';

const socialIcons = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A9.004 9.004 0 0012 3C6.477 3 2 7.477 2 13s4.477 10 10 10c4.962 0 9.048-3.622 9.87-8.446m0 0a1.993 1.993 0 00-.87-2.108 1.99 1.99 0 00-2.094-.192m3.834 2.74c.014-.26.01-.522-.012-.782m-10.828-6.362v0a4.002 4.002 0 00-6.826 2.195m0 0A3.978 3.978 0 015.5 12.75c0 .59.13 1.153.36 1.655m-.36-1.655a9.037 9.037 0 014.098-2.098m6.33-3.464c.042.26.064.526.064.797 0 1.306-.634 2.47-1.622 3.197"></path>
            </svg>
        ),
        link: '#'
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c4.97 0 9 3.582 9 8s-4.03 8-9 8c-4.97 0-9-3.582-9-8s4.03-8 9-8zm0 0V1.5m0 16.5V21m9-9h1.5m-16.5 0H3m16.485-5.485l1.06-1.06m-17.01 12.12l-1.06 1.06m0-12.12l-1.06-1.06m17.01 12.12l1.06 1.06"></path>
            </svg>
        ),
        link: '#'
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c4.97 0 9 3.582 9 8s-4.03 8-9 8c-4.97 0-9-3.582-9-8s4.03-8 9-8zm0 0V1.5m0 16.5V21m9-9h1.5m-16.5 0H3m16.485-5.485l1.06-1.06m-17.01 12.12l-1.06 1.06m0-12.12l-1.06-1.06m17.01 12.12l1.06 1.06"></path>
            </svg>
        ),
        link: '#'
    }
];

const paymentMethods = [
    'https://placehold.co/50x30',
    'https://placehold.co/50x30',
    'https://placehold.co/50x30',
    'https://placehold.co/50x30'
];

const SharedClasses = {
    textZinc600: 'text-zinc-600',
    hoverTextZinc800: 'hover:text-zinc-800',
    borderZinc300: 'border-zinc-300',
    textZinc500: 'text-zinc-500'
};

const Footer = () => {
    return (
        <div className="bg-white text-zinc-600">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">VENTA DE COMPONENTES ELECTRONICOS</h2>
                        <p className="text-4xl font-bold my-2">(025) xxx 25 16</p>
                        <p>Encarnación - Paraguay</p>
                        <p>encorto@gmail.com</p>
                    </div>
                    <div className="flex space-x-4 mt-4 lg:mt-0">
                        {socialIcons.map((socialIcon, index) => (
                            <a key={index} href={socialIcon.link} className={SharedClasses.textZinc600 + ' ' + SharedClasses.hoverTextZinc800}>
                                {socialIcon.icon}
                            </a>
                        ))}
                    </div>
                </div>
                <div className={SharedClasses.borderZinc300 + ' my-4'}></div>
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <p className={SharedClasses.textZinc500}>© 2024 EncortoPy. All Rights Reserved</p>
                    <div className="flex space-x-4">
                        {paymentMethods.map((method, index) => (
                            <img key={index} src={method} alt="Payment Method" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
