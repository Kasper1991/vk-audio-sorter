export abstract class Collection {

    protected options;
    protected items: CollectionItem[] = [];

    constructor(options = {}) {
        this.options = options;
    }

    public abstract create(params) : CollectionItem;

    public get length() {
        return this.items.length;
    }

    public async process(params) : Promise<CollectionItem> {
        let item = this.create(params);
        item = await this.processItem(item);
        return item;
    }

    public async processItem(item: CollectionItem) : Promise<CollectionItem> {
        let duplicate = await this.find(item);

        if(duplicate) {
            if(this.options.uniqueOnly) {
                return duplicate;
            }

            if(this.options.processDuplicate) {
                this.processDuplicate(item);
            }
        }

        return this.add(item);
    }

    public async find(toFind: CollectionItem) : Promise<CollectionItem> {
        for(let item of this.items) {
            let isEquals = await this.isEquals(item, toFind);
            if(isEquals) return item;
        }
    }

    public async isEquals(item1: CollectionItem, item2: CollectionItem) : Promise<boolean> {
        let title1 = item1.title.trim().toLowerCase(),
            title2 = item2.title.trim().toLowerCase();

        return title1 == title2;
    }

    public add(item: CollectionItem) : CollectionItem {
        this.items.push(item);
        return item;
    }

    public processDuplicate(item: CollectionItem) : void {}
}

export abstract class CollectionItem {
    public title: string;

    constructor(title: string) {
        this.title = title;
    }
}