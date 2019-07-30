import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../state/appstate";
import { Observable } from "rxjs";
import { pluck } from "rxjs/operators";
import { GetMonthlyStatements } from "../actions/bill.actions";
import { Statement } from "./../models/statement.model";
import { User } from "../models/user.model";
import { GetUser, GoogleLogin, Logout } from "./../actions/user.actions";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  statements$: Observable<Statement[]>;
  auth$: Observable<User>;
  period: string;

  constructor(private store: Store<AppState>) {
    this.statements$ = store.select("bills").pipe(pluck("statements"));
    this.auth$ = store.select("auth");
  }

  ngOnInit() {
    // this.store.dispatch(new GetMonthlyStatements(1));
    this.store.dispatch(new GetUser());
  }
  signIn() {
    this.store.dispatch(new GoogleLogin());
  } 
  signOut() {
    this.store.dispatch(new Logout());
  }
}
