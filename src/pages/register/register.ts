import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  form: FormGroup;

  constructor(public viewCtrl: ViewController, fb: FormBuilder,
    private auth: AuthProvider) {
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
    await this.auth.register(this.form.value.name, this.form.value.email, this.form.value.password);
    this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
