export default class Parser{

    tracks: any[] = [];
    artists: any[] = [];

    public set(audios: any[]) : void {
        audios.forEach((audio) => {
            let isExists = this.findArtistByTitle(audio.artist);

            if(!isExists) {
                isExists = {
                    title: audio.artist,
                    tracks: []
                };
                this.artists.push(isExists);
            }

            let track  = {
                title: audio.title,
                id: audio.aid,
                artist: isExists
            };

            isExists.tracks.push(track);
            this.tracks.push(track);
        })
    }

    public findArtistByTitle(title: string) {
        return this.artists.find((artist) => {
            let title1 = title.trim().toLowerCase(),
                title2 = artist.title.trim().toLowerCase();
            return title1 == title2;
        })
    }
}