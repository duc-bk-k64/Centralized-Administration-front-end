import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './app-management/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './app-management/service/auth-guard';
import { AuthGuardAdmin } from './app-management/service/auth-guard-admin';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./app-management/components/dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[AuthGuard] },
                    { path: 'utilities', loadChildren: () => import('./app-management/components/utilities/utilities.module').then(m => m.UtilitiesModule) ,canActivate:[AuthGuard]},
                    { path: 'documentation', loadChildren: () => import('./app-management/components/documentation/documentation.module').then(m => m.DocumentationModule) ,canActivate:[AuthGuard]},
                    { path: 'blocks', loadChildren: () => import('./app-management/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule),canActivate:[AuthGuard] },
                    { path: 'pages', loadChildren: () => import('./app-management/components/pages/pages.module').then(m => m.PagesModule) ,canActivate:[AuthGuard]},
                ],
                canActivate:[AuthGuard]
            },
            { path: 'auth', loadChildren: () => import('./app-management/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./app-management/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}