// user_controller.go
package controllers

import (
	"context"
	"log"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/shades-of-prakash/IDCC-Coding-platform/server/db"
	"github.com/shades-of-prakash/IDCC-Coding-platform/server/utils"
	"go.mongodb.org/mongo-driver/bson"
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
	collection := db.MongoClient.Database("IDCC").Collection("users")
	log.Println("🧪 collection reference:", collection)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, bson.M{
		"participant1": reqBody.Participant_one,
		"regd_one":     reqBody.Regd_one,
		"participant2": reqBody.Participant_two,
		"regd_two":     reqBody.Regd_two,
		"timestamp":    time.Now(),
	})

	if err != nil {
		utils.ErrorResponse(c, 500, "Failed to save to database", err.Error())
		return
	}

	utils.SuccessResponse(c, "Participants registered and saved", reqBody)
}
