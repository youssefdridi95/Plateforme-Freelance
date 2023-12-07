import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profil: any; // Assurez-vous que le type de profil correspond à la structure de vos données

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

  }
}
