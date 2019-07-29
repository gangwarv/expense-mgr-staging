import { Effect, Actions, ofType } from '@ngrx/effects';
import { Item } from '../models/item.model';
import { Injectable } from '@angular/core';

import * as ItemActions from '../actions/item.actions';

import { Observable, of } from 'rxjs';
import { map, delay, tap, mergeMap, switchMap } from 'rxjs/operators';

const items: Item[] = [
    {
        id:'-1',
        name: 'Pen',
        defaultPrice: 12,
    },
    {
        id:'0',
        name: 'Milk',
        defaultPrice: 28,
    }
]

@Injectable()
export class itemEffects {
    constructor(private actions: Actions) { }

    @Effect()
    getItems: Observable<ItemActions.All> = this.actions
        .pipe(
            ofType(ItemActions.GET_ITEMS),
            map((action: ItemActions.GetItems) => action.payload),
            delay(2000)
            //, tap(ac => console.log('actions tap', ac))
            // , switchMap(payload => {
            //     console.log('action',payload)
            //     return of(items)
            // })
            , mergeMap(payload => {
                console.log('action',payload)
                return of(items)
            })
            // , mergeMap(payload => of(items))
            , map(data => new ItemActions.GetItemsSuccess(data))
        );

}