import React, { useActionState, useEffect, useState } from "react";
import LogoIcon from "../assets/Group 3.svg?react";
import { useNavigate } from "react-router";
import AdminLoginImage from "../assets/codeplatform-2.jpg";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	InformationCircleIcon,
	ViewIcon,
	ViewOffSlashIcon,
} from "@hugeicons/core-free-icons";
import getManagerDetails from "../actions/getManagerDetails";
import { useAuth } from "../contexts/AuthContext";

const AdminLogin = () => {
	const [showPassword, setShowPassword] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();

	const [state, formAction, isPending] = useActionState(
		async (currentstate, formData) => {
			const username = formData.get("username");
			const password = formData.get("password");

			const result = await getManagerDetails({ username, password });
			console.log(result);
			if (result?.success) {
				login(result.token, result.user);
			}
			return result;
		},
		null
	);

	useEffect(() => {
		if (state?.success) {
			navigate("/admin");
		}
	}, [state, navigate]);
	return (
		<div className="min-w-full min-h-screen bg-red-900 flex">
			<div className="w-[60%] h-dvh bg-white flex items-end justify-center relative">
				<img
					src={AdminLoginImage}
					alt=""
					className="w-full h-full object-contain"
				/>
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
				<h1 className="text-5xl font-black text-green-400">IDCC</h1>
				<div className="w-full  flex flex-col justify-center items-center gap-1">
					<p className="text-sm w-90 text-white/90 text-center">
						Sign in to manage users, events, and submissions.
					</p>
					<span className="text-sm text-white/50">(RVRJCCE)</span>
				</div>
				<div className="w-full flex justify-center items-center gap-5 px-4">
					<form className="w-90 flex flex-col gap-5" action={formAction}>
						<div className="w-full flex items-center justify-center relative">
							<input
								type="text"
								name="username"
								id="username"
								placeholder=" "
								required
								className="rounded-full w-full focus:border-green-400 focus:outline-none border border-white/50 p-4 text-white bg-transparent peer"
							/>
							<label
								htmlFor="username"
								className="text-sm absolute left-6 top-5 text-white/50 transition-all duration-250 peer-focus:-top-4 peer-focus:text-green-400 peer-focus:scale-90 peer-focus:p-[0.4em] peer-focus:bg-black peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-green-400 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:p-[0.4em] peer-not-placeholder-shown:bg-black"
							>
								Username
							</label>
						</div>
						<div className="w-full flex items-center justify-center relative">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								id="Password"
								placeholder=" "
								required
								className="rounded-full w-full focus:border-green-400 focus:outline-none border border-white/50 p-4 text-white bg-transparent peer"
							/>
							<label
								htmlFor="Password"
								className="text-sm absolute left-6 top-5 text-white/50 transition-all duration-250 peer-focus:-top-4 peer-focus:text-green-400 peer-focus:scale-90 peer-focus:p-[0.4em] peer-focus:bg-black peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-green-400 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:p-[0.4em] peer-not-placeholder-shown:bg-black"
							>
								Password
							</label>
							<div
								className="absolute right-5 text-white/50 cursor-pointer"
								onClick={() => setShowPassword((prev) => !prev)}
							>
								{showPassword ? (
									<HugeiconsIcon icon={ViewOffSlashIcon} />
								) : (
									<HugeiconsIcon icon={ViewIcon} />
								)}
							</div>
						</div>

						{state?.error && (
							<div className="text-red-400 text-sm text-center">
								{state.error}
							</div>
						)}

						<div className="w-full  flex justify-center items-center">
							<button
								type="submit"
								className="text-black bg-green-400 w-90 h-14 rounded-full disabled:opacity-50"
								disabled={isPending}
							>
								{isPending ? "Please wait..." : "Continue"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;
