import ArtistsCollection from './artists-collection';
import Collection from './collection';
import Audio from './audio';

let audios: Audio[] = require('./audios'),
    artists: Collection = new ArtistsCollection();

artists.set(audios);

console.log(artists);
