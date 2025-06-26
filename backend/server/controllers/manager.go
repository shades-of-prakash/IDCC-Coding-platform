package controllers

import (
	"context"
	"log"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/shades-of-prakash/IDCC-Coding-platform/server/db"
	"github.com/shades-of-prakash/IDCC-Coding-platform/server/models"
	"github.com/shades-of-prakash/IDCC-Coding-platform/server/utils"
	"go.mongodb.org/mongo-driver/bson"
)

func LoginManager(c *gin.Context) {
	var body models.ManagerLoginRequest
	if err := c.ShouldBindJSON(&body); err != nil {
		utils.ErrorResponse(c, 400, "Invalid request", err.Error())
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var manager models.Manager
	collection := db.MongoClient.Database("IDCC").Collection("managers")

	err := collection.FindOne(ctx, bson.M{"username": body.Username}).Decode(&manager)
	log.Println("test", err)
	if err != nil {
		utils.ErrorResponse(c, 401, "Invalid username or password", nil)
		return
	}

	if !utils.VerifyPassword(body.Password, manager.PasswordHash) {
		utils.ErrorResponse(c, 401, "Invalid username or password", nil)
		return
	}

	token, err := utils.GenerateToken(manager.Username, manager.Roles)
	if err != nil {
		utils.ErrorResponse(c, 500, "Token generation failed", err.Error())
		return
	}

	utils.SuccessResponse(c, "Login successful", gin.H{
		"token": token,
		"user": gin.H{
			"username": manager.Username,
			"role":     manager.Roles,
		},
	})
}
