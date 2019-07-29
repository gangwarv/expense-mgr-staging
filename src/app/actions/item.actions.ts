import { Action } from '@ngrx/store';
import { Item } from '../models/item.model';

export const GET_ITEMS = 'GET_ITEMS';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';

export const ADD_ITEM = 'ADD_ITEM';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILED = 'ADD_ITEM_FAILED';

export type All = GetItems | GetItemsSuccess | AddItem | AddItemSuccess | AddItemSFailed;

export class GetItems implements Action {
    readonly type = GET_ITEMS;
    constructor(public payload: string) { }
}

export class GetItemsSuccess implements Action {
    readonly type = GET_ITEMS_SUCCESS;
    constructor(public payload: Item[]) { }
}

export class AddItem implements Action {
    readonly type = ADD_ITEM;
    constructor(public payload: Item) { }
}

export class AddItemSuccess implements Action {
    readonly type = ADD_ITEM_SUCCESS;
    constructor(public payload: Item) { }
}
export class AddItemSFailed implements Action {
    readonly type = ADD_ITEM_FAILED
    constructor(public payload: string) { }
}