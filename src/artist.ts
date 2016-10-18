import Audio from './audio';
import Track from './track';
import Collection from './collection';
import CollectionItem from './collection-item';
import TracksCollection from './tracks-collection';

export default class Artist extends CollectionItem {

    private tracks: Collection;

    constructor(audio: Audio) {
        super(audio.artist);

        this.tracks = new TracksCollection();
    }

    public addTrack(audio: Audio) : void {
        this.tracks.put(audio);
    }
}