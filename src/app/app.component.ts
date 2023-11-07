import { Component, ElementRef, } from '@angular/core';
import { WidthCheckService } from './width-check.service';


          @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private elementRef: ElementRef, private widhtChecker :WidthCheckService ){
    this.widhtChecker.width=this.checkScreenWidth()
  }

  checkScreenWidth() {
    const screenWidth = this.elementRef.nativeElement.ownerDocument.defaultView.innerWidth;
   return screenWidth
    // You can perform any logic based on the screen width here
  }

  title = 'app';
}
