import { Component, HostListener, OnDestroy } from '@angular/core';
import { RouteHistoryService } from './services/route-history.service';
import { NavigationEnd, Router } from '@angular/router';
import { json } from 'express';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'code-mastery-lab';
  visitedUrls: string[] = [];
  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: Event) {
    // Prevent the default right-click behavior
    event.preventDefault();
  }

  constructor(private router: Router, private routeHistoryService: RouteHistoryService) {
    // Subscribe to NavigationEnd event
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Push the URL into the array
        this.routeHistoryService.pushUrl(event.url);
        this.visitedUrls = this.routeHistoryService.getVisitedUrls();
        //       if (event.url.includes('about')) {
        //         const sitemapEntries = this.visitedUrls.map(url => ({
        //           loc: `https://codemasterylab.com${url}`, // Replace with your website's base URL
        //           lastmod: '2023-09-13', // Optional: Last modification date (YYYY-MM-DD)
        //           changefreq: 'weekly', // Optional: Change frequency (e.g., 'always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never')
        //           priority: 0.8, // Optional: Priority (0.0 to 1.0)
        //         }));
        //         const sitemapXML = `
        //   <?xml version="1.0" encoding="UTF-8"?>
        //   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        //     ${sitemapEntries.map(entry => `
        //       <url>
        //         <loc>${entry.loc}</loc>
        //         <lastmod>${entry.lastmod}</lastmod>
        //         <changefreq>${entry.changefreq}</changefreq>
        //         <priority>${entry.priority}</priority>
        //       </url>
        //     `).join('')}
        //   </urlset>
        // `; console.log(sitemapXML);
        //      }
      }
    });
  }
}
