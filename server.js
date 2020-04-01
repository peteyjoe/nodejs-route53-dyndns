const fs = require('fs');
const request = require('request');
const { exec } = require('child_process')
const { HOSTED_ZONE_ID, RECORD_SET, RECORD_SET_TYPE, TIME_TO_LIVE, REPEAT_CYCLE, DISPLAY_NOCHANGE_MESSAGE } = require('./vars')

let ipStatus = false;
let link = null;

const checkIP = () => {
    if (RECORD_SET_TYPE === "AAAA") {
        link = 'https://api6.ipify.org?format=json';
    } else if (RECORD_SET_TYPE === "A") {
        link = 'https://api.ipify.org?format=json';
    } else {
        console.log('INVALID RECORD SET TYPE');
        process.exit();
    }
    request(link, { json: true }, (err, res, body) => {
        if (err) {
            ipStatus = 'failedAPI';
            return null;
        }
        fs.readFile('currentIP.txt', 'utf8', (err, text) => {
            if (err) {
                ipStatus = 'failedFILE';
                return null;
            } else {
                if (text === body.ip) {
                    ipStatus = false;
                    return null;
                } else {
                    fs.writeFile('currentIP.txt', body.ip, (err) => {
                        if (err) {
                            ipStatus = 'failedFILE'
                        } else {
                            ipStatus = body.ip;
                            return null;
                        }
                    });
                }
            }   
        });
    })
}

const sendData = () => {
    checkIP();
    if (ipStatus === false) {
        if (DISPLAY_NOCHANGE_MESSAGE) {
            console.log('no change');
        }
    } else if (ipStatus === 'failedAPI') {
        console.log('ERROR IN IP API CALL');
    } else if (ipStatus === 'failedFILE') {
        console.log('ERROR IN FILE');
    } else {
        fs.writeFile('change-record-set.json', `{"Comment": "Updated using the peteyjoe nodejs ddns server", "Changes": [{"Action": "UPSERT","ResourceRecordSet": {"Name": "${RECORD_SET}","Type": "${RECORD_SET_TYPE}","TTL": ${TIME_TO_LIVE},"ResourceRecords": [{"Value": "${ipStatus}"}]}}]}`, 'utf8', (err) => {
            if (err) { console.log(err); }
        });
        exec(`aws route53 change-resource-record-sets --hosted-zone-id=${HOSTED_ZONE_ID} --change-batch=file://change-record-set.json`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return null;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return null;
            }
            console.log(`stdout: ${stdout}`);
        });        
        console.log('ip has changed');
    }
    setTimeout(sendData, REPEAT_CYCLE);
}

sendData();