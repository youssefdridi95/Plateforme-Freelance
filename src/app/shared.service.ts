// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  private totalReactionsCountSource = new BehaviorSubject<number>(0);
  totalReactionsCount$ = this.totalReactionsCountSource.asObservable();

  private reactionsCountsSource = new BehaviorSubject<number[]>([]);
  reactionsCounts$ = this.reactionsCountsSource.asObservable();

  updateReactionsCounts(totalCount: number, counts: number[]) {
    this.totalReactionsCountSource.next(totalCount);
    this.reactionsCountsSource.next(counts);
  }
}
