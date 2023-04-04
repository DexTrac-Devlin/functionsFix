const express = require('express');
const app = express();
const vm = require('vm');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/run', (req, res) => {
  // Schedule a timeout after 1 minute
  const timeout = setTimeout(() => {
    console.log('Maximum run time exceeded');
    res.status(500).send('Maximum run time exceeded');
  }, 60000);

  // Get the code from the request body
  const code = req.body.code;

  // Run the code in a sandboxed environment
  const sandbox = { };
  vm.runInNewContext(code, sandbox);

  // Send the result as a response
  res.send(sandbox.result);

  // Clear the timeout to prevent it from triggering
  clearTimeout(timeout);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
