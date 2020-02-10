const Asteroid = require("../public/javascripts/Balls/asteroid");
const Bullet = require( "../public/javascripts/Balls/bullet");
const Rocket = require( "../public/javascripts/rocket");
const Game = require("../public/javascripts/Rockets/game");


/*
describe('add number', function () {/*
    for (const c of cases) {
        it(`${JSON.stringify(c.array)} + ${c.number} = ${JSON.stringify(c.expected)}`, () => {
            const res = addNumber(c.array, c.number);

            expect(res).toStrictEqual(c.expected);
        });
    }*

    expect(0).toStrictEqual(0);
});
*/

const g = new Game(null, 600, 400);
const rocket = new Rocket(g);
rocket.x = 100;
rocket.y = 100;
test('right asteroid', () => {
    const asteroid = new Asteroid(122.5, 130, 15, g, 0);
    expect(true).toStrictEqual(rocket.checkIntersection(asteroid));
});
