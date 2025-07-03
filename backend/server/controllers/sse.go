package controllers

import (
	"context"
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/shades-of-prakash/IDCC-Coding-platform/server/db"
	"go.mongodb.org/mongo-driver/bson"
)

func SSEStatus(c *gin.Context) {
	teamID := c.Param("teamID")
	fmt.Println("teamid", teamID)
	collection := db.MongoClient.Database("IDCC").Collection("users")
	ctx := context.Background()

	c.Writer.Header().Set("Content-Type", "text/event-stream")
	c.Writer.Header().Set("Cache-Control", "no-cache")
	c.Writer.Header().Set("Connection", "keep-alive")

	ticker := time.NewTicker(3 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-c.Request.Context().Done():
			return
		case <-ticker.C:
			var team Team
			err := collection.FindOne(ctx, bson.M{"_id": teamID}).Decode(&team)
			if err == nil && team.Status == "accepted" {
				fmt.Fprintf(c.Writer, "data: %s\n\n", `{"status": "accepted"}`)
				c.Writer.Flush()
				return
			}
		}
	}
}
