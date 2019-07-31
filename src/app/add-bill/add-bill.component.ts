import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable, BehaviorSubject, Subscription } from "rxjs";
import { Item } from "../models/item.model";
import { Store } from "@ngrx/store";
import { AppState } from "../state/appstate";
import { Bill } from "../models/bill.model";
import {
  AddBill,
  AddBillSuccess,
  GetBills,
  GetMonthlyStatements
} from "../actions/bill.actions";
import { GetItems } from "./../actions/item.actions";
import { MatSelectChange } from "@angular/material";
import { pluck } from "rxjs/operators";

@Component({
  selector: "app-add-bill",
  templateUrl: "./add-bill.component.html",
  styleUrls: ["./add-bill.component.scss"]
})
export class AddBillComponent implements OnInit {
  selectedItemDefaultAmount: number = null;
  subscription: Subscription;
  billForm: FormGroup;

  items$: Observable<Item[]>;
  items: Item[];
  bills$: Observable<Bill[]>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.billForm = fb.group({
      itemId: ["", Validators.required],
      amount: [
        null,
        Validators.compose([Validators.required, Validators.min(1)])
      ],
      quantity: ["Quantity 1", Validators.required],
      billDate: [new Date().toISOString(), Validators.required],
      createdAt: [new Date(), Validators.required],
      monthId: [null, Validators.required]
    });

    this.items$ = this.store.select("items").pipe(pluck("items"));
    this.bills$ = this.store.select("bills");
  }

  onSubmit() {
    this.store.dispatch(new AddBill({ ...this.billForm.value, billDate: new Date(this.billForm.value.billDate) }));
  }
  onItemChange(event: MatSelectChange) {
    this.selectedItemDefaultAmount = this.items.find(x=>x.id===event.value).defaultPrice;
  }
  ngOnInit() {
    this.store.dispatch(new GetMonthlyStatements(2));
    this.store.dispatch(new GetItems(""));
    this.store.dispatch(new GetBills("201907"));

    this.subscription = this.items$.subscribe(value => {
      this.items = value;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
