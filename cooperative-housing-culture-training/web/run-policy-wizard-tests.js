const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const ROOT = '.'; // Serve files from the current directory

const server = http.createServer((req, res) => {
    // Normalize url to handle query parameters if any, though simple test runner doesn't use them much
    let reqUrl = req.url.split('?')[0];

    const filePath = path.join(ROOT, reqUrl === '/' ? 'policy-wizard-test-runner.html' : reqUrl);
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
                console.log(`404 Not Found: ${filePath}`);
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

        // Wait for QUnit to finish
        await page.waitForFunction(() => {
            const banner = document.querySelector('#qunit-banner');
            return banner && (banner.classList.contains('qunit-pass') || banner.classList.contains('qunit-fail'));
        }, { timeout: 10000 });

        const testResult = await page.evaluate(() => {
            const banner = document.querySelector('#qunit-banner');
            const result = {
                passed: banner.classList.contains('qunit-pass'),
                text: banner.innerText,
                details: []
            };
            const tests = document.querySelectorAll('#qunit-tests > li');
            tests.forEach(test => {
                const status = test.className;
                const message = test.querySelector('.test-message')?.innerText || test.innerText.split('\n')[0];
                result.details.push(`[${status}] ${message}`);
            });
            return result;
        });

        console.log('--- QUnit Test Results ---');
        console.log(`Status: ${testResult.passed ? 'PASSED' : 'FAILED'}`);
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
