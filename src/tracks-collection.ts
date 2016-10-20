import {Track} from './track';

export class TrackCollection {

    tracks: Track[] = [];

    createAndAddTrack(params) {
        let track: Track = new Track(params);
        this.tracks.push(track);
        return track;
    }

    get length() {
        return this.tracks.length;
    }
}