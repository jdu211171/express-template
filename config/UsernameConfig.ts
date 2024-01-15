import {Config, uniqueUsernameGenerator} from 'unique-username-generator';
import {japanese_names} from "./Constants";

export const config: Config = {
    dictionaries: [japanese_names],
    separator: '',
    style: 'capital',
    randomDigits: 2
}
