import React from "react";
import LogoIcon from "../assets/Group 3.svg?react";
import AdminLoginImage from "../assets/codeplatform-2.jpg";
import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { CustomSelect } from "../components/CustomSelect";
const AdminLogin = () => {
	return (
<div className="min-w-full min-h-screen bg-red-900 flex">
			<div className="w-[60%] h-dvh bg-white flex items-end justify-center relative">
				{/* <div className="w-full h-1/4 bg-red-900">
					<p className="text-[150px] font-bold bg-black h-full">IDCC</p>
				</div> */}
				<img src={AdminLoginImage} alt="" className="w-full h-full object-contain" />
				<div className="group absolute bg-black/50 w-10 hover:w-58 h-10 left-8 bottom-13 flex items-center justify-center  p-1 hover:p-2 hover:gap-1 rounded-full">
					<HugeiconsIcon icon={InformationCircleIcon} />
					<div className="hidden group-hover:inline">
						<span className="whitespace-nowrap">Designed by Ssk and Jvsk</span>
					</div>
				</div>
			</div>
			<div className="w-[40%] h-dvh bg-black flex items-center justify-center  flex-col gap-5">
				<div className="">
					<LogoIcon className="w-15 h-15" />
				</div>
				<h1 className="text-5xl font-bold text-green-400">IDCC</h1>
				<div className="w-full  flex flex-col justify-center items-center">
					<p className="text-sm w-full text-white/90  text-center">
						The official coding platform of Information Technology <span>(RVRJCCE)</span>
					</p>
				</div>
				<div className="w-full flex justify-center items-center gap-5  px-4">
					<div className="w-90 flex flex-col gap-5">
						<div className="w-full flex items-center justify-center relative">
							<input
								type="text"
								id="username"
								placeholder=" "
								className="rounded-full w-full focus:border-green-400 focus:outline-none border border-white/50 p-4 text-white bg-transparent peer"
							/>
							<label
								htmlFor="username"
								className="absolute left-6 top-4 text-white/50 transition-all duration-250 peer-focus:-top-5 peer-focus:text-green-400 peer-focus:scale-90 peer-focus:p-[0.4em] peer-focus:bg-black peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-green-400 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:p-[0.4em] peer-not-placeholder-shown:bg-black"
							>
								Username
							</label>
						</div>
						<div className="w-full flex items-center justify-center relative">
							<input
								type="password"
								id="Password"
								placeholder=" "
								className="rounded-full w-full focus:border-green-400 focus:outline-none border border-white/50 p-4 text-white bg-transparent peer"
							/>
							<label
								htmlFor="Password"
								className="absolute left-6 top-4 text-white/50 transition-all duration-250 peer-focus:-top-5 peer-focus:text-green-400 peer-focus:scale-90 peer-focus:p-[0.4em] peer-focus:bg-black peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-green-400 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:p-[0.4em] peer-not-placeholder-shown:bg-black"
							>
								Password
							</label>
						</div>
					</div>
				</div>
				{/* <div className="mt-4 w-[420px] h-14 rounded-full  border border-white/50">
					<div>
						<span className="text-white/50">Role</span>
					</div>
				</div> */}
				{/* <div className="w-full  flex justify-center items-center">
					<div className="w-90">
						<CustomSelect />
					</div>
				</div> */}
				<div className="w-full  flex justify-center items-center">
					<button className=" text-black bg-green-400 w-90 h-14 rounded-full">
						Continue
					</button>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;
