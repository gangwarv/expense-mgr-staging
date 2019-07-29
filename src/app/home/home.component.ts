import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../state/appstate";
import { Observable } from "rxjs";
import { pluck } from "rxjs/operators";
import { GetMonthlyStatements } from "../actions/bill.actions";
import { Statement } from "./../models/statement.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  statements$: Observable<Statement[]>;
  period: string;

  constructor(private store: Store<AppState>) {
    this.statements$ = store.select("bills").pipe(pluck("statements"));
  }

  ngOnInit() {
    this.store.dispatch(new GetMonthlyStatements(1));
  }
}
