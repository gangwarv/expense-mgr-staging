import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "./../state/appstate";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  auth$: Observable<User>;

  constructor(public router: Router, private store: Store<AppState>) {
    this.auth$ = this.store.select("auth");
  }
  canActivate(): Observable<boolean> {
    return this.auth$.pipe(
      map((auth: User) => {
        if (!(auth && auth.uid)) {
          this.router.navigateByUrl("/home");
        }
        return !!(auth && auth.uid);
      })
    );
  }
}
