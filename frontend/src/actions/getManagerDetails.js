export default async function getManagerDetails({ username, password }) {
	const response = await fetch("/api/v1/admin/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, password }),
		credentials: "include",
	});

	console.log(response);
	if (!response.ok) {
		return { success: false, error: "Invalid credentials" };
	}

	const responseData = await response.json();
	const data = responseData.data;
	return {
		success: true,
		token: data.token,
		user: data.user,
	};
}
