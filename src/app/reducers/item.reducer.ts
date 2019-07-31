import * as ItemActions from '../actions/item.actions';
import { ItemState } from '../state/item.state';

const defaultState: ItemState = {
    items: [],
    loading: false
}
export function itemReducer(state: ItemState = defaultState, action: ItemActions.All): ItemState {
    switch (action.type) {
        case ItemActions.GET_ITEMS:
            return { ...state, loading: true }
        case ItemActions.GET_ITEMS_SUCCESS:
            return { ...state, items: action.payload, loading: false }
        default: return state;
    }
}