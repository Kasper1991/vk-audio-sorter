import Audio from './audio';
import Track from './track';
import Artist from './artist';
import Collection from './collection';
import CollectionItem from './collection-item';

export default class TracksCollection extends Collection {

    constructor() {
        super();
    }

    public put(audio: Audio) : void {
        let isExists: boolean = this.contains(audio.title),
            track: Track = this.create(audio) as Track;

        if(isExists) {
            track.markToRemove();
        }

        this.add(track);
    }

    public create(audio: Audio) : CollectionItem {
        return new Track(audio);
    }
}