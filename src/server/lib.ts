import { constants, existsSync, readFileSync } from 'node:fs';
import { access } from 'node:fs/promises';


// Constants

export const DIR = process.cwd();


// System Functions

export function audit(val: any): string {
    switch (typeof val) {
        case 'string':
            return `'${val}'`;
        case 'object':
            return JSON.stringify(val);
        default:
            return String(val);
    }
}


// Checking Functions

export function isset<T>(val: T): val is NonNullable<T> {
    return val !== null && val !== undefined;
}

export function has(obj: types.Obj, key: string): boolean {
    return obj.hasOwnProperty(key);
}

export function inarr(val: any, ...arr: any): boolean {
    return arr.includes(val);
}

export async function isExists(filename: string): Promise<boolean> {
    try { return !!await access(filename, constants.F_OK); }
    catch { return false; }
}

export function isExistsSync(filename: string): boolean {
    return existsSync(filename);
}


// Getting Functions

export function getFileSync(filename: string, options: any = 'utf8'): any {
    if (isExistsSync(filename))
        return readFileSync(filename, options);
    else
        return null;
}
