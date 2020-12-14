import * as fs from 'fs'
import * as path from 'path'

function day5() {
    const input = function() {
        const input = fs.readFileSync(path.join(__dirname, 'real-input'), 'utf-8');
        const elements = input.split("\n").map(e => e.replace("\r", ""));
        const translatedElements = elements.map(e =>
            parseInt(
                e.replace(/B/g, "1").replace(/F/g, "0").replace(/R/g, "1").replace(/L/g, "0"),
                2
            )
        )
            
        return translatedElements;
    }()

    const maxId = Math.max(...input)
    const minId = Math.min(...input)
    console.log(maxId)
    console.log(minId)

    for (let i = minId; i < maxId - 1; i++) {
        if (!input.includes(i + 1)) {
            console.log(`You are seat ${i + 1}`)
        }
    }
}

export default day5