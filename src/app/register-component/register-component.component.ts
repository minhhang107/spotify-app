import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css'],
})
export class RegisterComponentComponent implements OnInit {
  registerUser = {
    userName: '',
    password: '',
    password2: '',
  };

  warning: any;
  success: boolean = false;
  loading: boolean = false;

  constructor(private authService: AuthService, public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogComponent);
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (
      this.registerUser.userName !== '' &&
      this.registerUser.password === this.registerUser.password2
    ) {
      this.loading = true;

      this.authService.register(this.registerUser).subscribe(
        (success) => {
          this.success = true;
          this.warning = null;
          this.loading = false;
          this.openDialog();
        },
        (err) => {
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        }
      );
    } else {
      this.warning = 'Password does not match';
    }
  }
}
