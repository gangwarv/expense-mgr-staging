import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../state/appstate";
import { Observable, combineLatest } from "rxjs";
import { pluck, map } from "rxjs/operators";
import { GetMonthlyStatements, GetBills } from "../actions/bill.actions";
import { Statement } from "./../models/statement.model";
import { User } from "../models/user.model";
import { GetUser, GoogleLogin, Logout } from "./../actions/user.actions";
import { Bill } from "./../models/bill.model";
import { MatSelectChange } from "@angular/material";
import { GetItems } from "./../actions/item.actions";
import { Item } from "./../models/item.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  statements$: Observable<Statement[]>;
  bills$: Observable<Bill[]>;
  items$: Observable<Item[]>;
  billItems$: Observable<Bill[]>;
  auth$: Observable<User>;

  period: string;

  constructor(private store: Store<AppState>) {
    this.items$ = store.select("items").pipe(pluck("items"));
    this.bills$ = store.select("bills").pipe(pluck("items"));
    this.statements$ = store.select("bills").pipe(pluck("statements"));
    this.auth$ = store.select("auth");

    this.billItems$ = combineLatest(this.bills$, this.items$).pipe(
      map(([bills, items]) => {
        return bills.map(bi=>({...bi, itemName: items.find(it=>it.id === bi.itemId).name}));
      })
    );
  }

  ngOnInit() {
    this.store.dispatch(new GetMonthlyStatements(6));
    this.store.dispatch(new GetUser());
    this.store.dispatch(new GetItems(""));
  }
  onMonthChange(event: MatSelectChange) {
    console.log(event.value);
    this.store.dispatch(new GetBills(event.value));
  }
  signIn() {
    this.store.dispatch(new GoogleLogin());
  }
  signOut() {
    this.store.dispatch(new Logout());
  }
}
