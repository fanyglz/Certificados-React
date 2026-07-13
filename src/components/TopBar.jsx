function TopBar() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    return (
        <div className="top-bar">
            <h3>Bienvenido</h3>

            <p>ID: {usuario?.id_login}</p>
            <p>Rol: {usuario?.rol}</p>
        </div>
    );
}

export default TopBar;