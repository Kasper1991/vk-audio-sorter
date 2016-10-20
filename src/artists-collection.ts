import {Artist} from './artist';
import {Collection, CollectionItem} from './collection';

export class ArtistsCollection extends Collection {

    public create(params) : CollectionItem {
        return new Artist(params);
    }
}