import { v4 as uuidv4 } from 'uuid';

export function createUniqueUsername(unique_number: number): string {
    return `${unique_number}_${uuidv4()}`;
}