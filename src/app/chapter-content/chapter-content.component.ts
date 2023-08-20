import { Component, Input, OnInit } from '@angular/core';
import { Chapter } from '../models/chapter';

@Component({
  selector: 'app-chapter-content',
  templateUrl: './chapter-content.component.html',
  styleUrls: ['./chapter-content.component.css']
})
export class ChapterContentComponent implements OnInit {
  @Input() selectedChapterIndex: number = 0;
  @Input() chapters!: Array<Chapter>;
  chapter!: Chapter;
  constructor() { }

  ngOnInit(): void {
    this.chapter = this.chapters?.[this.selectedChapterIndex];
  }
}
