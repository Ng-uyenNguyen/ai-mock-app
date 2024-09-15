import { Component } from '@angular/core';
import { AuthService } from './features/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated = false;
  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated || this.authService.isAuthenticated();
    });
  }

}
