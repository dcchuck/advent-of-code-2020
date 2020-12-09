import * as fs from 'fs'
import * as path from 'path'

function stringToLine(s: string): string[] {
    return s.split('').filter(e => e !== '\r')
}

function day3() {
    const parsedInput = function() {
        const data = fs.readFileSync(path.join(__dirname, 'real-input'), "utf8");
        const values = data.split("\n").map(e => stringToLine(e));
        return values
    }()

    const tree = '#'
    const yIncrement = 1
    const xIncrement = 3
    const columnNumberBaseZero = parsedInput[0].length - 1

    function runSlope(xIncrement, yIncrement) {
        let x = 0;
        let treesHit = 0

        for (let y = 0; y < parsedInput.length; y += yIncrement) {
            if (parsedInput[y][x] === tree) {
                treesHit += 1
            }
            x += xIncrement
    
            if (x > columnNumberBaseZero) {
                x -= (columnNumberBaseZero + 1)
            }
        }

        return treesHit
    }

    console.log(`Part One: ${runSlope(3, 1)}`)

    const partTwoSlopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ]

    console.log(`Part Two: ${partTwoSlopes.map(e => runSlope(e[0], e[1])).reduce((a,v) => a * v, 1)}`)
}

export default day3