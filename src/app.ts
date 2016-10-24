import {Parser} from './parser';
import {VKAudio} from './vk-audio';

let audios: VKAudio[] = require('./audios'),
    parser: Parser = new Parser();

parser
    .setAudios(audios.slice(0, 1000))
    .then(() => {
       console.log(parser)
    });
