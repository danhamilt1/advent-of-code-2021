import fs from 'fs';

const day2 = () => {
    let data;
    try {
        data = fs.readFileSync('inputs/day_2.txt', 'utf8');
    } catch (err) {
        console.error(err)
    }

    const part1Result = Object.values(data
        .split('\n')
        .reduce((agg, value) => {
            const command = value.split(' ');
            if (command[0] === 'forward') {
                agg.horizontal += Number(command[1]);
            } else if (command[0] === 'up') {
                agg.depth -= Number(command[1]);
            } else {
                agg.depth += Number(command[1]);
            }
            return agg;
        }, {horizontal: 0, depth: 0})).reduce((a,b) => a*b);

    const part2Result = data
        .split('\n')
        .reduce((agg, value) => {
            const command = value.split(' ');
            if (command[0] === 'forward') {
                agg.horizontal += Number(command[1]);
                agg.depth += agg.aim === 0 ? 0 : Number(command[1]) * agg.aim;
            } else if (command[0] === 'up') {
                agg.aim -= Number(command[1]);
            } else {
                agg.aim += Number(command[1]);
            }
            return agg;
        }, {horizontal: 0, depth: 0, aim: 0});
    

    console.log(`Day 2: ${part1Result} ${part2Result.horizontal * part2Result.depth}`);
}

export default day2