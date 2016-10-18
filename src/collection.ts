import CollectionItem from './collection-item';

abstract class Collection {

    protected items: CollectionItem[];

    constructor() {
        this.items = [];
    }

    abstract create(item: any) : CollectionItem;
    abstract set(items: any[]) : void;

    public add(item: any) : CollectionItem {
        let item: CollectionItem = this.create(item);
        this.items.push(item);
        return item;
    }

    public find(title: string) : CollectionItem {
        return this.items.find((artist: CollectionItem) => artist.title == title);
    }

}

export default Collection;