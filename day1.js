import fs from 'fs';

const day1 = () => {
    let data;
    try {
        data = fs.readFileSync('inputs/day_1.txt', 'utf8');
    } catch (err) {
        console.error(err)
    }

    const part1 = data
        .split('\n')
        .map(item => Number(item))
        .reduce((agg, current, idx, arr) => {
            if(idx > 0 && current > arr[idx-1]) {
                agg += 1;
            }
            return agg;
        }, 0);

    console.log(`Day 1 part 1: ${part1}`);


    const part2 = data
        .split('\n')
        .map(item => Number(item))
        .reduce((agg, current, idx, arr) => {
            if(idx + 2 < arr.length) {
                agg.push(current + arr[idx+1] + arr[idx+2]);
            }
            return agg;
        }, [])
        .reduce((agg, current, idx, arr) => {
            if(idx > 0 && current > arr[idx-1]) {
                agg += 1;
            }
            return agg;
        }, 0);


    console.log(`Day 1 part 2: ${part2}`);
}

export default day1