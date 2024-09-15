import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyTaskComponent } from './components/my-task/my-task.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'viewTask',
    pathMatch: 'full'
  },
  {
    path: 'viewTask',
    component: DashboardComponent
  },
  {
    path: 'myTask',
    component: MyTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }