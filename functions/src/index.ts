import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { AuthUserCreate } from "./auth.oncreate";

admin.initializeApp();

export const onAuthUserCreate = AuthUserCreate;

export const onBillWrite = functions.firestore
  .document("expenses/{billNo}")
  .onWrite(async (change, context) => {
    const db = admin.firestore();

    const document = change.after.data() ||
      change.before.data() || { monthId: "abc" };

    const monthId = document.monthId;
    return db
      .collection("expenses")
      .where("monthId", "==", monthId)
      .get()
      .then(expSnapshot => {
        const exps: FirebaseFirestore.DocumentData[] = [];
        expSnapshot.forEach(snap => exps.push(snap.data()));
        const currentBill = exps.reduce((acc, exp) => {
          return exp.amount + acc;
        }, 0);

        console.log("expenses", exps, currentBill, document.monthId);

        return db
          .doc(`monthlystatements/${monthId}`)
          .set({ currentBill }, { merge: true });
      });
  });
