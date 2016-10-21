import {Parser} from './parser';
import {VKAudio} from './vk-audio';

let audios: VKAudio[] = require('./audios'),
    parser: Parser = new Parser();

parser
    .setAudios(audios)
    .then(() => {
       console.log(parser)
    });
