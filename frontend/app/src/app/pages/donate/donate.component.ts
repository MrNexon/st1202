import { Component, OnInit } from '@angular/core';
import { AuthLoginInterface } from '../../api/auth/interface/auth-login.interface';
import { AuthService } from '../../api/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialDto } from '../../api/social/social.dto';
import { ContentService } from '../../api/content/content.service';
import { SocialService } from '../../api/social/social.service';
import * as dateFormat from 'dateformat';
import { UserService } from '../../api/user/user.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss'],
})
export class DonateComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private contentService: ContentService,
    private socialService: SocialService,
    private userService: UserService
  ) {}

  paymentForm!: FormGroup;

  public validator: string | null = null;
  public inProgress = false;

  public pageData!: any;
  public socialList: SocialDto[] = [];

  public nickname: string | null = null;

  async payment() {
    this.validator = null;
    if (this.isControlInvalid()) {
      this.validator = 'Не все поля заполнены!';
      return;
    }

    ///TODO Implement payment request
  }

  isControlInvalid(): boolean {
    const username = this.paymentForm.controls['username'];
    const value = this.paymentForm.controls['value'];

    return username.invalid || value.invalid;
  }

  ngOnInit(): void {
    this.initForm();

    if (this.authService.isLogin()) {
      this.userService.user().subscribe(
        (user) => {
          this.nickname = user.nickname;
        },
        () => {
          this.authService.resetLogin();
        }
      );
    }

    this.contentService.get().subscribe((data) => {
      this.pageData = data;
    });

    this.socialService.get().subscribe((data) => {
      this.socialList = data;
    });
  }

  initForm() {
    this.paymentForm = this.fb.group({
      username: [null, [Validators.required, Validators.pattern(/[A-z_]/)]],
      value: [null, [Validators.required, Validators.pattern(/[\d]*/)]],
    });
  }
}
