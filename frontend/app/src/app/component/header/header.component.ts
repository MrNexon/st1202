import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../api/auth/auth.service';
import { UserService } from '../../api/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  public isLogin: boolean = false;
  public isAdmin: boolean = false;

  ngOnInit(): void {
    this.isLogin = this.authService.isLogin();
    if (this.isLogin)
      this.userService.user().subscribe(
        (user) => {
          this.isAdmin = user.is_admin;
        },
        () => {
          this.authService.resetLogin();
          this.isLogin = false;
        }
      );
  }

  public async anchorMove(anchorId: string): Promise<void> {
    await this.router.navigate(['/']);
    this.viewportScroller.scrollToAnchor(anchorId);
  }
}
