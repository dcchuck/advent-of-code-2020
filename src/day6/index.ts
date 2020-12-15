import { readRawFile } from '../utils';

interface KVStore {
    [key: string]: number;
}

function toCount(c: string): number {
    const letters = c.split('')
    const ans: KVStore = {}

    letters.forEach(letter => {
        ans[letter] = 1
    })

    return Object.values(ans).reduce((a,v) => a + v, 0);
}

function groupToLine(iArr: string[]) {
    const ans: string[] = []
    let tmp = ''
    for (let i = 0; i < iArr.length; i++) {
        if (iArr[i] === '') {
            ans.push(tmp)
            tmp = ''
            continue
        }

        tmp += iArr[i]
    }

    ans.push(tmp)

    return ans
}

function groupToArr(iArr: string[]) {
    const ans: string[][] = []
    let tmp = []
    for (let i = 0; i < iArr.length; i++) {
        if (iArr[i] === '') {
            ans.push(tmp)
            tmp = []
            continue
        }

        tmp.push(iArr[i])
    }

    ans.push(tmp)

    return ans
}

function toAllCount(iArr: string[]): number {
    const tmp: KVStore = {}
    for (let i = 0; i < iArr.length; i++) {
        const v = iArr[i]
        const toArr = v.split('')
        for (let j = 0; j < toArr.length; j++) {
            if (tmp[toArr[j]] === undefined) {
                tmp[toArr[j]] = 1
            } else {
                tmp[toArr[j]] += 1
            }
        }
    }

    const ans = Object.values(tmp).reduce((a,v) => v === iArr.length ? a + 1 : a, 0)

    return ans
}

function day6() {
    const input = readRawFile([__dirname, 'real-input']).split("\n");
    const parsed = input.map(e => e.replace(/\r/g, "").replace(/\n/g, ""))
    function partOne() {
        const groups = groupToLine(parsed)
        const ans = groups.map(e => toCount(e)).reduce((a,v) => a + v, 0)
        console.log(`Part One: ${ans}`)
    }
    partOne()

    function partTwo() {
        const groups = groupToArr(parsed)
        const ans = groups.map(e => toAllCount(e)).reduce((a,v) => a + v, 0)
        console.log(`Part Two: ${ans}`)
    }
    partTwo()
    const answer = parsed.map(e => toCount(e)).reduce((a,v) => a + v, 0)
    // console.log(answer)
}

export default day6