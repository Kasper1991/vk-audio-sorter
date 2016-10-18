import ArtistsCollection from './artists-collection';
import Collection from './collection';
import Audio from './audio';

let audios: Audio[] = require('./audios'),
    artists: Collection = new ArtistsCollection(audios.slice(0, 100));
