const HOSTED_ZONE_ID = "Z2I7AU9P9J59CP"; //The ID of the hosted zone that you want to update

const RECORD_SET = "secure.peteyjoe.com"; //The record set that you want to update i.e. website.example.com

const RECORD_SET_TYPE = "A"; //The type of the record set, this program only supports IPV4, so leave as type A

const TIME_TO_LIVE = 300; //The time to live of the record set (AWS default is 300 seconds)

const REPEAT_CYCLE = 10000; //How often you want to check that the ip address has changed in milliseconds i.e. 60000 = 1 minute

const DISPLAY_NOCHANGE_MESSAGE = true; //If this is set to true, then every ip check, it will show in the terminal "no change"

module.exports = {
    HOSTED_ZONE_ID,
    RECORD_SET,
    RECORD_SET_TYPE,
    TIME_TO_LIVE,
    REPEAT_CYCLE,
    DISPLAY_NOCHANGE_MESSAGE
}