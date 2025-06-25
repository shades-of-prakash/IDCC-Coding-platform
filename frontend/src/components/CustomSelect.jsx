import React, { useState, useRef, useEffect } from "react";
const fruits = [
	{ label: "Admin", value: "Admin" },
	{ label: "Adminstrator", value: "Adminstrator" },
];

export function CustomSelect() {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState(null);
	const selectRef = useRef();

	useEffect(() => {
		function handleClickOutside(event) {
			if (selectRef.current && !selectRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const toggleDropdown = () => setIsOpen((prev) => !prev);
	const handleSelect = (fruit) => {
		setSelected(fruit);
		setIsOpen(false);
	};

	return (
		<div
			className="z-100 w-full  h-14 rounded-full ext-white/50"
			ref={selectRef}
		>
			<div
				className="rounded-full w-full h-full  border border-white/50 flex justify-between items-center p-5"
				onClick={toggleDropdown}
			>
				{selected ? (
					<span className="text-green-400">{selected.label}</span>
				) : (
					<span className="text-white/50">Role</span>
				)}
				<span className="arrow">{isOpen ? "▲" : "▼"}</span>
			</div>
			{isOpen && (
				<div className="w-2/3 float-right  mt-2 text-white/50 z-1000 bg-black rounded-xl overflow-hidden border border-white/50">
					<div className="px-4 py-1 border-b border-white/30">Roles</div>
					{fruits.map((fruit) => (
						<div
							key={fruit.value}
							className={`overflow-hidden px-4 py-2 hover:bg-zinc-800 hover:text-white ${
								selected?.value === fruit.value ? "selected" : ""
							}`}
							onClick={() => handleSelect(fruit)}
						>
							{fruit.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
