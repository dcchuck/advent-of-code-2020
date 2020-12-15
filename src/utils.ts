import * as fs from 'fs';
import * as path from 'path';

function readRawFile(pathElements: string[]) {
    return fs.readFileSync(path.join(...pathElements), 'utf-8')
}

export {
    readRawFile
}