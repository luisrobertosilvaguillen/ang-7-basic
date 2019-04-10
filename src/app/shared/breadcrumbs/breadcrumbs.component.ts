import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  titleBreadCrumb: string;

  constructor(private router: Router, private title: Title, private meta: Meta) {
    this.getDataRoute()
    .subscribe(data=> {
      this.titleBreadCrumb = data.title;
      this.title.setTitle(data.title);

      const Metatag :MetaDefinition = {
        name: this.titleBreadCrumb,
        content: this.titleBreadCrumb
      }

      this.meta.updateTag(Metatag);
    });
   }
   getDataRoute(){
     return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event : ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    ) 
   }
  ngOnInit() {
  }

}
