import * as fs from 'fs';
import * as path from 'path';

const TARGET = 2020

const createInputArray = (): number[] => {
    const data = fs.readFileSync(path.join(__dirname, 'input'), "utf8");
    const values = data.split("\n").map(e => parseInt(e));
    return values
}

const input = createInputArray()
const inputHash = {}

for (let i = 0; i < input.length; i++) {
    inputHash[input[i].toString()] = 1
}

function targetSum(target: number) {
    for (let i = 0; i < input.length; i++) {
        const val = input[i]
        const targ = target - val
        if (inputHash[targ.toString()]) {
            console.log(`Answer: ${val * targ}`);
            console.log(`Numbers: ${val} - ${targ}`)
            return true
        }
    }

    return false
}

const day1 = () => {
    /**
     * Just two
     */
    targetSum(TARGET)

    /**
     * Now we want three...
     */
    for (let i = 0; i < input.length; i++) {
        const v = input[i]
        if (targetSum(TARGET - v)) {
            console.log(`Here it is: ${v}`)
        }
    }
}

export default day1