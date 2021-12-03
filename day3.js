import fs from 'fs';

const day3 = () => {
    let data;
    try {
        data = fs.readFileSync('inputs/day_3.txt', 'utf8');
    } catch (err) {
        console.error(err)
    }

    const powerConsumption = calculatePowerConsumption(data);
    const oxygenRating = calculateOxGenRating(data);
    const co2ScrubRating = calculateCO2ScrubRating(data);
    const lifeSupportRating = oxygenRating * co2ScrubRating;
    console.log(`Day 3 part 1: (${powerConsumption}), part 2: (O2 rating: ${oxygenRating}, CO2 Scrub Rating: ${co2ScrubRating}, Life Support Rating: ${lifeSupportRating})`);
}

const calculatePowerConsumption = (values) => {
    const lines = values.split('\n');
    const allOnes = lines
        .reduce((agg, value, idx, arr) => {
            const splitString = value.split('');
            return splitString.map((value, idx2) => agg[idx2] = (agg[idx2] || 0) + (Number(value) === 0 ? 0 : 1))
        }, []);
    
    const gamma = parseInt(allOnes.map(value => value > lines.length/2 ? 1 : 0).join(''), 2);
    const epsilon = parseInt(allOnes.map(value => value > lines.length/2 ? 0 : 1).join(''), 2);
    return gamma * epsilon;
}

const calculateOxGenRating = (values) => {
    let lines = values.split('\n');
    for (let i = 0; lines.length > 1 && i < lines[0].length; i++) {
        let oneCount = lines.reduce((agg, value) => {
            return agg += (Number(value[i]) === 1 ? 1 : 0);
        }, 0);
        lines = lines.filter((value) => {
            return Number(value[i]) === (oneCount >= lines.length/2 ? 1 : 0);
        });
    }
    return parseInt(lines[0], 2);
}

const calculateCO2ScrubRating = (values) => {
    let lines = values.split('\n');
    for (let i = 0; lines.length > 1 && i < lines[0].length; i++) {
        let oneCount = lines.reduce((agg, value) => {
            return agg += (Number(value[i]) === 1 ? 1 : 0);
        }, 0);
        lines = lines.filter((value) => {
            return Number(value[i]) === (oneCount < lines.length/2 ? 1 : 0);
        });
    }
    return parseInt(lines[0], 2);
}
export default day3