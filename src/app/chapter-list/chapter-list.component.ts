import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chapter } from '../models/chapter';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit {
  @Output() chapterSelected = new EventEmitter<number>();
  @Input() category!: string;
  @Input() chapters!: Array<Chapter>;
  selectedIndex!: number;
  constructor() { }

  ngOnInit(): void {
  }

  selectChapter(index: number) {
    this.selectedIndex = index;
    this.chapterSelected.emit(index);
  }
}
