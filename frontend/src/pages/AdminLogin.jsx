import React, { useState } from "react";
import LogoIcon from "../assets/Group 3.svg?react";
import { useNavigate } from "react-router";
import AdminLoginImage from "../assets/codeplatform-2.jpg";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	InformationCircleIcon,
	ViewIcon,
	ViewOffSlashIcon,
} from "@hugeicons/core-free-icons";
import { useAdminAuth } from "../contexts/AdminAuthContext"; // ✅ new context
import Spinner from "../components/Spinner";

const AdminLogin = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { login, loginStatus } = useAdminAuth();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(
			{ username, password },
			{
				onSuccess: () => navigate("/admin"),
			}
		);
	};

	const inputStyles =
		"rounded-full w-full focus:border-green-400 focus:outline-none border border-white/50 pl-8 pr-4 py-4 text-white bg-transparent peer";

	const labelStyles =
		"text-sm absolute left-6 top-5 text-white/50 transition-all duration-250 peer-focus:-top-4 peer-focus:text-green-400 peer-focus:scale-90 peer-focus:p-[0.4em] peer-focus:bg-black peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-green-400 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:p-[0.4em] peer-not-placeholder-shown:bg-black";

	return (
		<div className="min-h-screen bg-red-900 flex">
			{/* Left side image panel */}
			<div className="w-3/5 h-screen bg-white flex items-end justify-center relative">
				<img
					src={AdminLoginImage}
					alt="Admin login background"
					className="w-full h-full object-cover"
				/>
				<div className="group absolute bg-black/50 w-10 hover:w-64 h-10 left-8 bottom-12 flex items-center justify-center p-1 hover:p-2 hover:gap-2 rounded-full transition-all duration-300">
					<HugeiconsIcon
						icon={InformationCircleIcon}
						aria-label="Information"
					/>
					<span className="hidden group-hover:inline text-white whitespace-nowrap">
						Designed by Ssk and Jvsk
					</span>
				</div>
			</div>

			{/* Right side login form */}
			<div className="w-2/5 h-screen bg-black flex flex-col items-center justify-center gap-6">
				<LogoIcon className="w-16 h-16" />
				<h1 className="text-5xl font-black text-green-400">IDCC</h1>
				<div className="text-center">
					<p className="text-sm text-white/90">
						Sign in to manage users, events, and submissions.
					</p>
					<span className="text-sm text-white/50">(RVRJCCE)</span>
				</div>
				{console.log("loginStatus.isLoading", loginStatus.isLoading)}

				<form className="w-4/5 flex flex-col gap-5" onSubmit={handleSubmit}>
					<div className="relative">
						<input
							type="text"
							id="username"
							name="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder=" "
							required
							className={inputStyles}
							aria-label="Username"
						/>
						<label htmlFor="username" className={labelStyles}>
							Username
						</label>
					</div>

					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder=" "
							required
							className={inputStyles}
							aria-label="Password"
						/>
						<label htmlFor="password" className={labelStyles}>
							Password
						</label>
						<button
							type="button"
							className="absolute right-5 top-5 text-white/50"
							onClick={() => setShowPassword((prev) => !prev)}
							aria-label={showPassword ? "Hide password" : "Show password"}
						>
							<HugeiconsIcon
								icon={showPassword ? ViewOffSlashIcon : ViewIcon}
							/>
						</button>
					</div>

					{loginStatus.isError && (
						<p className="text-red-500 text-sm bg-red-900/40 p-2 rounded-md text-center">
							{loginStatus.error?.message || "Login failed"}
						</p>
					)}

					<button
						type="submit"
						className="bg-green-400 text-black h-14 rounded-full disabled:bg-green-400/50 flex items-center justify-center"
						disabled={loginStatus.isPending}
					>
						{loginStatus.isPending ? <Spinner size="w-7 h-7" /> : "Continue"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default AdminLogin;
