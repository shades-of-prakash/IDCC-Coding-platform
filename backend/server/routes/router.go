// routes/router.go
package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/shades-of-prakash/IDCC-Coding-platform/server/controllers"
)

func SetupRoutes(router *gin.Engine) {
	api := router.Group("/api/v1")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "IDCC Coding Platform API is running!",
			})
		})

		user := api.Group("/user")
		{
			user.GET("/:id", controllers.GetUser)
			user.POST("/", controllers.CreateUser)
		}

		admin := api.Group("/admin")
		{
			admin.POST("/login", controllers.LoginManager)
		}
	}
}
