import { Component, Renderer2 , OnDestroy, OnInit, } from '@angular/core';
import { ChatsService } from './services/chats.service';

          @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit ,OnDestroy  {
  constructor(private chatsService :ChatsService,private renderer: Renderer2){
    window.addEventListener('beforeunload', this.onBeforeUnload.bind(this));

  }
  private onBeforeUnload(event: Event): void {
    // Handle cleanup logic here
    this.chatsService.disConnectUser(JSON.parse(sessionStorage.getItem('user')!).id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      });
  }

  ngOnInit() {
    // Check if there is an item in the session storage called 'user'
    const user = JSON.parse(sessionStorage.getItem('user')!);

    if (user && user.id) {
      // If 'user' is present, invoke the watch method of ChatsService
      this.chatsService.watch();
    }

    // Listen for changes in the session storage
    this.renderer.listen(window, 'storage', (event) => {
      if (event.key === 'user') {
        // Trigger the watch method of ChatsService when 'user' is modified
        this.chatsService.watch();
      }
    });
  }

  ngOnDestroy(): void {
    // Remove the event listener when the component is destroyed
    window.removeEventListener('beforeunload', this.onBeforeUnload.bind(this));

    this.chatsService.disConnectUser(JSON.parse(sessionStorage.getItem('user')!).id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      });
  }
  title = 'app';
}
