import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredPosts: any;
  latestPosts: any;
  test = 'hello';
  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.postService.loadFeatured().subscribe(data => {
      this.featuredPosts = data;
    })
    this.postService.loadLatest().subscribe(posts => {
      this.latestPosts = posts;
    })
  }

}
