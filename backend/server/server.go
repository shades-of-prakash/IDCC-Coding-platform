package server

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/shades-of-prakash/IDCC-Coding-platform/server/routes"
)

func StartServer() error {
	_ = godotenv.Load()
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	router := gin.Default()

	routes.SetupRoutes(router)

	return router.Run(":" + port)
}
