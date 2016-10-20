import {Track} from './track';
import {Collection, CollectionItem} from './collection';

export class TrackCollection extends Collection {

    items: Track[] = [];

    createAndAdd(params) {
        let track: Track = new Track(params);
        this.items.push(track);
        return track;
    }

    get length() {
        return this.items.length;
    }
}