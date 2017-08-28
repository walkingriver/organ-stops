import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import config from '../../app/config';

@Injectable()
export class AuthProvider {
  private afUser: firebase.User;
  private pendingCredential: firebase.auth.AuthCredential;

  constructor(private afAuth: AngularFireAuth, private platform: Platform, private facebook: Facebook,
    private googlePlus: GooglePlus) {
    afAuth.authState.subscribe(user => {
      this.afUser = user;
    });
  }

  get user(): firebase.User {
    return this.afUser;
  }

  get isAuthenticated(): boolean {
    return this.afUser ? true : false;
  }

  async forgotPassword(email: string) {
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

  async register(name: string, email: string, password: string) {
    const user = await this.afAuth.auth.createUserWithEmailAndPassword(email, password) as firebase.User;
    await user.updateProfile({ displayName: name, photoURL: null });
  }

  private linkAccount() {
    if (this.pendingCredential) {
      this.afUser.linkWithCredential(this.pendingCredential);
      this.pendingCredential = null;
    }
  }

  async signInWithEmail(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
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
      await this.signInWithCredential(credential);
    } else {
      await this.signInWithProvider(new firebase.auth.FacebookAuthProvider());
    }
  }

  async signInWithGoogle() {
    if (this.platform.is('cordova')) {
      const res = await this.googlePlus.login({
          webClientId: config.googlePlus.webClientId
        });
      const credential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
      await this.signInWithCredential(credential);
    } else {
      await this.signInWithProvider(new firebase.auth.GoogleAuthProvider());
    }
  }

  async signInWithTwitter() {
    await this.signInWithProvider(new firebase.auth.TwitterAuthProvider());
  }

  private async signInWithCredential(credential: firebase.auth.AuthCredential) {
    try {
      await this.afAuth.auth.signInWithCredential(credential);
      this.linkAccount();
    } catch (error) {
      this.handleProviderError(error);
    }
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
