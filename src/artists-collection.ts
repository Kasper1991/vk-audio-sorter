import {Artist} from './artist';
import {Collection, CollectionItem} from './collection';

export class ArtistsCollection extends Collection {

    constructor(options) {
        super(options);
    }

    public create(params) : CollectionItem {
        return new Artist(params);
    }
}