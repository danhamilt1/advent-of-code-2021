import fs from 'fs';

const day6 = () => {
    let data;
    try {
        data = fs.readFileSync('inputs/day_6.txt', 'utf8');
    } catch (err) {
        console.error(err)
    }

    console.log(`Day 6: ${part1(data)} ${part2(data)}`);
}

/**
 * A literal representation as an array (array grows too big when we get to larger numbers of lampfish reproducing)
 */
const part1 = (data) => {
    let lanternfishs = data.split(',').map(entry => Number(entry));
    let toPush = [];

    for(let i = 0; i < 80; i++) {
        lanternfishs.forEach((lanternfish, idx) => {
            if (lanternfish !== 0) { // If a lampfish isn't 0 years old then we take a year off it's age
                lanternfishs[idx] -= 1;
            } else { // Otherwise we reproduce and reset age
                lanternfishs[idx] = 6;
                toPush.push(8);
            }
        })

        // Set and reset
        lanternfishs = [...lanternfishs, ...toPush];
        toPush = [];
    }

    return lanternfishs.length;
}

/**
 * Represents numbers of lampfish at a given age
 */
const part2 = (data) => {
    const numberOfFishAtAge = data.split(',').reduce((agg, entry) => {
        agg[entry] = (agg[entry] || 0) + 1;
        return agg;
    }, [0,0,0,0,0,0,0,0]);
    
    for(let i = 0; i < 256; i++) {
        // Store fish due to reproduce
        const fishToReproduce = numberOfFishAtAge[0];

        // Make age adjustments
        for (let j = 1; j < numberOfFishAtAge.length; j++) {
            numberOfFishAtAge[j-1] = numberOfFishAtAge[j];
        }

        // Reproduce
        numberOfFishAtAge[6] += fishToReproduce;
        numberOfFishAtAge[8] = fishToReproduce;
    }

    return numberOfFishAtAge.reduce((a,b) => a+b,0);
}

export default day6