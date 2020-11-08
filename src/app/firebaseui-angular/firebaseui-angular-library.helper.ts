// This library is created from https://github.com/RaphaelJenni/FirebaseUI-Angular.
// The modifications are minimal and simply update the import syntax to firebase v8.

/*
 * Created by Raphael Jenni
 * Copyright (c) 2017 Raphael Jenni
 */

import firebaseOriginal from 'firebase/app';
import UserCredential = firebaseOriginal.auth.UserCredential;
import * as firebaseuiOriginal from 'firebaseui';

export const firebase = firebaseOriginal;
export const firebaseui = firebaseuiOriginal;

export type NativeFirebaseUIAuthConfig = firebaseuiOriginal.auth.Config;


export class FirebaseUISignInSuccessWithAuthResult {
  authResult: UserCredential;
  redirectUrl: string;
}

export class FirebaseUISignInFailure {
  code: string;
  credential: firebaseOriginal.auth.AuthCredential;
}