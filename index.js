var http = require("http");

const employeeModule = require('./Employee');

//TODO - Use Employee Module here
console.log("Lab 03 -  NodeJs");


//TODO - Fix any errors you found working with lab exercise

//Define Server Port
const port = process.env.PORT || 8081

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`)
    } else {
        if (req.url === '/') {
            //TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
            // Display message "<h1>Welcome to Lab Exercise 03</h1>"
            res.setHeader('Content-Type', 'text/html'); // Set response type as HTML
            res.end("<h1>Welcome to Lab Exercise 03</h1>");
        }

        if (req.url === '/employee') {
            //TODO - Display all details for employees in JSON format
            
            const employees = employeeModule.getAllEmployees();
            res.end(JSON.stringify(employees));
        }

        if (req.url === '/employee/names') {
            //TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array
            //e.g. [ "Ash Lee", "Mac Mohan", "Pritesh Patel"]
            // Display only all employees {first name + lastname} in Ascending order in JSON Array
            const employeeNames = employeeModule.getAllEmployees()
                .map(emp => `${emp.firstName} ${emp.lastName}`)
                .sort(); // Sort in ascending order
            res.end(JSON.stringify(employeeNames));

        }

        if (req.url === '/employee/totalsalary') {
            const totalSalary = employeeModule.getAllEmployees()
                .reduce((sum, emp) => sum + emp.Salary, 0);
            res.end(JSON.stringify({ total_salary: totalSalary })); 
    }
    res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})