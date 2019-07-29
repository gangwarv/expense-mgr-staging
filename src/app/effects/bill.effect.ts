import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { AngularFirestore } from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
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
  addPost: Observable<BillActions.All> = this.actions.pipe(
    ofType(BillActions.ADD_BILL),
    map((action: BillActions.AddBill) => action.payload),
    switchMap((payload: Bill) => of(payload)),
    delay(2000),
    map((bill: Bill) => new BillActions.AddBillSuccess(bill))
  );
}
