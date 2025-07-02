const Spinner = ({ size = "w-12 h-12", color = "border-t-green-600" }) => {
	return (
		<div
			className={`rounded-full border-4 border-white ${color} ${size} animate-spin`}
		/>
	);
};

export default Spinner;
