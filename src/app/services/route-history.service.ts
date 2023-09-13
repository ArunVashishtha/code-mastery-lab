// route-history.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteHistoryService {
  private visitedUrls: string[] = [];

  constructor() { }

  pushUrl(url: string) {
    this.visitedUrls.push(url);
  }

  getVisitedUrls(): string[] {
    return [...this.visitedUrls];
  }
}
