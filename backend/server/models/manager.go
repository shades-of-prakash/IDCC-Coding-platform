package models

type ManagerLoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type Manager struct {
	Username     string   `bson:"username"`
	Roles        []string `bson:"roles"`
	Salt         string   `bson:"salt"`
	PasswordHash string   `bson:"password_hash"`
}
