import { NgModule } from '@angular/core';
import { RouterModule, Routes, NoPreloading, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth-guard/auth-guard.service';

import { HomeComponent } from './components/home/home.component';

import { AppCustomPreloader } from './app-routing-preloader';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', loadChildren: './components/account/routing/account.module#AccountModule', canActivate: [AuthGuard] },
  {path: 'about', loadChildren: './components/about/routing/about.module#AboutModule'},
  {path: 'aboutus', redirectTo: 'about'},
  {path: 'browse', loadChildren: './components/browse/routing/browse.module#BrowseModule'},
  {path: 'signup', loadChildren: './components/sign-up/routing/sign-up.module#SignUpModule'},
  {path: 'register', redirectTo: 'signup'},
  {path: 'signin', loadChildren: './components/sign-in/routing/sign-in.module#SignInModule'},
  {path: 'login', redirectTo: 'signin'},
  {path: ':username/settings', loadChildren: './components/settings/routing/settings.module#SettingsModule', canActivate: [AuthGuard]},
  {path: 'search', loadChildren: './components/search/routing/search.module#SearchModule', canActivate: [AuthGuard]},
  {path: 'browse/search', loadChildren: './components/browse-search/routing/browse-search.module#BrowseSearchModule'},
  {path: ':username', loadChildren: './components/profile/routing/profile.module#ProfileModule', canActivate: [AuthGuard]},
];

@NgModule({
imports: [RouterModule.forRoot(routes, {preloadingStrategy: NoPreloading/*AppCustomPreloader*/})],
  exports: [RouterModule],
  declarations: [],
  providers: [AppCustomPreloader]
})
export class AppRoutingModule { }
