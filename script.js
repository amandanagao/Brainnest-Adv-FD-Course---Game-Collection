let regEx    = /^[A-Za-z0-9\s\']*$/;
let numRegEx = /^\d+$/;
let error    = 0;

let gameCollection = [];

class Game {

    constructor(title, platform, hours, status, startDate) {
        this.id        = this.createUUID();
        this.title     = this.validateTitle(title);
        this.platform  = this.validatePlatform(platform);
        this.hours     = this.validateHours(hours);
        this.status    = this.validateStatus(status);
        this.startDate = this.validateStartDate(startDate);
    }

    //Getters and Setters
    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get platform() {
        return this._platform;
    }

    get hours() {
        return this._hours;
    }

    get status() {
        return this._status;
    }

    get startDate() {
        return this._startDate;
    }

    set id(uuid) {
        this._id = uuid;
    }

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
    createUUID() {
        let date  = new Date().getTime();
        let uuid  = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (date + Math.random()*16)%16 | 0;
            date  = Math.floor(date/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

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
            alert('Please provide a correct title!');
            error = 1;
            return;
        }
    }

    validatePlatform(platform) {
        if (platform.trim().match(regEx) && platform.trim() !== '') {
            return (this.capitalizeLetter(platform)).trim();
        } else {
            alert('Please provide a correct platform!');
            error = 1;
            return;
        }
    }

    validateHours(hours) {
        if (hours > 0 && hours.match(numRegEx)) {
            return hours;
        } else {
            alert('Please enter a valid played hours!');
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
            alert('Please enter a valid date!');
            error = 1;
            return;
        }
    }
}

function addGameToCollection() {
    let addNewGameForm = document.getElementById('addNewGameForm');

    addNewGameForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let title     = document.querySelector('#title');
        let platform  = document.querySelector('#platform');
        let hours     = document.querySelector('#hours');
        let status    = document.querySelector('#status');
        let startDate = document.querySelector('#startDate');

       //Check duplicate game
       Object.entries(gameCollection).forEach(([key, game]) => {
            if (    
                game.capitalizeLetter(title.value)    === game.title &&
                game.capitalizeLetter(platform.value) === game.platform
            ) {
                alert('This game has been previously added.');
                error = 1;
            }
        });
        
        let newGame = new Game(title.value, platform.value, hours.value, status.checked, startDate.value);
        gameCollection[newGame._id] = newGame;
        errorCheck(newGame._id);
        showGames();
        addNewGameForm.reset();
        document.getElementById('formPopUp').classList.remove('active');
    });
}

function errorCheck(id) {
    if(error === 1) {
        delete gameCollection[id];
        error = 0;
    }
}

