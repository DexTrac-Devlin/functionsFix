const express = require('express');
const bodyParser = require('body-parser');
const vm = require('vm');
const app = express();

// Configure middleware to parse JSON data
app.use(bodyParser.json());

// Serve the static HTML file
app.use(express.static('public'));

// Handle the "execute" POST request
app.post('/execute', (req, res) => {
  // Get the JavaScript code from the request body
  const { code } = req.body;

  try {
    // Create a new VM context to run the code in
    const context = vm.createContext();

    // Execute the JavaScript code in the VM context
    vm.runInContext(code, context);

    // Send the result of the execution back to the client
    res.json({ result: context });
  } catch (err) {
    // If an error occurs, send it back to the client
    res.status(400).json({ error: err.message });
  }
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
