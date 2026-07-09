import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import "../styles/styleAdmin.css";
import RegistrarUsuario from "../components/RegistrarUsuario";

function Admin() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <TopBar />

        <RegistrarUsuario />
      </div>
    </div>
  );
}

export default Admin;