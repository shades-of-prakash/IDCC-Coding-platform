import { Link, useLocation } from "react-router";
import { uppercase } from "../../utils/uppercase";
import { ArrowRight2, Moon, Sun1, Home2, Home3 } from "iconsax-react";
import UserProfile from "../../assets/download.jpeg";
import UseTheme from "../../hooks/UseTheme";
import "./Navbar.css";
const Navbar = () => {
	const { theme, toggleTheme } = UseTheme();
	const location = useLocation();
	const allPaths = location.pathname
		.split("/")
		.filter((path) => path && path !== "admin");
	const path = location.pathname.split("/").pop();
	return (
		<div className=" h-20 flex justify-between items-center border-b p-4 border-zinc-800">
			<div className="flex">
				<Link to="overview" className="flex justify-center items-center">
					<Home2 size={24} className="stroke-accent" />
				</Link>

				{!(allPaths.length === 1 && allPaths[0] === "overview") && (
					<>
						<div className="flex justify-center items-center">
							<ArrowRight2 color="red" />
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
				<div className="flex justify-center items-center" onClick={toggleTheme}>
					{theme == "dark" ? (
						<Sun1 size={24} className="stroke-accent" />
					) : (
						<Moon size={24} className="stroke-accent" />
					)}
				</div>
				<div className="bg-transparent bg-gradient-to-b from-gradient-top to-gradient-bottom outline-1 outline-zinc-800 p-2 gap-2 ml-1 rounded-xl flex items-center">
					<div className="w-9 h-9 rounded-md overflow-hidden">
						<img src={UserProfile} alt="user_profile" />
					</div>
					<div className="user_name">
						<p>Shadesofprakash</p>
						<span>Admin</span>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Navbar;
