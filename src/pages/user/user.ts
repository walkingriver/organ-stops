import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  user: firebase.User;
  form: FormGroup;

  constructor(private modalCtrl: ModalController, private afAuth: AngularFireAuth, fb: FormBuilder) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });

    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async forgotPassword() {
    const email = this.form.value.email;
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    await this.afAuth.auth.sendPasswordResetEmail(email);
    alert('A password recovery email has been sent');
  }

  register() {
    const modal = this.modalCtrl.create(RegisterPage);
    modal.present();
  }

  signInWithEmail() {
    this.afAuth.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.password);
  }

  signInWithFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  signInWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signInWithTwitter() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

  signOut() {
    this.afAuth.auth.signOut();
  }
}
