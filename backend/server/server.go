package server

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func StartServer() error {
	_ = godotenv.Load()
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "IDCC Coding Platform API is running!",
		})
	})

	return router.Run(":" + port)
}
