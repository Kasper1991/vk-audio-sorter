import Audio from './audio';
import Artist from './artist';
import Collection from './collection';
import CollectionItem from './collection-item';

export default class ArtistsCollection extends Collection {

    constructor() {
        super();
    }

    public put(audio: Audio) : void {
        let artist: Artist = this.find(audio.artist) as Artist;

        if(!artist) {
            artist = this.createAndAdd(audio) as Artist;
        }

        artist.addTrack(audio);
    }

    public create(audio: Audio) : Artist {
        return new Artist(audio);
    }
}