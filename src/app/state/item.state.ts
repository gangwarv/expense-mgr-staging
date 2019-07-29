import { Item } from '../models/item.model';

export interface ItemState {
    items: Item[];
    loading: boolean;
}