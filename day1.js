import fs from 'fs';

const day1 = () => {
    let data;
    try {
        data = fs.readFileSync('inputs/day_1.txt', 'utf8');
    } catch (err) {
        console.error(err)
    }

    const increases = data
        .split('\n')
        .map(item => Number(item))
        .reduce((agg, current, idx, arr) => {
            if(idx > 0 && current > arr[idx-1]) {
                agg += 1;
            }
            return agg;
        }, 0);

    console.log(increases);
}

export default day1