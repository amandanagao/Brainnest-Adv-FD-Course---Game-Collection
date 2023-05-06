let regEx    = /^[A-Za-z0-9\s\']*$/;
let numRegEx = /^\d+$/;
let error = 0;

let gameCollection = [];

class Game {

    constructor(title, platform, hours, status, startDate) {
        this.title     = this.validateTitle(title);
        this.platform  = this.validatePlatform(platform);
        this.hours     = this.validateHours(hours);
        this.status    = this.validateStatus(status);
        this.startDate = this.validateStartDate(startDate);
    }

    //Setters
    set title(title) {
        this._title = title;
    }

    set platform(platform) {
        this._platform = platform;
    }

    set hours(hours) {
        this._hours = hours;
    }

    set status(status) {
        this._status = status;
    }

    set startDate(startDate) {
        this._startDate = startDate;
    }

    //Class Functions
    capitalizeLetter(value) {
        let arr = value.split(' ');
        for(let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        return arr.join(' ');
    }

    //Class Functions - Validation
    validateTitle(title) {
        if (title.trim().match(regEx) && title.trim() !== '') {
            return (this.capitalizeLetter(title)).trim();
        } else {
            error = 1;
            return;
        }
    }

    validatePlatform(platform) {
        if (platform.trim().match(regEx) && platform.trim() !== '') {
            return (this.capitalizeLetter(platform)).trim();
        } else {
            error = 1;
            return;
        }
    }

    validateHours(hours) {
        if (hours > 0 && hours.match(numRegEx)) {
            return hours;
        } else {
            error = 1;
            return;
        }
    }

    validateStatus(status) {
        if(status) {
            return true;
        } else {
            return false;
        }
    }

    validateStartDate(startDate) {
        const today = new Date();
        const date = ('0' + today.getDate()).slice(-2);
        const month = ('0' + (today.getMonth() + 1)).slice(-2);
        const year = today.getFullYear();
        let todayDate = `${year}-${month}-${date}`;
        if(startDate <= todayDate) {
            return startDate;
        } else {
            error = 1;
            return;
        }
    }
}

function addGameToCollection(title, platform, hours, status, startDate) {
    let vTitle     = title;
    let vPlatform  = platform;
    let vHours     = hours;
    let vStatus    = status;
    let vStartDate = startDate;

    errorCheck(0);

    if(error !== 1) {
        let newGame = new Game(vTitle, vPlatform, vHours, vStatus, vStartDate);
        gameCollection[0] = newGame;
        return gameCollection;
    } else {
        return false;
    }
}

function errorCheck(error) {
    if(error === 1) {
        delete gameCollection[0];
        return false;
    } else {
        return true;
    }
}

error = 0;

module.exports = {Game, addGameToCollection, errorCheck};