//Create game card
function showGames() {
    if(error === 0) {
        let item  = document.querySelector('.gameList');
        item.innerHTML = '';

        Object.entries(gameCollection).forEach(([key, value]) => {
            let cardDiv = document.createElement('div');
            cardDiv.id = key;
            cardDiv.classList.add('card');

            //Game title
            let gameDiv = document.createElement('div');
            gameDiv.classList.add('gameDiv');
            let gameDivLabel = document.createElement('label');
            gameDivLabel.textContent = 'Game:';
            let gameDivText = document.createElement('input');
            gameDivText.setAttribute('type', 'text');
            gameDivText.setAttribute('id', 'gameTitle');
            gameDivText.setAttribute('disabled', '');
            gameDivText.value = `${value.title}`;
            let gameDivHidden = document.createElement('input');
            gameDivHidden.setAttribute('type', 'hidden');
            gameDivHidden.setAttribute('id', 'originalTitle');
            gameDivHidden.value = `${value.title}`;

            cardDiv.appendChild(gameDiv);
            gameDiv.appendChild(gameDivLabel);
            gameDiv.appendChild(gameDivText);
            gameDiv.appendChild(gameDivHidden);

            //Platform
            let platformDiv = document.createElement('div');
            platformDiv.classList.add('platformDiv');
            let platformDivLabel = document.createElement('label');
            platformDivLabel.textContent = 'Platform:';
            let platformDivText = document.createElement('input');
            platformDivText.setAttribute('type', 'text');
            platformDivText.setAttribute('id', 'gamePlatform');
            platformDivText.setAttribute('disabled', '');
            platformDivText.value = `${value.platform}`;
            let platformDivHidden = document.createElement('input');
            platformDivHidden.setAttribute('type', 'hidden');
            platformDivHidden.setAttribute('id', 'originalPlatform');
            platformDivHidden.value = `${value.platform}`;

            cardDiv.appendChild(platformDiv);
            platformDiv.appendChild(platformDivLabel);
            platformDiv.appendChild(platformDivText);
            platformDiv.appendChild(platformDivHidden);

            //Played Hours
            let hoursDiv = document.createElement('div');
            hoursDiv.classList.add('hoursDiv');
            let hoursDivLabel = document.createElement('label');
            hoursDivLabel.textContent = 'Played hours:';
            let hoursDivText = document.createElement('input');
            hoursDivText.setAttribute('type', 'number');
            hoursDivText.setAttribute('id', 'gameHours');
            hoursDivText.setAttribute('disabled', '');
            hoursDivText.value = `${value.hours}`;
            let hoursDivHidden = document.createElement('input');
            hoursDivHidden.setAttribute('type', 'hidden');
            hoursDivHidden.setAttribute('id', 'originalHours');
            hoursDivHidden.value = `${value.hours}`;

            cardDiv.appendChild(hoursDiv);
            hoursDiv.appendChild(hoursDivLabel);
            hoursDiv.appendChild(hoursDivText);
            hoursDiv.appendChild(hoursDivHidden);

            //Status
            let statusDiv = document.createElement('div');
            statusDiv.classList.add('statusDiv');
            let statusDivLabel = document.createElement('label');
            statusDivLabel.textContent = 'Game finished';
            let statusDivText = document.createElement('input');
            statusDivText.setAttribute('type', 'checkbox');
            statusDivText.setAttribute('id', 'gameStatus');
            statusDivText.setAttribute('disabled', '');
            statusDivText.checked = value.status;
            let statusDivHidden = document.createElement('input');
            statusDivHidden.setAttribute('type', 'hidden');
            statusDivHidden.setAttribute('id', 'originalStatus');
            statusDivHidden.value = `${value.status}`;

            cardDiv.appendChild(statusDiv);
            statusDiv.appendChild(statusDivLabel);
            statusDiv.appendChild(statusDivText);
            statusDiv.appendChild(statusDivHidden);

            //Start Date
            let dateDiv = document.createElement('div');
            dateDiv.classList.add('dateDiv');
            let dateDivLabel = document.createElement('label');
            dateDivLabel.textContent = 'Start date:';
            let dateDivText = document.createElement('input');
            dateDivText.setAttribute('type', 'date');
            dateDivText.setAttribute('id', 'gameDate');
            dateDivText.setAttribute('disabled', '');
            dateDivText.value = `${value.startDate}`;
            let dateDivHidden = document.createElement('input');
            dateDivHidden.setAttribute('type', 'hidden');
            dateDivHidden.setAttribute('id', 'originalDate');
            dateDivHidden.value = `${value.startDate}`;

            cardDiv.appendChild(dateDiv);
            dateDiv.appendChild(dateDivLabel);
            dateDiv.appendChild(dateDivText);
            dateDiv.appendChild(dateDivHidden);

            //Buttons
            let cardButtons = document.createElement('div');
            cardButtons.setAttribute('class', 'cardButtons');
           
            let editButton = document.createElement('button');
            editButton.setAttribute('id', 'editButton');
            editButton.setAttribute('onclick', 'setEditButton("'+key+'")');
            editButton.textContent = 'Edit';
            
            let deleteButton = document.createElement('button');
            deleteButton.setAttribute('id', 'deleteButton');
            deleteButton.setAttribute('onclick', 'setDeleteButton("'+key+'")');
            deleteButton.textContent = 'Delete';
            
            let saveButton = document.createElement('button');
            saveButton.setAttribute('id', 'saveButton');
            saveButton.setAttribute('onclick', 'setSaveButton("'+key+'")');
            saveButton.textContent = 'Save';
            saveButton.classList.add('hidden');
            
            let cancelButton = document.createElement('button');
            cancelButton.setAttribute('id', 'cancelButton');
            cancelButton.setAttribute('onclick', 'setCancelButton("'+key+'")');
            cancelButton.textContent = 'Cancel';
            cancelButton.classList.add('hidden');

            cardDiv.appendChild(cardButtons);
            cardButtons.appendChild(editButton);
            cardButtons.appendChild(deleteButton);
            cardButtons.appendChild(saveButton);
            cardButtons.appendChild(cancelButton);

            item.appendChild(cardDiv);
        });
    }
}

