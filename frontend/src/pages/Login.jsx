import { useState } from "react";
import { User } from "lucide-react";
import Icon from "../assets/Group 3.svg";
import useSSEStatus from "../hooks/UseSSE";

const Login = () => {
	useSSEStatus(localStorage.getItem("teamID"));
	const [formData, setFormData] = useState({
		participant1: "",
		participant1Name: "",
		participant2: "",
		participant2Name: "",
	});
	const [status, setStatus] = useState("");
	const [error, setError] = useState("");

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setStatus("");

		const payload = {
			members: [
				{ regno: formData.participant1, name: formData.participant1Name },
				{ regno: formData.participant2, name: formData.participant2Name },
			],
		};

		try {
			const res = await fetch("/api/v1/create_team", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			const data = await res.json();
			console.log(data);

			if (res.ok && data.data.status === "pending") {
				localStorage.setItem("teamID", data.data.teamID);
				setStatus("pending");
			} else {
				console.log(data.message);
				setError(data.message || "Something went wrong");
			}
		} catch (err) {
			console.log(error);
			setError("Network error or server unavailable");
		}
	};

	return (
		<div className="w-full h-screen flex">
			<div className="w-1/2 bg-pink-300" />
			<div className="w-1/2 p-10 flex flex-col">
				<div className="w-full h-dvh flex justify-center items-center flex-col gap-3">
					<div className="gap-3 w-full flex items-center justify-center flex-col">
						<img src={Icon} alt="" className="w-20 h-20" />
						<h1 className="text-2xl font-bold">IDCC CONTEST</h1>
						<p className="text-secondary/70 text-sm">
							The IDCC coding platform is a secure online environment for
							competitive coding
						</p>
					</div>
					{status === "pending" ? (
						<div className="text-yellow-500 font-medium mt-4">
							Please wait until the administrator accepts your team.
						</div>
					) : (
						<form onSubmit={handleSubmit} className="w-full">
							<div className="w-full p-2 flex flex-col gap-2">
								{/* Participant 1 */}
								<div className="flex items-center gap-1 text-secondary">
									<User className="w-4 stroke-current text-white/50" />
									<span className="text-white/50">Participant 1</span>
								</div>
								<div className="flex justify-between gap-2">
									<div className="flex flex-col w-1/2 gap-1">
										<label htmlFor="participant1 " className="text-white/70">
											Reg.no
										</label>
										<input
											type="text"
											id="participant1"
											value={formData.participant1}
											onChange={handleChange}
											className="h-10 border focus:outline-none focus:border-green-400 border-white/50 rounded px-2 text-secondary bg-transparent text-base"
										/>
									</div>
									<div className="flex flex-col w-1/2 gap-1">
										<label htmlFor="participant1Name" className="text-white/70">
											Name
										</label>
										<input
											type="text"
											id="participant1Name"
											value={formData.participant1Name}
											onChange={handleChange}
											className="h-10 border focus:outline-none focus:border-green-400 border-white/50 rounded px-2 text-secondary bg-transparent text-base"
										/>
									</div>
								</div>

								{/* Participant 2 */}
								<div className="flex items-center gap-1 text-secondary mt-4">
									<User className="w-4 stroke-current text-white/50" />
									<span className="text-white/50">Participant 2</span>
								</div>
								<div className="flex justify-between gap-2">
									<div className="flex flex-col w-1/2 gap-1">
										<label htmlFor="participant2" className="text-white/70">
											Roll No
										</label>
										<input
											type="text"
											id="participant2"
											value={formData.participant2}
											onChange={handleChange}
											className="h-10 border focus:outline-none focus:border-green-400 border-white/50 rounded px-2 text-secondary bg-transparent text-base"
										/>
									</div>
									<div className="flex flex-col w-1/2 gap-1">
										<label htmlFor="participant2Name" className="text-white/70">
											Name
										</label>
										<input
											type="text"
											id="participant2Name"
											value={formData.participant2Name}
											onChange={handleChange}
											className="h-10 border focus:outline-none focus:border-green-400 border-white/50 rounded px-2 text-secondary bg-transparent text-base"
										/>
									</div>
								</div>

								{error && (
									<div className="text-red-500 mt-2 text-sm">{error}</div>
								)}

								{/* Submit */}
								<div className="w-full mt-4">
									<button
										type="submit"
										className="w-[150px] py-2 rounded border-none outline-none bg-green-400 text-primary"
									>
										Continue
									</button>
								</div>
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
