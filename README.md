# nodejs-route53-dyndns

A Simple IPV4 Dynamic DNS Server built with nodejs for use with DNS hosted on AWS Route53

## Installation

You will need to have some dependencies set up for this to work

1. Route53 Hosted Zone

By doing this, I would assume that you already have a domain hosted on Route53 with a record set you want to update

2. IAM User

You will need to set up an IAM User with access to Route53

    1. In the AWS Console, go to IAM in the Security, Identity, & Compliance section

    2. Go to Users in the Access Management section

    3. Click on the Add User button

    4. Give it a name and select the access type as "Programmatic Access"

    5. Hit "Next: Permissions"

    6. Click the Attach existing policies directly button

    7. Search "AmazonRoute53FullAccess" and attach that policy to the user by clicking on the checkbox'

    8. Click on "Next: Tags" and then "Next: Review" and then hit "Create User"

    9. Click on the "Download .csv" button to save the access key ID and secret access key, we will need these later

    10. Click the close button and you're done!

3. AWS CLI

You need to have AWS CLI installed on your server

[Click Here](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) to read on how to install it

Test if it is working by typing `aws --version` into your terminal

Then type `aws configure` into the terminal and open up the credentials.csv that you downloaded earlier

Copy and paste the access key ID in the prompt and hit enter, do the same for the secret access key, hit enter for Default region name and Default output format

4. Node.js and NPM

    * Windows and Mac

    Install Nodejs and NPM by using the installer [From the Nodejs website](https://nodejs.org/)

    * Linux

    Follow the README guide in the [nodesource distributions github repo](https://github.com/nodesource/distributions)

For both of these, I would recommend downloading version 12.16.1 LTS

Test that nodejs and npm are installed by typing this into the terminal

```bash
node -v
npm -v
```

You should get the version numbers by typing this

5. Installing required modules

Clone the files into an empty folder, then download the required modules by typing these commands into the terminal

```bash
cd /path/to/the/folder/where/you/cloned/the/files
npm install nodemon
npm install request
npm install child_process
```

## Usage

Edit the vars.js file with your desired values. The file should look like this

```javascript
const HOSTED_ZONE_ID = "ABCDEFGHIJKLMN"; //The ID of the hosted zone that you want to update
const RECORD_SET = "example.com"; //The record set that you want to update i.e. website.example.com
const RECORD_SET_TYPE = "A"; //The type of the record set, this program only supports IPV4, so leave as type A
const TIME_TO_LIVE = 300; //The time to live of the record set (AWS default is 300 seconds)
const REPEAT_CYCLE = 10000; //How often you want to check that the ip address has changed in milliseconds i.e. 60000 = 1 minute
const DISPLAY_NOCHANGE_MESSAGE = false; //If this is set to true, then every ip check, it will show in the terminal "no change"

module.exports = {
    HOSTED_ZONE_ID,
    RECORD_SET,
    RECORD_SET_TYPE,
    TIME_TO_LIVE,
    REPEAT_CYCLE,
    DISPLAY_NOCHANGE_MESSAGE
}
```

Don't worry about the module.exports part, just edit the values in the const's

To start the program, type `npm start` into terminal. Make sure you are in the correct directory first.

You're Done! Leave the program to run and it will detect ip changes automatically (based on the time you put into the "REPEAT_CYCLE" const)

## License
[MIT](https://choosealicense.com/licenses/mit/)
