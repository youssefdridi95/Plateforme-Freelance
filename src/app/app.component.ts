import { Component, ElementRef, ViewChild, } from '@angular/core';
import { WidthCheckService } from './services/width-check.service';
import { Router, RouterOutlet } from '@angular/router';


          @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private elementRef: ElementRef, private widhtChecker :WidthCheckService){
    this.widhtChecker.width=this.checkScreenWidth()
  }

  checkScreenWidth() {
    const screenWidth = this.elementRef.nativeElement.ownerDocument.defaultView.innerWidth;
   return screenWidth
    // You can perform any logic based on the screen width here
  }

  title = 'app';
}
