import fs from 'fs';

const day6 = () => {
    let data;
    try {
        data = fs.readFileSync('inputs/day_6.txt', 'utf8');
    } catch (err) {
        console.error(err)
    }

    console.log(`Day 5: ${part1(data)} ${part2(data)}`);
}

const part1 = (data) => {
    let lanternfishs = data.split(',').map(entry => Number(entry));
    let toPush = [];

    for(let i = 0; i < 80; i++) {
        lanternfishs.forEach((lanternfish, idx) => {
            if (lanternfish !== 0) {
                lanternfishs[idx] -= 1;
            } else {
                lanternfishs[idx] = 6;
                toPush.push(8);
            }
        })
        lanternfishs = [...lanternfishs, ...toPush];
        toPush = [];
    }

    return lanternfishs.length;
}

const part2 = (data) => {
    let lanternfishs = [0,0,0,0,0,0,0,0];
    lanternfishs = data.split(',').reduce((agg, entry) => {
        agg[entry] = (agg[entry] || 0) + 1;
        return agg;
    }, lanternfishs);
    
    for(let i = 0; i < 256; i++) {
        let lhs = lanternfishs[0];
        for (let j = 1; j < lanternfishs.length; j++) {
            lanternfishs[j-1] = lanternfishs[j];
        }
        lanternfishs[6] += lhs;
        lanternfishs[8] = lhs;
    }

    return lanternfishs.reduce((a,b) => a+b,0);
}

export default day6