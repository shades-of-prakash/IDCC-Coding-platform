// utils/fetchWithHandler.js
export default async function fetchWithHandler(url, options = {}) {
	try {
		const res = await fetch(url, {
			credentials: "include",
			...options,
		});

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.message || "Something went wrong");
		}

		return data;
	} catch (error) {
		console.error(`Fetch error for ${url}:`, error.message);
		throw error;
	}
}
