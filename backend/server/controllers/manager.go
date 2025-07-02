package controllers

import (
	"context"
	"fmt"
	"net/http"
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
	if err != nil || !utils.VerifyPassword(body.Password, manager.PasswordHash) {
		utils.ErrorResponse(c, 401, "Invalid username or password", nil)
		return
	}

	token, err := utils.GenerateToken(manager.Username, manager.Roles)
	if err != nil {
		utils.ErrorResponse(c, 500, "Token generation failed", err.Error())
		return
	}

	// Secure Cookie
	c.SetCookie("token", token, 3600*24, "/", "", true, true)
	utils.SuccessResponse(c, "Login successful", gin.H{
		"user": gin.H{
			"username": manager.Username,
			"roles":    manager.Roles,
		},
	})
}
func LogoutManager(c *gin.Context) {
	c.SetCookie("token", "", -1, "/", "", true, true)
	utils.SuccessResponse(c, "Logged out successfully", nil)
}

func CheckSession(c *gin.Context) {
	tokenStr, err := c.Cookie("token")
	if err != nil {
		utils.ErrorResponse(c, 401, "Not authenticated", nil)
		return
	}

	claims, err := utils.VerifyToken(tokenStr)
	if err != nil {
		utils.ErrorResponse(c, 401, "Invalid token", err.Error())
		return
	}

	utils.SuccessResponse(c, "Authenticated", gin.H{
		"user": gin.H{
			"username": claims.Username,
			"roles":    claims.Roles,
		},
	})
}

func AcceptTeam(c *gin.Context) {
	teamID := c.Param("teamID")
	if teamID == "" {
		utils.ErrorResponse(c, http.StatusBadRequest, "Missing team ID", nil)
		return
	}

	collection := db.MongoClient.Database("IDCC").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"_id": teamID}
	update := bson.M{"$set": bson.M{"status": "accepted"}}

	result, err := collection.UpdateOne(ctx, filter, update)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to update team status", err.Error())
		return
	}
	if result.MatchedCount == 0 {
		utils.ErrorResponse(c, http.StatusNotFound, "Team not found", nil)
		return
	}

	utils.SuccessResponse(c, "Team status updated to accepted", gin.H{"teamID": teamID})
}

func RejectTeam(c *gin.Context) {
	teamID := c.Param("teamID")
	fmt.Println(teamID)
	if teamID == "" {
		utils.ErrorResponse(c, http.StatusBadRequest, "Missing team ID", nil)
		return
	}

	collection := db.MongoClient.Database("IDCC").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"_id": teamID}
	update := bson.M{"$set": bson.M{"status": "rejected"}}

	result, err := collection.UpdateOne(ctx, filter, update)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to update team status", err.Error())
		return
	}
	if result.MatchedCount == 0 {
		utils.ErrorResponse(c, http.StatusNotFound, "Team not found", nil)
		return
	}

	utils.SuccessResponse(c, "Team status updated to rejected", gin.H{"teamID": teamID})
}
