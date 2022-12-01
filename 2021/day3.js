import fs from 'fs';

const day3 = () => {
    let data;
    try {
        data = fs.readFileSync('inputs/day_3.txt', 'utf8');
    } catch (err) {
        console.error(err)
    }

    const rows = data.split('\n');
    const powerConsumption = calculatePowerConsumption(rows);
    const oxygenRating = calculateOxGenRating(rows);
    const co2ScrubRating = calculateCO2ScrubRating(rows);
    const lifeSupportRating = oxygenRating * co2ScrubRating;
    console.log(`Day 3 part 1: (${powerConsumption}), part 2: (O2 rating: ${oxygenRating}, CO2 Scrub Rating: ${co2ScrubRating}, Life Support Rating: ${lifeSupportRating})`);
}

const calculatePowerConsumption = (rows) => {
    const allOnes = rows
        .reduce((agg, value, idx, arr) => {
            const splitString = value.split('');
            return splitString.map((value, idx2) => agg[idx2] = (agg[idx2] || 0) + (Number(value) === 0 ? 0 : 1))
        }, []);
    
    const gamma = parseInt(allOnes.map(value => value > rows.length/2 ? 1 : 0).join(''), 2);
    const epsilon = parseInt(allOnes.map(value => value > rows.length/2 ? 0 : 1).join(''), 2);
    return gamma * epsilon;
}

const calculateOxGenRating = (rows) => {
    for (let column = 0; rows.length > 1 && column < rows[0].length; column++) {
        let oneCount = rows.reduce((agg, value) => {
            return agg += (Number(value[column]) === 1 ? 1 : 0);
        }, 0);
        rows = rows.filter((value) => {
            return Number(value[column]) === (oneCount >= rows.length/2 ? 1 : 0);
        });
    }
    return parseInt(rows[0], 2);
}

const calculateCO2ScrubRating = (rows) => {
    for (let column = 0; rows.length > 1 && column < rows[0].length; column++) {
        let oneCount = rows.reduce((agg, value) => {
            return agg += (Number(value[column]) === 1 ? 1 : 0);
        }, 0);
        rows = rows.filter((value) => {
            return Number(value[column]) === (oneCount < rows.length/2 ? 1 : 0);
        });
    }
    return parseInt(rows[0], 2);
}
export default day3