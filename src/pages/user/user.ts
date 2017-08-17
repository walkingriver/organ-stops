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
    if (!email || this.form.controls['email'].invalid) {
      alert('Please enter your email address.');
      return;
    }

    try {
      await this.afAuth.auth.sendPasswordResetEmail(email);
      alert('A password recovery email has been sent.');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert('No user exists with that email address.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Please enter a valid email address.');
      }
    }
  }

  register() {
    const modal = this.modalCtrl.create(RegisterPage);
    modal.present();
  }

  async signInWithEmail() {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.password);
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        alert('Please enter a valid email address.');
      } else if (error.code === 'auth/user-not-found') {
        alert('No user exists with that email address.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Your username or password is incorrect');
      }
    }
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
