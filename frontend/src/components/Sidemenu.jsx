import { Link, useLocation } from "react-router";
import logo from "../assets/Group 3.svg";
import { Category, DocumentCode, MedalStar, Setting2 } from "iconsax-react";

const menuItems = [
	{
		name: "Overview",
		path: "overview",
		icon: <Category size={20} className="stroke-secondary" />,
	},
	{
		name: "Contest",
		path: "contest",
		icon: <MedalStar size={20} className="stroke-secondary" />,
	},
	{
		name: "Submissions",
		path: "submissions",
		icon: <DocumentCode size={20} className="stroke-secondary" />,
	},
	{
		name: "Settings",
		path: "settings",
		icon: <Setting2 size={20} className="stroke-secondary" />,
	},
];

const SideMenu = () => {
	const location = useLocation();
	const currentPath = location.pathname.split("/").pop();

	return (
		<div className="w-[15%] h-[100dvh] flex items-center flex-col border-r border-zinc-800 ">
			<div className="w-full h-20 flex  items-center gap-0.5 p-4 border-b border-zinc-800">
				<img className="w-8 h-8" src={logo} alt="Logo of IDCC" />
				<p className="h-auto text-4xl font-bold text-center italic">IDCC</p>
			</div>

			<ul className="w-[calc(100%-20px)] h-[92%] gap-3 flex flex-col mt-3">
				{menuItems.map(({ name, path, icon }) => {
					const isActive = currentPath === path;
					return (
						<li
							key={path}
							className={`h-auto rounded-md  list-none gap-2.5 text-base flex items-center hover: bg-linear-to-b hover:from-gradient-top hover:to-gradient-bottom hover:outline-1 hover: outline-zinc-800 ${
								isActive
									? "bg-transparent backdrop-blur-xl  outline-1 outline-zinc-800 bg-linear-to-b from-gradient-top to-gradient-bottom "
									: ""
							}`}
						>
							<Link
								to={path}
								className="flex p-2 w-full items-center gap-2 h-full"
							>
								{icon}

								<span>{name}</span>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default SideMenu;
