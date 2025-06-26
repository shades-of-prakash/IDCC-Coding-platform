package server

import (
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/shades-of-prakash/IDCC-Coding-platform/server/db"
	"github.com/shades-of-prakash/IDCC-Coding-platform/server/routes"
)

func StartServer() error {
	_ = godotenv.Load()
	port := os.Getenv("PORT")
	mongo_uri := os.Getenv("MONGODB_URI")
	db.InitMongoDB(mongo_uri)
	if port == "" {
		port = "8080"
	}
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "https://your-frontend-domain.com"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	routes.SetupRoutes(router)
	return router.Run(":" + port)
}
