import {Track} from './track';

export class Artist {
    title: string;
    tracks: Track[] = [];

    constructor({title} : {title: string}) {
        this.title = title;
    }

    addTrack(track: Track) {
        this.tracks.push(track);
    }
}