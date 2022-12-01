import fs from 'fs';

const day1 = () => {
    let data;
    try {
        data = fs.readFileSync('inputs/day_1.txt', 'utf8');
    } catch (err) {
        console.error(err)
    }

    const part1 = data
        .split('\n\n')
        .map(elfCarry => {
            return elfCarry
                .split('\n')
                .map(number => Number(number))
                .reduce((agg, item) => agg += item, 0);
        })
        .reduce((agg, item) => item > agg ? item : agg);

    console.log(`Day 1 part 1: ${part1}`);

    const part2 = data
    .split('\n\n')
    .map(elfCarry => {
        return elfCarry
            .split('\n')
            .map(number => Number(number))
            .reduce((agg, item) => agg += item, 0);
    })
    .sort((a, b) => b-a)
    .slice(0, 3)
    .reduce((agg, item) => agg + item, 0);

console.log(`Day 1 part 2: ${part2}`);
}

export default day1