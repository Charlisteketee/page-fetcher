const request = require('request');
const fs = require('fs');

// Get command line arguments for URL and the filepath
const url = process.argv[2];
const filePath = process.argv[3];

function that takes in a url, filepath and callback
function pageDownloader(url, filePath, callback) {
  // Make an HTTP request to the URL
  request(url, (error, response, body) => {
    // If there was an error, invoke the callback with the error
    if (error) {
      return callback(error);
    }

    // Write the received body to the local file
    fs.writeFile(filePath, body, (err) => {
      if (err) {
        return callback(err);
      }

      // Get the size of the saved file
      const fileSize = Buffer.from(body).length;

      // Callback with the success message and file size (null means success!)
      callback(null, fileSize);
    });
  });
}

// Call the function and check if there was an error
pageDownloader(url, filePath, (error, fileSize) => {
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
  }
});

