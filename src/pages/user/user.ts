import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  displayName: string;

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayName = null;
        return;
      }
      this.displayName = user.displayName;
    });
  }

  async signInWithFacebook() {
    const res = await this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    console.log(res);
  }

  signOut() {
    this.afAuth.auth.signOut();
  }
}
