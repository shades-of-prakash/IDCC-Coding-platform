import { Outlet } from "react-router"
import "./AdminLayout.css"
import SideMenu from "../../components/Sidemenu"
import Navbar from "../../components/Navbar"
import UseTheme from "../../hooks/UseTheme"
function AdminLayout(){
    const {theme}=UseTheme();
    console.log(theme);
    return <div className="dashboard df">
                <SideMenu/>
                <div className="main_navbar_outlet df df_fd_c">
                    <Navbar/>
                    <div className="outlet">Outlet</div>
                </div>
            </div>
}
export default AdminLayout