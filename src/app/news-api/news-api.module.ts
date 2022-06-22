import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NaArticleListComponent } from './na-article-list/na-article-list.component';
import { TrimOutletNamePipe } from './trim-outlet-name.pipe';

@NgModule({
  declarations: [NaArticleListComponent, TrimOutletNamePipe],
  imports: [CommonModule, SharedModule],
  exports: [NaArticleListComponent],
})
export class NewsApiModule {}