//Buttons Functions
function setEditButton(id) {
    let game   = document.getElementById(id);
    let fields = game.querySelectorAll('[disabled]');
   
    fields.forEach(element => {
        element.removeAttribute('disabled');
    });

    let editButton   = game.querySelector('#editButton');
    let deleteButton = game.querySelector('#deleteButton');
    let saveButton   = game.querySelector('#saveButton');
    let cancelButton = game.querySelector('#cancelButton');

    editButton.classList.add('hidden');
    deleteButton.classList.add('hidden');
    saveButton.classList.remove('hidden');
    cancelButton.classList.remove('hidden');
}

function setDeleteButton(id) {
    let deleteConfirm = confirm('Are you sure you want to delete this game?');
    if(deleteConfirm) {
        let game = document.getElementById(id);
        game.remove();
        delete gameCollection[id];
        alert('Game deleted!');
    }
}

function setSaveButton(id) {
    let game     = document.getElementById(id);
    let title    = game.querySelector('#gameTitle');
    let platform = game.querySelector('#gamePlatform');
    let hours    = game.querySelector('#gameHours');
    let status   = game.querySelector('#gameStatus');
    let date     = game.querySelector('#gameDate');

    let currentGame = gameCollection[id];
    
    gameCollection[id].title = currentGame.validateTitle(title.value);
    gameCollection[id].platform = currentGame.validatePlatform(platform.value);
    gameCollection[id].hours = currentGame.validateHours(hours.value);
    gameCollection[id].status = currentGame.validateStatus(status.checked);
    gameCollection[id].date = currentGame.validateStartDate(date.value);

    if(error !== 1) {
        let hiddenTitle    = game.querySelector('#originalTitle');
        let hiddenPlatform = game.querySelector('#originalPlatform');
        let hiddenHours    = game.querySelector('#originalHours');
        let hiddenStatus   = game.querySelector('#originalStatus');
        let hiddenDate     = game.querySelector('#originalDate');
        
        hiddenTitle.value    = title.value;
        hiddenPlatform.value = platform.value;
        hiddenHours.value    = hours.value;
        hiddenStatus.checked = status.checked;
        hiddenDate.value     = date.value;

        title.value    = gameCollection[id].title.trim();
        platform.value = gameCollection[id].platform.trim();

        title.setAttribute('disabled','');
        platform.setAttribute('disabled','');
        hours.setAttribute('disabled','');
        status.setAttribute('disabled','');
        date.setAttribute('disabled','');

        let editButton   = game.querySelector('#editButton');
        let deleteButton = game.querySelector('#deleteButton');
        let saveButton   = game.querySelector('#saveButton');
        let cancelButton = game.querySelector('#cancelButton');

        editButton.classList.remove('hidden');
        deleteButton.classList.remove('hidden');
        saveButton.classList.add('hidden');
        cancelButton.classList.add('hidden');
    }
    error = 0;
}

function setCancelButton(id) {
    let game     = document.getElementById(id);
    let title    = game.querySelector('#gameTitle');
    let platform = game.querySelector('#gamePlatform');
    let hours    = game.querySelector('#gameHours');
    let status   = game.querySelector('#gameStatus');
    let date     = game.querySelector('#gameDate');

    title.value    = game.querySelector('#originalTitle').value;
    platform.value = game.querySelector('#originalPlatform').value;
    hours.value    = game.querySelector('#originalHours').value;
    status.checked = game.querySelector('#originalStatus').checked;
    date.value     = game.querySelector('#originalDate').value;

    title.setAttribute('disabled','');
    platform.setAttribute('disabled','');
    hours.setAttribute('disabled','');
    status.setAttribute('disabled','');
    date.setAttribute('disabled','');

    let editButton   = game.querySelector('#editButton');
    let deleteButton = game.querySelector('#deleteButton');
    let saveButton   = game.querySelector('#saveButton');
    let cancelButton = game.querySelector('#cancelButton');

    editButton.classList.remove('hidden');
    deleteButton.classList.remove('hidden');
    saveButton.classList.add('hidden');
    cancelButton.classList.add('hidden');
}

//PopUp Function
function togglePopUp() {
    document.getElementById('formPopUp').classList.toggle('active');
}

addGameToCollection();