package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, World!")
}
func apihandler(w http.ResponseWriter,r  *http.Request){
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    f := `{"message": "Hello, World!"}`
    fmt.Fprintf(w, "%s", f) 
    fmt.Println("API endpoint hit")
    // return 
}
func main() {
    http.HandleFunc("/", handler) 
    http.HandleFunc("/api", apihandler)
    fmt.Println("Server starting at http://localhost:8080")
    err := http.ListenAndServe(":8080", nil) 
    if err != nil {
        fmt.Println("Error starting server:", err)
    }
}
