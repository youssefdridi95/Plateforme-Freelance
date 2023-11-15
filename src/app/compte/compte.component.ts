import { Component } from '@angular/core';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent {
popup= true;
  url = "/assets/logo_user.png";
    // Function to handle file change
    onFileChange(event: any) {
      const fileInput = event.target;
      
      if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
  
        // Read the selected file as a data URL
        reader.readAsDataURL(fileInput.files[0]);
  
        // Set the image source when the file is loaded
        reader.onload = (e: any) => {
          this.url = e.target.result;
        };
      }
    }
  
}
