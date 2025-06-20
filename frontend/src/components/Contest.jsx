// import "./Upload.css";
const ContestComponent = ({ contestData }) => {
	console.log(contestData);
	return (
		<div className="existing-contests">
			<h3>Existing Contests:</h3>
			<ul>
				{contestData.map((contest) => (
					<li key={contest._id}>{contest.contestName}</li>
				))}
			</ul>
		</div>
	);
};

export default ContestComponent;
