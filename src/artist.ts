import {Track} from './track';
import {CollectionItem} from './collection';
import {TracksCollection} from './tracks-collection';

export class Artist extends CollectionItem {

    public tracks: TracksCollection = new TracksCollection({
        uniqueOnly: false,
        processDuplicate: true
    });

    constructor({title} : {title: string}) {
        super(title);
    }

    public async addTrack(track: Track) : Promise<void> {
        this.tracks.processItem(track);
    }
}