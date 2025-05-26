function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <img
                src="../../../img/404.jpeg"
                alt="Crying Monster 404"
                style={{ maxWidth: '70%', margin: '0 auto', opacity: 0.5 }}
            />
            <h1 style={{ fontSize: '3em', color: '#333' }}>404 - Not Found</h1>
            <p style={{ fontSize: '1.2em', color: '#666' }}>
                The page you were looking for could not be found.
            </p>
        </div>
    );
}

export default NotFound;