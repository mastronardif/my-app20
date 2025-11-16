import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { WtfComponent } from './comps/wtf/wtf.component';
import { DynamicApplicationComponent } from './components/dynamicforms/dynamic-application/dynamic-application.component';
import { DynamicFormComponent } from './components/dynamicforms/dynamic-form/dynamic-form.component';
import { DynamicGridFormComponent } from './components/dynamicforms/dynamic-grid-form/dynamic-grid-form.component';
import { MyMatComponent } from './components/mymat/mymat.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TableFromUrlComponent } from './components/tables/table-from-url/table-from-url.component';
import { RequestComponent } from './features/request/request.component';
// import { AddressComponent } from './comps/address/address.component';
// import { DashboardComponent } from './comps/dashboard/dashboard.component';
// import { TableComponent } from './comps/table/table.component';
// import { TreeComponent } from './comps/tree/tree.component';
// import { AccordianComponent } from './comps/accordian/accordian.component';
// import { TableFromUrlComponent } from './comps/table-from-url/table-from-url.component';
// import { RootComponent } from './comps/root/root.component';
// import { GalleryComponent } from './comps/gallery/gallery.component';
// import { MyorgchartComponent } from './comps/myorgchart/myorgchart.component';
// import { TableDynamicColumnsExampleComponent } from './comps/tables/table-dynamic-columns-example/table-dynamic-columns-example';
// import { MylistComponent } from './comps/mylist/mylist.component';
// import { AppComponent } from './app.component';
const routes: Routes = [
  // {
  //   path: 'compose',
  //   component: WtfComponent,
  //   outlet: 'popup'
  // },

  // { path: 'lazy', loadChildren: () => import('./lazyboy/lazyboy.module').then(m => m.LazyboyModule) },

  // { path: 'accordian',  component: AccordianComponent },
  // { path: 'address',  component: AddressComponent },
  // { path: 'dashboard',  component: DashboardComponent },
  // { path: 'gallery',  component: GalleryComponent },
  // { path: 'root',  component: RootComponent },
  // { path: 'table',  component: TableComponent },
  { path: 'nf', component: PageNotFoundComponent, data: { title: 'Not Found' }  },
  { path: 'tablefromurl', component: TableFromUrlComponent, data: { title: 'url table' } },
  { path: 'mymat', component: MyMatComponent, data: { title: 'Materal' } },
  { path: 'dynamicform', component: DynamicFormComponent , data: { title: 'Dynamic Form' } },
  { path: 'dynamicapplication', component: DynamicApplicationComponent , data: { title: 'Dynamic Application' } },
  { path: 'dynamicgridform', component: DynamicGridFormComponent , data: { title: 'Dynamic Grid Form' } },

  { path: 'myrequest', component: RequestComponent , data: { title: 'My Request' } },

  { path: 'nf', component: PageNotFoundComponent, data: { title: 'Not Found', hideFromNav: true } }, // dynamic route

  // { path: 'app',  component: AppComponent },
  // { path: 'tablefromurl',  component: TableFromUrlComponent },
  // { path: 'tableDynamic',  component: TableDynamicColumnsExampleComponent },
  // { path: 'tree',  component: TreeComponent },
  // { path: 'myorgchart', component: MyorgchartComponent },
  // { path: 'myorgchart/:id', component: MyorgchartComponent },

  // { path: 'wtf',  component: WtfComponent },
  // { path: 'wtf/:id', component: WtfComponent },

  //{ path: 'mylist',  component: DashboardComponent },
  // { path: 'mylist/:id',  component: MylistComponent },

  { path: '', redirectTo: '/myapp', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },

  //{ path: 'hero/:id', component: HeroDetailComponent }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
