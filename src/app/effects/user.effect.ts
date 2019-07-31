import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { User } from "../models/user.model";

import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";

import { Observable, of, from } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import * as userActions from "../actions/user.actions";
import { AngularFirestore } from "@angular/fire/firestore";

export type Action = userActions.All;

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  /// effects go here
  @Effect()
  getUser: Observable<Action> = this.actions.pipe(
    ofType(userActions.GET_USER),
    map((action: userActions.GetUser) => action.payload),
    switchMap(payload => this.afAuth.authState),
    map(authData => {
      if (authData) {
        /// User logged in
        console.log(authData);
        const user = new User(
          authData.uid,
          authData.displayName,
          authData.photoURL,
          authData.email
        );
        return new userActions.Authenticated(user);
      } else {
        /// User not logged in
        return new userActions.NotAuthenticated();
      }
    }),
    catchError(err => of(new userActions.AuthError()))
  );

  @Effect()
  login: Observable<Action> = this.actions.pipe(
    ofType(userActions.GOOGLE_LOGIN),

    map((action: userActions.GoogleLogin) => action.payload),
    switchMap(payload => {
      return from(this.googleLogin());
    }),
    map(credential => {
      // successful login
      this.updateUserData(credential);
      return new userActions.GetUser();
    }),
    catchError(err => {
      return of(new userActions.AuthError({ error: err.message }));
    })
  );

  @Effect()
  logout: Observable<Action> = this.actions.pipe(
    ofType(userActions.LOGOUT),

    map((action: userActions.Logout) => action.payload),
    switchMap(payload => {
      return of(this.afAuth.auth.signOut());
    }),
    map(authData => {
      return new userActions.NotAuthenticated();
    }),
    catchError(err => of(new userActions.AuthError({ error: err.message })))
  );

  private googleLogin(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  private updateUserData({
    user: { uid, displayName, email, photoURL },
    metadata: { creationTime, lastSignInTime }
  }): void {
    console.log("userData", this.afAuth.authState);
    const roles = {
      admin: false
    };
    if (
      displayName.toLowerCase().startsWith("manvi") ||
      displayName.toLowerCase().startsWith("vishal")
    ) {
      roles.admin = true;
    }
    this.db
      .collection("users")
      .doc(uid)
      .set({ uid, displayName, email, photoURL,creationTime, lastSignInTime, roles }, { merge: true })
      .then(r=>console.log('success',r))
      .catch(er=>console.log('err', er));
  }
}
