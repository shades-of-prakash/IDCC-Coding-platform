package controllers

import (
	"context"
	"fmt"
	"net/http"
	"regexp"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/shades-of-prakash/IDCC-Coding-platform/server/db"
	"github.com/shades-of-prakash/IDCC-Coding-platform/server/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Member struct {
	Name  string `json:"name"`
	RegNo string `json:"regNo"`
}

type Team struct {
	ID        string    `bson:"_id,omitempty" json:"id"`
	Members   [2]Member `bson:"members" json:"members"`
	Status    string    `bson:"status" json:"status"`
	CreatedAt time.Time `bson:"createdAt" json:"createdAt"`
}

// MatchRegNoFormat ensures format like y22it034
func MatchRegNoFormat(input string) (string, error) {
	input = strings.ToLower(strings.TrimSpace(input))
	regex := regexp.MustCompile(`^y\d{2}it\d{3}$`)
	if regex.MatchString(input) {
		return input, nil
	}
	return "", fmt.Errorf("invalid registration number format: %s", input)
}

// normalizeRegNos sorts the two reg numbers to ensure consistency
func normalizeRegNos(reg1, reg2 string) (string, string) {
	if reg1 > reg2 {
		return reg2, reg1
	}
	return reg1, reg2
}

// generateId creates unique ID based on normalized regNos
func generateId(reg1, reg2 string) string {
	r1, r2 := normalizeRegNos(reg1, reg2)
	re := regexp.MustCompile(`0*(\d+)$`)
	part1 := re.FindStringSubmatch(r1)
	part2 := re.FindStringSubmatch(r2)
	return fmt.Sprintf("A%s-B%s", part1[0], part2[0])
}

func CreateTeam(c *gin.Context) {
	var req struct {
		Members [2]Member `json:"members"`
	}

	if err := c.BindJSON(&req); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid JSON input", err.Error())
		return
	}

	// Format & validate registration numbers
	reg1, err1 := MatchRegNoFormat(req.Members[0].RegNo)
	reg2, err2 := MatchRegNoFormat(req.Members[1].RegNo)

	if err1 != nil || err2 != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "One or both regNo are invalid", []string{
			err1.Error(),
			err2.Error(),
		})
		return
	}

	// ❌ Same reg no for both members
	if reg1 == reg2 {
		utils.ErrorResponse(c, http.StatusBadRequest, "Both participants cannot have the same registration number", nil)
		return
	}

	// Normalize regNos to check for prior participation
	norm1, norm2 := normalizeRegNos(reg1, reg2)

	collection := db.MongoClient.Database("IDCC").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// ❌ Check if either regNo already in a team
	filter := bson.M{
		"$or": []bson.M{
			{"members.regNo": norm1},
			{"members.regNo": norm2},
		},
	}

	var existing Team
	err := collection.FindOne(ctx, filter).Decode(&existing)
	if err != mongo.ErrNoDocuments {
		utils.ErrorResponse(c, http.StatusBadRequest, "One or both members already in a team", nil)
		return
	}

	teamID := generateId(norm1, norm2)

	// Create new team with normalized regNos
	newTeam := Team{
		ID: teamID,
		Members: [2]Member{
			{Name: req.Members[0].Name, RegNo: norm1},
			{Name: req.Members[1].Name, RegNo: norm2},
		},
		Status:    "pending",
		CreatedAt: time.Now(),
	}

	_, err = collection.InsertOne(ctx, newTeam)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to create team", err.Error())
		return
	}

	utils.SuccessResponse(c, "Team created successfully", gin.H{
		"teamID":  newTeam.ID,
		"members": newTeam.Members,
		"status":  newTeam.Status,
	})
}

func GetAllTeams(c *gin.Context) {
	collection := db.MongoClient.Database("IDCC").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to fetch teams", err.Error())
		return
	}
	defer cursor.Close(ctx)

	var teams []Team
	if err := cursor.All(ctx, &teams); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to decode teams", err.Error())
		return
	}

	utils.SuccessResponse(c, "Teams fetched successfully", teams)
}
