import { Effect, Actions, ofType } from '@ngrx/effects';
import { Bill } from '../models/bill.model';
import { Injectable } from '@angular/core';

import * as BillActions from '../actions/bill.actions';

import { Observable, of } from 'rxjs';
import { map, delay, tap, mergeMap, switchMap } from 'rxjs/operators';


@Injectable()
export class BillsEffect {
    constructor(private actions: Actions) { }

    @Effect()
    addPost: Observable<BillActions.All> = this.actions
    .pipe(
        ofType(BillActions.ADD_BILL),
        map((action: BillActions.AddBill)=> action.payload),
        switchMap((payload: Bill)=> of(payload)),
        delay(2000),
        map((bill: Bill)=> new BillActions.AddBillSuccess(bill))
    )

}



