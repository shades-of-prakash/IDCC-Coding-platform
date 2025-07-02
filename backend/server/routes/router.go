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

		api.POST("/create_team", controllers.CreateTeam)
		api.GET("/teams", controllers.GetAllTeams)
		router.GET("/team_status/:teamID", controllers.SSEStatus)

		admin := api.Group("/admin")
		{
			admin.POST("/login", controllers.LoginManager)
			admin.POST("/logout", controllers.LogoutManager)
			admin.GET("/session", controllers.CheckSession)
			admin.PUT("/accept/:teamID", controllers.AcceptTeam)
			admin.PUT("/reject/:teamID", controllers.RejectTeam)
		}
	}
}
