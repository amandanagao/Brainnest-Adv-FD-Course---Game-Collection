const {Game, addGameToCollection, errorCheck} = require('./scriptTest');

describe('function addGameToCollection Tests', () => {
    test('1. Creating object - status true', () => {
        expect(addGameToCollection(
            'kingdom hearts',
            'ps2',
            '65',
            true,
            '10/02/2023'
        )).toEqual([{
            _title: "Kingdom Hearts",
            _platform: "Ps2",
            _hours: "65",
            _status: true,
            _startDate: "10/02/2023"
        }]);
    });

    test('2. Creating object - status false', () => {
        expect(addGameToCollection(
            'kingdom hearts',
            'ps2',
            '65',
            false,
            '10/02/2023'
        )).toEqual([{
            _title: "Kingdom Hearts",
            _platform: "Ps2",
            _hours: "65",
            _status: false,
            _startDate: "10/02/2023"
        }]);
    });

    test('3.Creating an invalid object', () => {
        expect(addGameToCollection(
            '#Nier automata',
            '%nintendo switch%', 
            '51',
            true,
            '08/08/2017'
        )).toEqual([{
            _title: undefined,
            _platform: undefined,
            _hours: "51",
            _status: true,
            _startDate: "08/08/2017"
        }]);
    });

    test('4.Creating object - return false', () => {
        expect(addGameToCollection(
            '#Nier automata',
            '%nintendo switch%', 
            '51',
            true,
            '08/08/2017'
        )).toBeFalsy();
    });
});

describe('class Game Tests', () => {
    test('1.Invalid title', () => {
        expect(new Game(
            '#crash Bandicoot@',
            'ps1',
            '30',
            true,
            '02/01/2023'
        )).toEqual({
            _title: undefined,
            _platform: "Ps1",
            _hours: "30",
            _status: true,
            _startDate: "02/01/2023"
        });
    });

    test('2.Invalid platform', () => {
        expect(new Game(
            'Nier automata',
            'nintendo switch%', 
            '51',
            true,
            '08/08/2017'
        )).toEqual({
            "_title": "Nier Automata",
            "_platform": undefined,
            "_hours": "51",
            "_status": true,
            "_startDate": "08/08/2017"
        });
    });

    test('3.Invalid hours', () => {
        expect(new Game(
            'league of legends',
            'PC',
            -2,
            true,
            '15/06/2015'
        )).toEqual({
            "_title": "League Of Legends",
            "_platform": "PC",
            "_hours": undefined,
            "_status": true,
            "_startDate": "15/06/2015"
        });
    });

    test('4.Invalid startDate - Future date', () => {
        expect(new Game(
            'zelda tears of kingdom',
            'nintendo switch',
            '1',
            true,
            '2023-05-12'))
        .toEqual({
            "_title": "Zelda Tears Of Kingdom",
            "_platform": "Nintendo Switch",
            "_hours": "1",
            "_status": true,
            "_startDate": undefined
        });
    });
});

describe('function errorCheck Tests', () => {
    test('1. Error check - false', () => {
            expect(errorCheck(1)).toBe(false);
        });

    test('2. Error check - true', () => {
            expect(errorCheck(0)).toBe(true);
        });
 });