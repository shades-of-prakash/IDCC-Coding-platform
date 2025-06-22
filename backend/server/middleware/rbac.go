package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/shades-of-prakash/IDCC-Coding-platform/server/data"
	"github.com/shades-of-prakash/IDCC-Coding-platform/server/models"
)

func RequirePermission(permission string) gin.HandlerFunc {
	return func(c *gin.Context) {
		userRaw, exists := c.Get("user")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		user := userRaw.(models.Manager)

		if !data.HasPermission(user.Roles, permission) {
			c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
			c.Abort()
			return
		}

		c.Next()
	}
}
