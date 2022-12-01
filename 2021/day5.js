import fs from 'fs';

const day5 = () => {
    let data;
    try {
        data = fs.readFileSync('inputs/day_5.txt', 'utf8');
    } catch (err) {
        console.error(err)
    }

    const visitedLocations = {};
    data.split('\n').forEach(vertex => {
        const [start, end] = vertex.split(' -> ');
        const direction = getDirection(start, end);
        const [startX, startY] = getCoordinates(start);
        const [endX, endY] = getCoordinates(end);
        if('HORIZONTAL' === direction) {
            const distance = getDistance(startX, endX);
            if (distance >= 0) {
                for (var i = Number(endX); i <= Number(startX); i++) {
                    visitedLocations[generateCoordinate(i, startY)] = (visitedLocations[generateCoordinate(i, startY)] || 0) + 1;
                }
            } else {
                for (var i = Number(startX); i <= Number(endX); i++) {
                    visitedLocations[generateCoordinate(i, startY)] = (visitedLocations[generateCoordinate(i, startY)] || 0) + 1;
                }
            }
        } else if ('VERTICAL' === direction) {
            const distance = getDistance(startY, endY);
            if (distance >= 0) {
                for (var i = Number(endY); i <= Number(startY); i++) {
                    visitedLocations[generateCoordinate(startX, i)] = (visitedLocations[generateCoordinate(startX, i)] || 0) + 1;
                }
            } else {
                for (var i = Number(startY); i <= Number(endY); i++) {
                    visitedLocations[generateCoordinate(startX, i)] = (visitedLocations[generateCoordinate(startX, i)] || 0) + 1;
                }
            }
        } else if ('DIAGONAL' === direction) {
            const distanceX = getDistance(startX, endX);
            const distanceY = getDistance(startY, endY);
            const x = [], y = [];
            if (distanceX >= 0) {
                for(let i = Number(endX); i <= Number(startX); i++) {
                    x.push(i);
                }
                x.reverse();
            } else {
                for(let i = Number(startX); i <= Number(endX); i++) {
                    x.push(i);
                }
            }

            if (distanceY >= 0) {
                for(let i = Number(endY); i <= Number(startY); i++) {
                    y.push(i);
                }
                y.reverse();
            } else {
                for(let i = Number(startY); i <= Number(endY); i++) {
                    y.push(i);
                }
            }

            x.map((xco, idx) => generateCoordinate(xco, y[idx])).forEach(coord => {
                visitedLocations[coord] = (visitedLocations[coord] || 0) + 1;
            });
        }
    });
    const result = Object.values(visitedLocations).reduce((agg, value) => {
        if(value > 1) {
            return agg += 1;
        }
        return agg;
    }, 0);

    console.log(`Day 5: pt2. ${result}`)
}


const generateCoordinate = (X, Y) => {
    return `${X},${Y}`;
}

const getCoordinates = (coordinates) => {
    return coordinates.split(',');
}

const getDistance = (startPoint, endPoint) => {
    return startPoint - endPoint;
}

const getDirection = (start, end) => {
    const [sX, sY] = getCoordinates(start);
    const [eX, eY] = getCoordinates(end);
    const diffX = sX - eX;
    const diffY = sY - eY;

    if(diffX !== 0 && diffY !== 0) {
        return 'DIAGONAL';
    } else if (diffX !== 0) {
        return 'HORIZONTAL';
    } else {
        return 'VERTICAL';
    }
}



export default day5