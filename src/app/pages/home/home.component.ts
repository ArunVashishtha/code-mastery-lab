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
  chapters: any;
  test = 'hello';
  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.postService.loadFeatured().subscribe(data => {
      this.featuredPosts = data;
    });
    this.postService.loadLatest().subscribe(posts => {
      this.latestPosts = posts;
    });
    this.postService.loadChapters().subscribe(chapters => {
      this.chapters = chapters.filter(a=> a.data.chapterNumber === 1);
    })
  }
  getSlug(description: string) {
    return description.toLowerCase().replace(/\s/g, '-')
  }
}
