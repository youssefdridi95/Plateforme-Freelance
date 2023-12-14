import { Component, Renderer2 , OnDestroy, OnInit, } from '@angular/core';
import { ChatsService } from './services/chats.service';

          @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private chatsService: ChatsService, private renderer: Renderer2) {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('isReloaded', 'true');
    });

    window.addEventListener('unload', this.unload.bind(this));
  }

  private unload(event: Event): void {
   setTimeout(()=>{
    if (sessionStorage.getItem('isReloaded') !== 'true') {
      // Perform actions when the tab is closing, but not when it's being reloaded
      this.chatsService.disConnectUser(JSON.parse(sessionStorage.getItem('user')!).id).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        });

      if (JSON.parse(sessionStorage.getItem('user')!).roles.at(0) == 'ROLE_RECRUTER') {
        this.chatsService.disConnectUser(JSON.parse(sessionStorage.getItem('user')!).idEntreprise).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          });
      }
    }
   },1000)


  }

  ngOnInit() {

   const user = JSON.parse(sessionStorage.getItem('user')!);
   let  id=JSON.parse(sessionStorage.getItem('user')!)!.id

   if(JSON.parse(sessionStorage.getItem('user')!).roles.at(0)=='ROLE_RECRUTER')
     id=JSON.parse(sessionStorage.getItem('user')!).idEntreprise

   if (user && id) {
     // If 'user' is present, invoke the watch method of ChatsService
    console.log('Storage event trisdfghergtzergtergtegdgggered:');

     this.chatsService.watch();
   }


  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', () => {
      sessionStorage.setItem('isReloaded', 'true');
    });
    window.removeEventListener('unload', this.unload.bind(this));
  }
  title = 'app';
}
