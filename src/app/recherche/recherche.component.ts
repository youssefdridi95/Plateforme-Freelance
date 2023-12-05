import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent {
  skill: string = '';

  constructor(private router: Router) {}

  rechercher() {
    this.router.navigate(['/talents/list', this.skill]);
  }
}
