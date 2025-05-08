module.exports = {
	apps: [
		{
			name: "react-spa",
			script: "./path/to/react-spa/server.js",
			instances: 1,
			autorestart: true,
			watch: false,
			max_memory_restart: "1G",
			// env: {
			// 	NODE_ENV: "production",
			// },
		},
		{
			name: "express-app",
			script: "./path/to/express-app/app.js",
			instances: 1,
			autorestart: true,
			watch: false,
			max_memory_restart: "1G",
			// env: {
			// 	NODE_ENV: "production",
			// },
		},
	],
};
