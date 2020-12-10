import * as path from 'path'
import * as fs from 'fs'

function buildUnits(input: string[]): string[] {
    let result = []
    let currentString = '';

    for (let i = 0; i < input.length; i++) {
        if (input[i] === '') {
            result.push(currentString)
            currentString = '';
        } else {
            currentString = `${currentString} ${input[i]}`
        }
    }

    result.push(currentString)

    return result
}

function validUnit(u, p) {
    function unitToObject(u) {
        const elements = u.split(" ")
        const obj = {}
        elements.forEach(element => {
            const [key, value] = element.split(":")
            if (key.length > 0) {
                obj[key] = value;
            }
        });

        return obj
    }

    const r: any = unitToObject(u)

    const part1 = r.byr && r.iyr && r.eyr && r.hgt && r.hcl && r.ecl && r.pid && true;

    if (p === 1) {
        return part1 ? 1 : 0;
    }

    const validBirthYear = (y) => {
        const intYear = parseInt(y)
        return intYear >= 1920 && intYear <= 2002
    }

    const validIssueYear = (y) => {
        const intYear = parseInt(y)
        return intYear >= 2010 && intYear <= 2020        
    }

    const validExpirationYear = (y) => {
        const intYear = parseInt(y)
        return intYear >= 2020 && intYear <= 2030
    }

    const validHeight = (h: string) => {
        const suffix = h.substring(h.length - 2, h.length)
        const intValue = parseInt(h.substring(0, h.length - 2))
        switch(suffix) {
            case 'cm':
                return intValue >= 150 && intValue <= 193
            case 'in':
                return intValue >= 59 && intValue <= 76
            default:
                return false
        }
    }

    const validHairColor = (h: string) => {
        return h.length === 7 && h.charAt(0) === "#" && `#${parseInt(h.substring(1,h.length), 16).toString(16).padStart(6, '0')}` === h
    }

    const validEyeColor = h => {
        return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(h)
    }

    const validPassportId = h => {
        return h.length === 9 && h.split('').map(e => parseInt(e).toString() === e).reduce((a,v) => a && v, true)
    }

    const part2 = part1 &&
        validBirthYear(r.byr) &&
        validIssueYear(r.iyr) &&
        validExpirationYear(r.eyr) &&
        validHeight(r.hgt) &&
        validHairColor(r.hcl) &&
        validEyeColor(r.ecl) &&
        validPassportId(r.pid) &&
        true

    return part2 ? 1 : 0
}

function day4() {
    const parsedInput = function() {
        const raw = fs.readFileSync(path.join(__dirname, 'real-input'), 'utf8')
        const value = [raw.split("\n").map(e => e.replace("\r", ""))][0]
        const units = buildUnits(value)
        console.log(`Part One:${units.map(u => validUnit(u, 1)).reduce((a,v) => a + v, 0)}`)
        console.log(`Part Two:${units.map(u => validUnit(u, 2)).reduce((a,v) => a + v, 0)}`)
    }()
}

export default day4