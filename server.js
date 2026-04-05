const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const instanceId = process.env.WEBSITE_INSTANCE_ID || "Local Instance";

    fs.readFile('index.html', (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end("Error loading page");
        }

        // Inject instance ID into HTML
        let html = data.toString().replace(
            "{{INSTANCE_ID}}",
            instanceId
        );

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log("Server running...");
});