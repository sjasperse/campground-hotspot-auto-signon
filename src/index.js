const {setInterval} = require('timers');
const request = require('request');
const options = require('command-line-args')([
    { name: 'test-url', alias: 't' },
    { name: 'test-interval', alias: 'i' },
    { name: 'recovery-url', alias: 'u' },
    { name: 'recovery-method', alias: 'm' },
    { name: 'verbose' }
]);

const testUrl = options['test-url'] || 'https://httpbin.org/status/200';
const testInterval = options['test-interval'] || 1000;
const recoveryMethod = options['recovery-method'] || 'GET';
const recoveryUrl = options['recovery-url'];
const verbose = options.verbose || false;

console.verbose = msg => {
    if (verbose) {
        console.log(msg);
    }
};

if (!recoveryUrl) {
    console.error('Parameter --recovery-url|-u is required');
    process.exit(1);
}

let ongoingRequest = false;
setInterval(() => {
    if (!ongoingRequest) {
        ongoingRequest = true;
        let startTime = new Date();
        console.verbose(`${new Date()}: Testing GET ${testUrl}`);
        request(testUrl, (err, res, body) => {
            ongoingRequest = false;
            let duration = (new Date()) - startTime;
            if (err) {
                console.log(`${new Date()}: Error trying to reach test url : ${duration}`);

                console.verbose(`Recovering via ${recoveryMethod} ${recoveryUrl}`);
                request({
                    method: recoveryMethod,
                    url: recoveryUrl
                }, (loginErr, loginRes) => {
                    if (loginErr) {
                        console.log(`${new Date()}: Login error. ${loginErr}`);
                    }
                    else {
                        console.log(`${new Date()}: Re-logged in`);
                    }
                });
            }
            else {
                console.verbose(`${new Date()}: Reached GET ${testUrl}`);
            }
        });
    }
}, testInterval);
