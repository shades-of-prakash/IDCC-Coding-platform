export default async function fetchWithHandler(url, options = {}) {
	try {
		const res = await fetch(url, {
			credentials: "include",
			...options,
		});

		const contentType = res.headers.get("content-type");
		const isJson = contentType && contentType.includes("application/json");
		const data = isJson ? await res.json() : null;

		if (!res.ok) {
			const errorMessage = data?.message || `Error ${res.status}`;
			throw new Error(errorMessage);
		}

		return data;
	} catch (error) {
		throw new Error(error.message || "Something went wrong");
	}
}
