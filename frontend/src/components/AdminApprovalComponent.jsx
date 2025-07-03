import React from "react";
import Table from "./Table";
import { useQuery } from "@tanstack/react-query";
import fetchWithHandler from "../utils/fetchHandler";

const AdminApprovalComponent = () => {
	const {
		data = [],
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["teams"],
		queryFn: async () => {
			const res = await fetchWithHandler("/api/v1/teams");
			return Array.isArray(res.data) ? res.data : [];
		},
	});

	const columns = [
		{
			header: "No",
			render: (_row, idx) => idx + 1,
			width: "50px",
			className: "text-center",
		},
		{
			header: "Team ID",
			accessor: "id",
		},
		{
			header: "Team ID",
			accessor: "id",
		},
		{
			header: "Participant 1",
			render: (row) => row.members?.[0]?.regNo ?? "-",
		},
		{
			header: "Participant 2",
			render: (row) => row.members?.[1]?.regNo ?? "-",
		},
		{
			header: "Status",
			render: (row) => <span className="text-orange-500/50">{row.status}</span>,
		},
		{
			header: "Action",
			render: (row) => (
				<div className="flex gap-4">
					<button className="hover:bg-green-500/10 border border-green-500/20 text-green-500/60 rounded-md py-2 px-5">
						Accept
					</button>
					<button className="hover:bg-red-500/10 border border-red-500/20 text-red-500/60 rounded-md py-2 px-5">
						Reject
					</button>
				</div>
			),
		},
	];

	return (
		<Table
			heading="Login Requests"
			data={data}
			columns={columns}
			isLoading={isLoading}
			isError={isError}
			error={error}
			emptyMessage="No teams are waiting for approval. New team requests will show up here."
		/>
	);
};

export default AdminApprovalComponent;
