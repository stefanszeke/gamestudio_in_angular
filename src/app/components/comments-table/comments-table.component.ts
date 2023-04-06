import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/model/Comment';
import { selectComments, selectCommentsGetError } from 'src/app/state/comment/comment.selectors';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentActions } from 'src/app/state/comment/comment.actions';
import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { selectCurrentGame } from 'src/app/state/game/game.reducer';

@Component({
  selector: 'app-comments-table',
  templateUrl: './comments-table.component.html',
  styleUrls: ['./comments-table.component.scss']
})
export class CommentsTableComponent {
  commentForm: FormGroup;
  
  topComments$: Observable<Comment[]> = this.store.select(selectComments);
  currentGame$: Observable<string> = this.store.select(selectCurrentGame);

  getError$: Observable<any> = this.store.select(selectCommentsGetError);

  faUser = faUser; faCalendar = faCalendar;


  constructor(private store: Store, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.commentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      comment: ['', [Validators.required]]
    });
  } 

  onSubmit(): void {
    this.currentGame$.subscribe(game => {

    const newComment: Comment = { game, player: this.commentForm.value.name, comment: this.commentForm.value.comment };
    this.store.dispatch(CommentActions.postComment({comment: newComment}));

    this.commentForm.reset();
    });
  }

  formatDate(timestamp: any): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-gb') + ' ' + date.toLocaleTimeString('en-gb');
  }
}

