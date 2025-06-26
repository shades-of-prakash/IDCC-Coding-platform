import { User } from "lucide-react";
import Icon from "../assets/Group 3.svg";
const Login = () => {
	return (
		<div className="w-full h-screen flex">
			<div className="w-1/2 bg-pink-300">{/* <img src="" alt="" /> */}</div>
			<div className="w-1/2 p-10 flex flex-col">
				<div className="w-full h-dvh flex justify-center items-center flex-col gap-3">
					<div className="gap-3 w-full  flex items-center justify-center flex-col">
						<img src={Icon} alt="" className="w-20 h-20" />
						<h1 className="text-2xl font-bold">IDCC CONTEST</h1>
						<p className="text-secondary/70  text-sm">
							The IDCC coding platform is a secure online environment for
							competitive coding
						</p>
					</div>
					<form className="w-full">
						<div>
							<div className="w-full p-2 flex flex-col justify-center item gap-2">
								<div className="flex items-center gap-1 text-secondary">
									<User className="w-4 stroke-current" />
									<span>Participant 1</span>
								</div>
								<div className="flex justify-between gap-2">
									<div className="flex flex-col w-1/2 gap-1">
										<label htmlFor="participant-1">Roll No</label>
										<input
											type="text"
											id="participant-1"
											className="h-10 border focus:outline-none focus:border-green-400 border-white/50  rounded px-2 text-secondary bg-transparent text-base"
										/>
									</div>
									<div className="flex flex-col w-1/2 gap-1">
										<label htmlFor="participant-1-name">Name</label>
										<input
											type="text"
											id="participant-1-name"
											className="h-10 border focus:outline-none focus:border-green-400 border-white/50 rounded px-2 text-secondary bg-transparent text-base"
										/>
									</div>
								</div>
							</div>
							{/* Participant 2 */}
							<div className="w-full p-2 flex flex-col gap-2">
								<div className="flex items-center gap-1 text-secondary">
									<User className="w-4 stroke-current" />
									<span>Participant 2</span>
								</div>
								<div className="flex justify-between gap-2">
									<div className="flex flex-col w-1/2 gap-1">
										<label htmlFor="participant-2">Roll No</label>
										<input
											type="text"
											id="participant-2"
											className="h-10 border focus:outline-none focus:border-green-400 border-white/50  rounded px-2 text-secondary bg-transparent text-base"
										/>
									</div>
									<div className="flex flex-col w-1/2 gap-1">
										<label htmlFor="participant-2-name">Name</label>
										<input
											type="text"
											id="participant-2-name"
											className="h-10 border focus:outline-none focus:border-green-400 border-white/50  rounded px-2 text-secondary bg-transparent text-base"
										/>
									</div>
								</div>
							</div>
							<div className="w-full p-2  flex gap-3 mt-2">
								<input
									type="text"
									className="w-[60%] h-10 border focus:outline-none focus:border-green-400 border-white/50 rounded px-2 text-secondary bg-transparent text-base"
								/>
								<button className="w-[40%] bg-white text-black p-2 rounded">
									Generate
								</button>
							</div>
							<div className="w-full p-2 flex justify-start">
								<button className="w-[150px] py-2 rounded border-none outline-none bg-secondary text-primary">
									Continue
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
