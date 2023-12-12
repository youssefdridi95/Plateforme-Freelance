import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../services/post.service';
import { UserProfil } from '../services/user-profil';
import { UserService } from '../services/user.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profil: any; // Make sure the type of 'profil' matches the structure of your data
  posts: any;
  userId: any;

  constructor(private toastr: ToastrService, private userProfilService: UserProfil, 
    private router: Router, private roote: ActivatedRoute, private postService: PostService, 
    private userService: UserService, private sharedService: SharedService) {
    // Subscribe to the shared service observables
    this.sharedService.totalReactionsCount$.subscribe(totalCount => {
      console.log('Total Reactions Count:', totalCount);
    });
  
    this.sharedService.reactionsCounts$.subscribe(counts => {
      console.log('Reactions Counts:', counts);
    });
  }

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
