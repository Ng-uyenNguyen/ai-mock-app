import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) { }

  user = {
    name: 'John Doe',
    avatar: '/assets/avatar-placeholder.png'
  };

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}