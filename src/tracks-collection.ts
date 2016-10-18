import Audio from './audio';
import Track from './track';
import Collection from './collection';
import CollectionItem from './collection-item';

export default class TracksCollection extends Collection {

    constructor() {
        super();
    }

    public create(audio: Audio) : CollectionItem {
        return new Track(audio);
    }

}