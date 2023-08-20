import { Component, OnInit } from '@angular/core';
import { ChapterService } from '../services/chapter.service';
import { Chapter } from '../models/chapter';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  chapters!: Array<Chapter>;
  selectedChapterIndex!: number;
  chapter!: Chapter;
  constructor(private chapterService: ChapterService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.fetchChaptersByCategoryId(val['id']);
    })
  }

  // Example: Fetch chapters by category ID
  fetchChaptersByCategoryId(categoryId: string) {
    this.chapterService.getChaptersByCategoryId(categoryId).subscribe((chapters) => {
      this.chapters = chapters;
    });
  }

  selectChapter($event: any) {
    this.selectedChapterIndex = $event;
    this.chapter = this.chapters?.[this.selectedChapterIndex];
  }
}
