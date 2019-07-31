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
      this.db
        .collection<Statement>("monthlystatements", ref =>
          ref.orderBy("id", "desc")
        )
        .valueChanges()
    ),
    map(
      (statements: Statement[]) =>
        new BillActions.GetMonthlyStatementsSuccess(
          statements.map(x => this.toStatement(x))
        )
    )
  );

  @Effect()
  getBills: Observable<BillActions.All> = this.actions.pipe(
    ofType(BillActions.GET_BILLS),
    map((action: BillActions.GetBills) => action.payload),
    switchMap((monthId: string) =>
      this.db.collection<Bill>("expenses", ref=> ref.where("monthId","==", monthId)).valueChanges()
    ),
    map((data: Bill[]) => new BillActions.GetBillsSuccess(data.map(x=>this.toBill(x))))
  );

  @Effect()
  addBill: Observable<BillActions.All> = this.actions.pipe(
    ofType(BillActions.ADD_BILL),
    map((action: BillActions.AddBill) => action.payload),
    switchMap((bill: Bill) => from(this.db.collection("expenses").add(bill))),
    map(docRef => docRef.get()),
    switchMap(docSnap => from(docSnap)),
    map(snap => snap.data()),
    tap(snap1 => console.log("returned snap", snap1)),
    map((bill: Bill) => new BillActions.AddBillSuccess(bill))
  );
  private Months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "APR",
    "MAY",
    "JUN",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];
  private toStatement(stmt): Statement {
    let name = `${this.Months[+stmt.id.substr(4)]}-${stmt.id.substr(0, 4)}`;
    return {
      ...stmt,
      name
    };
  }
  private toBill(bill): Bill {
    let monthName = `${this.Months[+bill.monthId.substr(4)]}-${bill.monthId.substr(0, 4)}`;
    return {
      ...bill,
      name
    };
  }
  private toMonthString(id: string): string {
    return `${this.Months[+id.substr(4)]}-${id.substr(0, 4)}`;
  }
}
