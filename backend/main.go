package main

import (
	"log"

	"github.com/shades-of-prakash/IDCC-Coding-platform/server"
)

func main() {
	serverErr := server.StartServer()
	if serverErr != nil {
		log.Fatal("Failed to start server: ", serverErr)
	}
}
