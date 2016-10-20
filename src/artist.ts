import {Track} from './track';
import {CollectionItem} from './collection';

export class Artist extends CollectionItem {

    public tracks: Track[] = [];

    constructor({title} : {title: string}) {
        super(title);
    }

    addTrack(track: Track) {
        this.tracks.push(track);
    }
}