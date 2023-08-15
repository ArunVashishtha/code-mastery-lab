import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  commentForm: FormGroup;
  @Input() postId: string = '';
  constructor(private fb: FormBuilder, private commentService: CommentService) { 
    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      commentText: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.commentForm.valid) {
      this.commentService.addComment(this.postId, undefined, undefined, this.commentForm).then(val => {
        this.commentForm = this.fb.group({
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          commentText: ['', Validators.required]
        });
      });
    }
  }

  ngOnInit(): void {
  }

}
