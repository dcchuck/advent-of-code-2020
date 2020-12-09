import * as fs from 'fs'
import * as path from 'path'

interface ILine {
    range: [number, number];
    character: string;
    value: string;
}

function stringToLine(l: string): ILine {
    const els = l.split(" ")

    return {
        range: els[0].split('-').map(e => parseInt(e)) as [number, number],
        character: els[1][0],
        value: els[2]
    }
}

function validRow(a: ILine) {
    const charCount = a.value.length - a.value.split(a.character).join('').length
    return ((charCount >= a.range[0]) && (charCount <= a.range[1]))
}

function partTwoValid(a: ILine) {
    const positionOne = a.value[a.range[0] - 1] === a.character ? 1 : 0
    const positionTwo = a.value[a.range[1] - 1] === a.character ? 1 : 0

    return (positionOne + positionTwo) === 1
}

function day2() {
    console.log('PLAYING DAY 2')
    const parsedInput = function() {
        const data = fs.readFileSync(path.join(__dirname, 'input'), "utf8");
        const values = data.split("\n").map(e => stringToLine(e));
        return values
    }()

    const valid = parsedInput.filter(e => validRow(e))

    console.log(`Day 2 Value: ${valid.length}`)

    const answerTwo = parsedInput.filter(e => partTwoValid(e))

    console.log(`Day 2 Answer 2: ${answerTwo.length}`)
}

export default day2