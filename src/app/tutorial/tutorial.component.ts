import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChapterService } from '../services/chapter.service';
import { Chapter } from '../models/chapter';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css'],
})
export class TutorialComponent implements OnInit {
  chapters!: Array<Chapter>;
  selectedChapterIndex!: number;
  chapter!: any;
  category!: string;
  constructor(private chapterService: ChapterService,
    private route: ActivatedRoute,
  private seoService: SeoService) { }

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.category = val['category'];
      this.fetchChaptersByCategoryId(val['id']);
    })
  }

  // Example: Fetch chapters by category ID
  fetchChaptersByCategoryId(categoryId: string) {
    this.chapterService.getChaptersByCategoryId(categoryId).subscribe((chapters) => {
      this.chapters = chapters;
      this.selectChapter(1);
    });
  }

  selectChapter($event: any) {
    this.selectedChapterIndex = $event;
    this.chapter = this.chapters?.find(c=> c.chapterNumber === this.selectedChapterIndex);
    this.seoService.setSEOTags(this.chapter.title, this.chapter.description);
  }
}
