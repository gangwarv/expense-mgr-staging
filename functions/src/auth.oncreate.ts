import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const AuthUserCreate = functions.auth.user().onCreate(user => {
  const db = admin.firestore();

  const userData = { ...user, roles: { admin: false } };
  if (
    user &&
    user.displayName &&
    (user.displayName.toLowerCase().indexOf("manvi") > -1 ||
      user.displayName.toLowerCase().indexOf("vishal") > -1)
  ) {
    userData.roles.admin = true;
  }

  return db
    .collection("users")
    .doc(user.uid)
    .set(userData, { merge: true });
});
