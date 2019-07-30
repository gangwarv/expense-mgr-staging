import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { AngularFirestore } from "@angular/fire/firestore";

import { Observable, of, from } from "rxjs";
import { map, delay, tap, mergeMap, switchMap } from "rxjs/operators";

import { Bill } from "../models/bill.model";
import * as BillActions from "../actions/bill.actions";
import { Statement } from "./../models/statement.model";

@Injectable()
export class BillsEffect {
  constructor(private actions: Actions, private db: AngularFirestore) {}

  @Effect()
  getStatements: Observable<BillActions.All> = this.actions.pipe(
    ofType(BillActions.GET_MONTHLY_STATEMENTS),
    map((action: BillActions.GetMonthlyStatements) => action.payload),
    switchMap((limit: number) =>
      this.db.collection<Statement>("monthlystatements").valueChanges()
    ),
    map(
      (statements: Statement[]) =>
        new BillActions.GetMonthlyStatementsSuccess(statements)
    )
  );

  @Effect()
  addBill: Observable<BillActions.All> = this.actions.pipe(
    ofType(BillActions.ADD_BILL),
    map((action: BillActions.AddBill) => action.payload),
    switchMap((bill: Bill) => from(this.db.collection('expenses').add(bill))),
    map(docRef=> docRef.get()),
    switchMap(docSnap=> from(docSnap)),
    map(snap=>snap.data()),
    tap(snap1=>console.log('returned snap', snap1)),
    map((bill: Bill) => new BillActions.AddBillSuccess(bill))
  );
}
