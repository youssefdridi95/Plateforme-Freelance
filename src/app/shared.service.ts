// shared.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private post: boolean = false;

  getPost(): boolean {
    return this.post;
  }

  setPost(newPost: boolean): void {
    this.post = newPost;
  }
}
