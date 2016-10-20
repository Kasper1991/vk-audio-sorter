export abstract class Collection {

    public items: CollectionItem[] = [];

    public abstract createAndAdd(params) : CollectionItem;
}

export abstract class CollectionItem {
    public title: string;
}