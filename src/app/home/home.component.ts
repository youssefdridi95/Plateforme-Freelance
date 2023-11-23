import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  name: string = '';
  values = ['Talent', 'Entreprise'];

  ngOnInit() {
    // Set an initial name
    this.changeName();

    // Change the name every 5 seconds
    setInterval(() => {
      this.changeName();
    }, 1000);
  }

  changeName() {
    // Randomly select a name from the values list
    const randomIndex = Math.floor(Math.random() * this.values.length);
    this.name = this.values[randomIndex];
  }

  
}
