export function changeFavicon(theme) {
	// Define favicon configurations for each theme
	const faviconConfig = {
		light: [
			{
				rel: "icon",
				type: "image/png",
				sizes: "96x96",
				href: "/favicon-light-96x96.png",
			},
			{ rel: "icon", type: "image/svg+xml", href: "/favicon-light.svg" },
			{
				rel: "shortcut icon",
				type: "image/x-icon",
				href: "/favicon-light.ico",
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon-light.png",
			},
		],
		dark: [
			{
				rel: "icon",
				type: "image/png",
				sizes: "96x96",
				href: "/favicon-dark-96x96.png",
			},
			{ rel: "icon", type: "image/svg+xml", href: "/favicon-dark.svg" },
			{ rel: "shortcut icon", type: "image/x-icon", href: "/favicon-dark.ico" },
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon-dark.png",
			},
		],
	};

	// Remove existing favicon-related links
	// const rels = ["icon", "shortcut icon", "apple-touch-icon"];
	// rels.forEach((rel) => {
	// 	const oldLinks = document.querySelectorAll(`link[rel="${rel}"]`);
	// 	oldLinks.forEach((el) => el.remove());
	// });

	// Add new favicon links for the specified theme
	faviconConfig[theme].forEach(({ rel, type, sizes, href }) => {
		const link = document.createElement("link");
		link.rel = rel;
		if (type) link.type = type;
		if (sizes) link.sizes = sizes;
		link.href = href;
		document.head.appendChild(link);
	});
}
