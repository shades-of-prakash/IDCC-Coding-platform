import { Outlet } from "react-router";
import SideMenu from "../components/Sidemenu/Sidemenu";
import Navbar from "../components/Navbar";

function AdminLayout() {
	return (
		<div className="w-full h-[100dvh] flex bg-primary">
			<SideMenu />
			<div className="w-full flex flex-col">
				<Navbar />
				<div className="h-[92%]">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default AdminLayout;
