import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../User';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {
  user: User = { userName: '', password: '', _id: '' };
  warning: any;
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit(form: NgForm) {
    if (this.user.userName !== '' && this.user.password !== '') {
      this.loading = true;
      this.authService.login(this.user).subscribe(
        (success) => {
          this.loading = false;
          localStorage.setItem('access_token', success.token);
          this.router.navigate(['/newReleases']);
        },
        (err) => {
          this.loading = false;
          this.warning = err.error.message;
        }
      );
    }
  }
}
