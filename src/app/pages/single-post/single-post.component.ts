import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  postData: any;
  similarPosts: any;
  constructor(private postService: PostsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.postService.countViews(val['id']);
      this.postService.loadSinglePost(val['id']).subscribe(post => {
        console.log('asd' + post);
        this.postData = post;
        this.loadSimilarPost(this.postData.category.categoryId);
      })
    })
  }

  loadSimilarPost(catId:string) {
    this.postService.loadSimilarPost(catId).subscribe(data => {
      this.similarPosts = data;
    });
  }

}
