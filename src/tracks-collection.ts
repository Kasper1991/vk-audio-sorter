import {Track} from './track';
import {Collection, CollectionItem} from './collection';

export class TracksCollection extends Collection {

    constructor(options) {
        super(options);
    }

    public create(params) : CollectionItem {
        return new Track(params);
    }

    public handleDuplicated(track: Track) : CollectionItem {
        track.shouldBeRemoved = true;
        return track;
    }
}