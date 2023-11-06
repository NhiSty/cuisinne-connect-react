import React from 'react';

const NotFoundPage = () => {
    const errorStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
    };

    const h1Style = {
        fontSize: '2em',
        color: '#333',
    };

    const pStyle = {
        fontSize: '1.2em',
        color: '#666',
    };

    const linkStyle = {
        color: '#007BFF',
        textDecoration: 'underline',
    };

    return (
        <div style={errorStyle}>
            <h1 style={h1Style}>Erreur 404 - Page non trouvée</h1>
            <p style={pStyle}>
                Désolé, la page que vous recherchez est introuvable. Veuillez retourner à la <a style={linkStyle} href="/">page d'accueil</a>.
            </p>
        </div>
    );
};

export default NotFoundPage;
