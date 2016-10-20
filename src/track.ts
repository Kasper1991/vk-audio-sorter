export class Track {

    artist: any;
    title: string;
    id: number;

    constructor({title, id, artist} : {title: string, id: number, artist: any}) {
        this.artist = artist;
        this.title = title;
        this.id = id;
    }
}