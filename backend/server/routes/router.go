// routes/router.go
package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/shades-of-prakash/IDCC-Coding-platform/server/controllers"
)

func SetupRoutes(router *gin.Engine) {
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "IDCC Coding Platform API is running!",
		})
	})

	router.GET("/user/:id", controllers.GetUser)
	router.POST("/create_user", controllers.CreateUser)
}
