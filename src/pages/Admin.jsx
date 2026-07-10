import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import "../styles/styleAdmin.css";

function Admin() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <TopBar />

        <h1>Panel de Administración</h1>
      </div>
    </div>
  );
}



export default Admin;