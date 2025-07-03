import React from "react";
import { Loader2Icon, AlertTriangleIcon } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PackageOutOfStockIcon } from "@hugeicons/core-free-icons";

const Table = ({
	heading,
	columns = [],
	data = [],
	isLoading = false,
	isError = false,
	error = null,
	emptyMessage = "No data to show.",
}) => {
	return (
		<div className="p-4">
			{heading && <div className="mb-4 text-lg font-medium">{heading}</div>}
			<div className="overflow-hidden rounded-md border border-white/20">
				<table className="min-w-full text-sm text-white/80">
					<thead className="bg-black/30 text-white/50 border-b border-white/20">
						<tr>
							{columns.map((col, i) => (
								<th
									key={i}
									className={`px-4 py-3 text-left font-normal ${
										col.className ?? ""
									}`}
									style={{ width: col.width }}
								>
									{col.header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{isLoading ? (
							<tr>
								<td
									colSpan={columns.length}
									className="py-12 text-center text-white/40"
								>
									<div className="flex flex-col items-center justify-center gap-2">
										<Loader2Icon className="w-6 h-6 animate-spin text-white/30" />
										<span className="text-sm">Loading...</span>
									</div>
								</td>
							</tr>
						) : isError ? (
							<tr>
								<td
									colSpan={columns.length}
									className="py-12 text-center text-red-400"
								>
									<div className="flex flex-col items-center justify-center gap-2">
										<AlertTriangleIcon className="w-6 h-6 text-red-400" />
										<span className="text-sm max-w-sm text-red-300 text-center">
											{error?.message || "Something went wrong."}
										</span>
									</div>
								</td>
							</tr>
						) : data.length === 0 ? (
							<tr>
								<td
									colSpan={columns.length}
									className="py-12 text-center text-white/30"
								>
									<div className="flex flex-col items-center justify-center gap-2">
										<HugeiconsIcon
											icon={PackageOutOfStockIcon}
											className="w-10 h-10 text-white/20"
										/>
										<span className="text-sm text-white/40 text-center max-w-sm">
											{emptyMessage}
										</span>
									</div>
								</td>
							</tr>
						) : (
							data.map((row, rowIndex) => (
								<tr
									key={row.id || rowIndex}
									className="border-b border-white/20 last:border-b-0"
								>
									{columns.map((col, colIndex) => (
										<td
											key={colIndex}
											className={`px-4 py-3 ${col.cellClassName ?? ""}`}
										>
											{col.render
												? col.render(row, rowIndex)
												: row[col.accessor]}
										</td>
									))}
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Table;
