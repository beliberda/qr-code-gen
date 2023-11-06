function Catch(error) {
    if (error.response) {
        // Request made but the server responded with an error
        console.log("response message:", error.response.data);
        console.log("response status:", error.response.status);
        console.log("response headers:", error.response.headers);
    } else if (error.request) {
        // Request made but no response is received from the server.
        console.log(error.request);
    } else {
        // Error occured while setting up the request
        console.log("Error", error.message);
    }
}

export { Catch }