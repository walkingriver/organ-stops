import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  user: firebase.User;
  form: FormGroup;

  pendingCredential: firebase.auth.AuthCredential;

  constructor(private modalCtrl: ModalController, private afAuth: AngularFireAuth, fb: FormBuilder,
    private facebook: Facebook, private platform: Platform) {
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
      switch (error.code) {
        case 'auth/user-not-found':
          alert('No user exists with that email address.');
          break;
        case 'auth/invalid-email':
          alert('Please enter a valid email address.');
          break;
        default:
          throw error;
      }
    }
  }

  register() {
    const modal = this.modalCtrl.create(RegisterPage);
    modal.present();
  }

  private linkAccount() {
    if (this.pendingCredential) {
      this.user.linkWithCredential(this.pendingCredential);
      this.pendingCredential = null;
    }
  }

  async signInWithEmail() {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.password);
      this.linkAccount();
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          alert('Please enter a valid email address.');
          break;
        case 'auth/user-not-found':
          alert('No user exists with that email address.');
          break;
        case 'auth/wrong-password':
          alert('Your username or password is incorrect');
          break;
        default:
          throw error;
      }
    }
  }

  async signInWithFacebook() {
    if (this.platform.is('cordova')) {
      const res = await this.facebook.login(['email', 'public_profile']);
      const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      try {
        await this.afAuth.auth.signInWithCredential(credential);
      } catch (error) {
        this.handleProviderError(error);
      }
    } else {
      await this.signInWithProvider(new firebase.auth.FacebookAuthProvider());
    }
  }

  async signInWithGoogle() {
    await this.signInWithProvider(new firebase.auth.GoogleAuthProvider());
  }

  async signInWithTwitter() {
    await this.signInWithProvider(new firebase.auth.TwitterAuthProvider());
  }

  private async signInWithProvider(provider: firebase.auth.AuthProvider) {
    try {
      await this.afAuth.auth.signInWithPopup(provider);
      this.linkAccount();
    } catch (error) {
      await this.handleProviderError(error);
    }
  }

  private async handleProviderError(error: any) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      this.pendingCredential = error.credential;
      const email = error.email;

      const providers = await this.afAuth.auth.fetchProvidersForEmail(email);
      const providerId = providers[0]; // Grab primary auth provider

      if (providerId === 'password') {
        alert('Please sign in with your email address to link this account.');
      } else {
        const provider = this.getProviderForProviderId(providerId);
        alert(`Please sign in with your ${provider} account to link this account.`);
      }
    } else {
      throw error;
    }
  }

  private getProviderForProviderId(providerId: string): string {
    switch (providerId) {
      case 'google.com':
        return 'Google';
      case 'facebook.com':
        return 'Facebook';
      case 'twitter.com':
        return 'Twitter';
      default:
        return '';
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
  }
}
