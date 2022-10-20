import { ApplicationComponent } from './application/app.component';
import { AccountComponent } from './account/account.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardAdmin } from '../../service/auth-guard-admin';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: 'account', component: AccountComponent, canActivate:[AuthGuardAdmin]},
        { path: 'app', component:ApplicationComponent, canActivate:[AuthGuardAdmin]}
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
