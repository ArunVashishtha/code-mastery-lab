import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  @Input() comments: any;
  @Input() postId = '';
  selectedCommentId = '';
  replies: any[] = [];
  newReply: string = '';
  showAllReplies = false;
  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
  }

  onSelectComment(comment: any, showReplies = false) {
    if (!showReplies) {
      this.selectedCommentId = '';
      comment.showAllReplies = false;
    } else {
      comment.showAllReplies = true;
      this.loadReplies(comment);
    }
  }

  loadReplies(comment: any) {
    this.commentService.getReplies(this.postId, comment?.id).subscribe(replies => {
      comment.replies = replies;
    });
  }

  onSubmitReply(commentId: string) {
    if (this.newReply.trim() !== '') {
      this.commentService.addComment(this.postId, commentId, this.newReply).then(() => {
        this.loadReplies(commentId);
        this.newReply = ''; // Clear the input
      });
    }
  }
}
