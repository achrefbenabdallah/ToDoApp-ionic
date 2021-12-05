import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'done/:id',
        loadChildren: () => import('./done/done.module').then( m => m.DonePageModule)
      },
      {
        path: 'to-do/:id',
        loadChildren: () => import('./to-do/to-do.module').then( m => m.ToDoPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
