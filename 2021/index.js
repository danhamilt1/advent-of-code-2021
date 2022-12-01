import day1 from './day1.js';
import day2 from './day2.js';
import day3 from './day3.js';
import day4 from './day4.js';
import day5 from './day5.js';
import day6 from './day6.js';

const toRun = [day1, day2, day3, day4, day5, day6];

toRun.forEach((day, idx) => {
    console.time(`Execution time`);
    day();
    console.timeEnd(`Execution time`);
    console.log('\n--------------------------------\n');
});