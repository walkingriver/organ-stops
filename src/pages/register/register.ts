import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  form: FormGroup;

  constructor(public viewCtrl: ViewController, fb: FormBuilder,
    private afAuth: AngularFireAuth) {
    const password = fb.control('', Validators.required);
    const confirmPassword = fb.control('', CustomValidators.equalTo(password));

    this.form = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: password,
      confirmPassword: confirmPassword
    });
  }

  async register() {
    const user = await this.afAuth.auth.createUserWithEmailAndPassword(this.form.value.email, this.form.value.password) as firebase.User;
    await user.updateProfile({ displayName: this.form.value.name, photoURL: null });
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
