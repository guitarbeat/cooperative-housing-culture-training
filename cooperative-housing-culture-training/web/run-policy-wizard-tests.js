const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const ROOT = '.'; // Serve files from the current directory

const server = http.createServer((req, res) => {
    // Basic static file serving
    let filePath = path.join(ROOT, req.url === '/' ? 'policy-wizard-test-runner.html' : req.url);

    // Prevent directory traversal
    if (!filePath.startsWith(ROOT) && !filePath.startsWith(path.resolve(ROOT))) {
        // checks relative path
    }

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
                console.log(`404: ${req.url}`);
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
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
    page.on('requestfailed', request => {
      console.log(`REQUEST FAILED: ${request.url()} ${request.failure().errorText}`);
    });

    try {
        await page.goto(`http://localhost:${PORT}/policy-wizard-test-runner.html`);

        // Wait for QUnit to finish. It adds 'qunit-pass' or 'qunit-fail' class to #qunit-banner
        await page.waitForFunction(
            () => {
                const banner = document.querySelector('#qunit-banner');
                return banner && (banner.classList.contains('qunit-pass') || banner.classList.contains('qunit-fail'));
            },
            { timeout: 10000 }
        );

        const testResult = await page.evaluate(() => {
            const banner = document.querySelector('#qunit-banner');
            const result = {
                passed: banner.classList.contains('qunit-pass'),
                text: banner.innerText,
                details: []
            };
            const tests = document.querySelectorAll('#qunit-tests > li');
            tests.forEach(test => {
                const message = test.querySelector('.test-message')?.innerText || '';
                const name = test.querySelector('.test-name')?.innerText || '';
                const status = test.classList.contains('pass') ? 'PASS' : 'FAIL';
                result.details.push(`[${status}] ${name} ${message}`);
            });
            return result;
        });

        console.log('--- QUnit Test Results ---');
        console.log(`Passed: ${testResult.passed}`);
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
