// user_controller.go
package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/shades-of-prakash/IDCC-Coding-platform/server/utils"
)

type RegistrationRequest struct {
	Participant_one string `json:"participant_one"`
	Regd_one        string `json:"regd_one"`
	Participant_two string `json:"participant_two"`
	Regd_two        string `json:"regd_two"`
}

func GetUser(c *gin.Context) {
	userId := c.Param("id")
	user := map[string]any{
		"id":   userId,
		"name": "Prakash",
	}

	utils.SuccessResponse(c, "User fetched successfully", user)
}

func CreateUser(c *gin.Context) {
	var reqBody RegistrationRequest
	if err := c.BindJSON(&reqBody); err != nil {
		utils.ErrorResponse(c, 400, "Invalid request", err.Error())
		return
	}
	utils.SuccessResponse(c, "User created", reqBody)
}
