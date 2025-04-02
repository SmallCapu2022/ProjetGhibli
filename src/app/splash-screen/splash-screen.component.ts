import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit {
  animate = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.animate = true;
    }, 2000);
  
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3500);
  }
  
}
