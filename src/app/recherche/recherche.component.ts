import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent {
  skill: string = '';
option :string = 'talent'
  constructor(private router: Router) {}

  rechercher() {
     if(this.option==='talent')
    this.router.navigate(['/talents/list', this.skill]);
  else
  this.router.navigate(['/entreprise/feed', this.skill]);

  }
}
