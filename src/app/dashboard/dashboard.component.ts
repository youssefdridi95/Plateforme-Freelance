import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profil: any; // Make sure the type of 'profil' matches the structure of your data

  constructor(private route: ActivatedRoute) {}

  generatePdf() {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('hello ', 10, 10);
    doc.save('mypdf.pdf');
  }

  ngOnInit(): void {
    // Retrieve 'profil' from sessionStorage
    const profilString = sessionStorage.getItem('profil');

    if (profilString) {
      // Parse the JSON string to get the 'profil' object
      this.profil = JSON.parse(profilString);
    }
  }
}
