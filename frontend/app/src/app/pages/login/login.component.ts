import { Component, OnInit } from '@angular/core';
import { AuthLoginInterface } from '../../api/auth/interface/auth-login.interface';
import { AuthService } from '../../api/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentService } from '../../api/content/content.service';
import { SocialService } from '../../api/social/social.service';
import { SocialDto } from '../../api/social/social.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private contentService: ContentService,
    private socialService: SocialService
  ) {}

  authForm!: FormGroup;

  public validator: string | null = null;
  public inProgress = false;

  public pageData!: any;
  public socialList: SocialDto[] = [];

  async login() {
    if (this.isControlInvalid()) {
      this.validator = 'Не все поля заполнены!';
      return;
    }

    const formValue: AuthLoginInterface = this.authForm.value;
    if (formValue.username === '' || formValue.password) this.validator = null;
    this.inProgress = true;

    try {
      await this.authService.login(this.authForm.value);
    } catch (validatorMessage) {
      this.validator = validatorMessage;
    } finally {
      this.inProgress = false;
    }
  }

  isControlInvalid(): boolean {
    const username = this.authForm.controls['username'];
    const password = this.authForm.controls['password'];

    return username.invalid || password.invalid;
  }

  ngOnInit(): void {
    this.initForm();
    this.contentService.get().subscribe((data) => {
      this.pageData = data;
    });

    this.socialService.get().subscribe((data) => {
      this.socialList = data;
    });
  }

  initForm() {
    this.authForm = this.fb.group({
      username: [null, [Validators.required, Validators.pattern(/[A-z_]/)]],
      password: [null, [Validators.required]],
    });
  }
}
