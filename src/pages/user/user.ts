import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  form: FormGroup;

  constructor(private modalCtrl: ModalController, fb: FormBuilder,
    public auth: AuthProvider) {
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

    await this.auth.forgotPassword(email);
  }

  register() {
    const modal = this.modalCtrl.create(RegisterPage);
    modal.present();
  }

  async signInWithEmail() {
    await this.auth.signInWithEmail(this.form.value.email, this.form.value.password);
  }

  async signInWithFacebook() {
    await this.auth.signInWithFacebook();
  }

  async signInWithGoogle() {
    await this.auth.signInWithGoogle();
  }

  async signInWithTwitter() {
    await this.auth.signInWithTwitter();
  }

  signOut() {
    this.auth.signOut();
  }
}
