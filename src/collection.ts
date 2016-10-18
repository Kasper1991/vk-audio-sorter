import Audio from './audio';
import CollectionItem from './collection-item';

abstract class Collection {

    protected items: CollectionItem[];

    constructor() {
        this.items = [];
    }

    abstract put(item: Audio) : void;

    abstract create(item: Audio) : CollectionItem;

    public set(items: Audio[]) : void {
        items.forEach((item: Audio) : void => {
            this.put(item);
        });
    }

    public add(item: CollectionItem) : CollectionItem {
        this.items.push(item);
        return item;
    }

    public contains(title: string) : boolean {
        return this.find(title) != null;
    }

    public find(title: string) : CollectionItem {
        return this.items.find((item: CollectionItem) : boolean => {
            return item.titleIsEquals(title);
        });
    }

    public createAndAdd(item: Audio) : CollectionItem {
        return this.add(this.create(item));
    }
}

export default Collection;