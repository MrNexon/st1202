import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../api/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthLoginInterface } from '../../api/auth/interface/auth-login.interface';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AuthRegInterface } from '../../api/auth/interface/auth-reg.interface';
import { SocialDto } from '../../api/social/social.dto';
import { ContentService } from '../../api/content/content.service';
import { SocialService } from '../../api/social/social.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss'],
})
export class RegComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private recaptchaV3Service: ReCaptchaV3Service,
    private contentService: ContentService,
    private socialService: SocialService
  ) {}

  regForm!: FormGroup;

  public validator: string | null = null;
  public inProgress = false;

  public pageData!: any;
  public socialList: SocialDto[] = [];

  async submit(token: string) {
    this.inProgress = true;

    try {
      await this.authService.reg({
        ...this.regForm.value,
        recaptcha_token: token,
      });
    } catch (validatorMessage) {
      this.validator = validatorMessage;
    } finally {
      this.inProgress = false;
    }
  }

  async reg() {
    const validator = this.isControlInvalid();

    if (typeof validator === 'string') {
      this.validator = validator;
      return;
    }

    this.recaptchaV3Service
      .execute('importantAction')
      .subscribe((token) => this.submit(token));
  }

  isControlInvalid(): string | boolean {
    const username = this.regForm.controls['username'];
    const email = this.regForm.controls['email'];
    const password = this.regForm.controls['password'];
    const retype_password = this.regForm.controls['retype_password'];

    if (
      username.invalid ||
      password.invalid ||
      email.invalid ||
      retype_password.invalid
    )
      return 'Поля заполнены некорректно!';

    if (password.value !== retype_password.value) return 'Пароли не совпадают';

    return false;
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
    this.regForm = this.fb.group({
      username: [null, [Validators.required, Validators.pattern(/[A-z_]/)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      retype_password: [null, [Validators.required]],
    });
  }
}
