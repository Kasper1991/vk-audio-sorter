import {Track} from './track';
import {Collection, CollectionItem} from './collection';

export class TracksCollection extends Collection {

    public create(params) : CollectionItem {
        return new Track(params);
    }
}