import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { PostsService } from 'src/app/services/posts.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  postData: any;
  similarPosts: any;
  commentsList: any;
  postId: string = '';
  maxLength = 300;
  constructor(
    private postService: PostsService,
    private commentService: CommentService,
    private route: ActivatedRoute, private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.postId = val['id'];
      this.postService.countViews(this.postId);
      this.postService.loadSinglePost(this.postId).subscribe((post) => {
        this.loadComments(this.postId);
        this.postData = post;
        this.seo.setSEOTags(this.postData.title, this.postData.excerpt);
        this.loadSimilarPost(this.postData.category.categoryId);
      });
    });
  }

  loadComments(postId: string) {
    this.commentService.getComments(postId).subscribe((comments) => {
      this.commentsList = comments;
      this.commentsList.forEach((element: { showAllReplies: boolean }) => {
        element.showAllReplies = true;
      });
    });
  }

  loadSimilarPost(catId: string) {
    this.postService.loadSimilarPost(catId).subscribe((data) => {
      this.similarPosts = data;
    });
  }
}
