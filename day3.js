import fs from 'fs';

const day3 = () => {
    let data;
    try {
        data = fs.readFileSync('inputs/day_3.txt', 'utf8');
    } catch (err) {
        console.error(err)
    }

    calculateGamma(data);
}

const calculateGamma = (values) => {
    const lines = values.split('\n');
    const allOnes = lines
        .reduce((agg, value, idx, arr) => {
            const splitString = value.split('');
            return splitString.map((value, idx2) => agg[idx2] = (agg[idx2] || 0) + (Number(value) === 0 ? 0 : 1))
        }, []);
    
    const gamma = parseInt(allOnes.map(value => value > lines.length/2 ? 1 : 0).join(''), 2);
    const epsilon = parseInt(allOnes.map(value => value > lines.length/2 ? 0 : 1).join(''), 2);
    console.log(`Day 3: ${gamma * epsilon}`);
}

export default day3