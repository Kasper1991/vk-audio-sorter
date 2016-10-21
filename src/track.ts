import {Artist} from './artist';
import {CollectionItem} from './collection';

export class Track extends CollectionItem {

    public shouldBeRemoved: boolean = false;
    public artist: Artist;
    public id: number;

    constructor({title, id, artist} : {title: string, id: number, artist: Artist}) {
        super(title);

        this.artist = artist;
        this.id = id;
    }
}