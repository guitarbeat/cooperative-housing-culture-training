const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const ROOT = '.'; // Serve files from the current directory

const server = http.createServer((req, res) => {
    const filePath = path.join(ROOT, req.url === '/' ? 'policy-wizard-test-runner.html' : req.url);
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

async function runTests() {
    server.listen(PORT);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    try {
        await page.goto(`http://localhost:${PORT}/policy-wizard-test-runner.html`);
        await page.waitForSelector('#qunit-test-output', { timeout: 10000 });

        const testResult = await page.evaluate(() => {
            const banner = document.querySelector('#qunit-banner');
            const result = {
                passed: banner.classList.contains('qunit-pass'),
                text: banner.innerText,
                details: []
            };
            const tests = document.querySelectorAll('#qunit-tests > li');
            tests.forEach(test => {
                result.details.push(test.innerText);
            });
            return result;
        });

        console.log('--- QUnit Test Results ---');
        console.log(testResult.text);
        console.log('--------------------------');
        testResult.details.forEach(detail => console.log(detail));
        console.log('--------------------------');


        if (!testResult.passed) {
            console.error('Tests failed!');
            process.exit(1);
        } else {
            console.log('All tests passed!');
        }

    } catch (error) {
        console.error('Error running tests:', error);
        process.exit(1);
    } finally {
        await browser.close();
        server.close();
    }
}

runTests();
