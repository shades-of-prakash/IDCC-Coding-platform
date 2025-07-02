package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/shades-of-prakash/IDCC-Coding-platform/server/utils"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenStr, err := c.Cookie("token")
		if err != nil {
			utils.ErrorResponse(c, 401, "Authentication required", nil)
			c.Abort()
			return
		}

		claims, err := utils.VerifyToken(tokenStr)
		if err != nil {
			utils.ErrorResponse(c, 401, "Invalid token", err.Error())
			c.Abort()
			return
		}

		c.Set("username", claims.Username)
		c.Set("roles", claims.Roles)
		c.Next()
	}
}