import { Component, OnInit } from '@angular/core';
import {ViewportScroller} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../api/auth/auth.service';
import {UserService} from '../../api/user/user.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  public async home(): Promise<void> {
    await this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
