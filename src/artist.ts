import Audio from './audio';
import Collection from './collection';
import CollectionItem from './collection-item';
import TracksCollection from './tracks-collection';

export default class Artist extends CollectionItem {

    private tracks: Collection;

    constructor(title: string) {
        super(title);
        this.tracks = new TracksCollection();
    }

    public addTrack(audio: Audio) : void {}
}