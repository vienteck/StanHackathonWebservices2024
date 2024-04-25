package main

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
)

func main() {
	// Define the URL of the weather service
	baseURL := "http://localhost:3000/weather"

	// Define the parameters (city and API key)
	params := url.Values{}
	params.Set("city", "New York")            // Change the city name as needed
	params.Set("apiKey", "your_api_key_here") // Replace with your actual API key

	// Build the URL with parameters
	url := baseURL + "?" + params.Encode()

	// Make an HTTP GET request to the weather service
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("Error making request:", err)
		return
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response:", err)
		return
	}

	// Check if the response status code is OK
	if resp.StatusCode != http.StatusOK {
		fmt.Printf("Error: %s\n", resp.Status)
		fmt.Println(string(body))
		return
	}

	// Print the weather data
	fmt.Println("Weather Data:")
	fmt.Println(string(body))
}
