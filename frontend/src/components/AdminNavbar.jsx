import { Link, useLocation } from "react-router";
import { uppercase } from "../utils/uppercase";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	ArrowRight01Icon,
	Home05Icon,
	Moon02Icon,
	Sun01Icon,
} from "@hugeicons/core-free-icons";
import UserProfile from "../assets/download.jpeg";
import UseTheme from "../hooks/UseTheme";
import { useAdminAuth } from "../contexts/AdminAuthContext";
const AdminNavbar = () => {
	const { theme, toggleTheme } = UseTheme();
	const { logout, user } = useAdminAuth();
	const location = useLocation();
	const allPaths = location.pathname
		.split("/")
		.filter((path) => path && path !== "admin");
	const path = location.pathname.split("/").pop();
	return (
		<div className=" h-20 flex justify-between items-center border-b p-4 border-zinc-800">
			<div className="flex">
				<Link to="overview" className="flex justify-center items-center">
					<HugeiconsIcon icon={Home05Icon} />
				</Link>

				{!(allPaths.length === 1 && allPaths[0] === "overview") && (
					<>
						<div className="flex justify-center items-center text-accent">
							<HugeiconsIcon icon={ArrowRight01Icon} size={20} />
						</div>

						<div className=" flex items-center">
							{allPaths
								.filter((path) => path !== "overview")
								.map((path, index, filteredPaths) => (
									<div key={index} className="flex items-center">
										<span>{uppercase(path)}</span>
										{index !== filteredPaths.length - 1 && <ArrowRight2 />}
									</div>
								))}
						</div>
					</>
				)}
			</div>

			<div className="flex justify-between gap-2">
				<div
					className="flex justify-center items-center text-accent"
					onClick={toggleTheme}
				>
					{theme == "dark" ? (
						<HugeiconsIcon icon={Sun01Icon} />
					) : (
						<HugeiconsIcon icon={Moon02Icon} />
					)}
				</div>

				<button
					className=""
					onClick={() => {
						logout();
					}}
				>
					logout
				</button>

				<div className="w-51 bg-transparent bg-gradient-to-b from-gradient-top to-gradient-bottom outline-1 outline-zinc-800 p-2 gap-3 rounded-xl flex items-center justify-center">
					<div className="bg-red-900 w-14 h-12 rounded-md overflow-hidden">
						<img
							src={UserProfile}
							alt="user_profile"
							className=" w-full h-full"
						/>
					</div>
					<div className="min-w-0">
						<p className="text-base text-white truncate whitespace-nowrap overflow-hidden max-w-[160px]">
							Prakash varma kokkilagadda
						</p>
						<span className="text-[10px] text-white/50 truncate">
							{user?.roles[0]}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AdminNavbar;
