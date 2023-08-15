import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {
  postArray: any;
  categoryObj: any;
  constructor(private route: ActivatedRoute,
    private postService: PostsService,
    private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.categoryService.loadSingleCategory(val['id']).subscribe(category => {
        this.categoryObj = category;
        this.postService.loadCategory(val['id']).subscribe(val => {
          console.log(val);
          this.postArray = val;
        });
      })
      
    })
  }

}
