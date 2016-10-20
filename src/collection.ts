import {CollectionItem} from './collection-item';

export abstract class Collection {

    public items: CollectionItem[] = [];

    public abstract createAndAdd(params);
}