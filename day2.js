import fs from 'fs';

const day2 = () => {
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
            if(idx + 2 < arr.length) {
                agg.push(current + arr[idx+1] + arr[idx+2]);
            }
            return agg;
        }, [])
        .reduce((agg, current, idx, arr) => {
            console.log(arr);
            if(idx > 0 && current > arr[idx-1]) {
                agg += 1;
            }
            return agg;
        }, 0);


    console.log(`Day 2: ${increases}`);
}

export default day2