import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRoutes: Routes = [
  {
    path: "",
    loadChildren: () => import("./component/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "auth",
    loadChildren: () => import("./component/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "culture",
    loadChildren: () => import("./component/culture/culture.module").then(m => m.CultureModule)
  },
  {
    path: "committee",
    loadChildren: () => import("./component/committee/committee.module").then(m => m.CommitteeModule)
  },

  // ,{
  //   path: "form",
  //   loadChildren: () => import("./component/form/form.module").then(m => m.FormModule)
  // }
];

@NgModule({
  // imports: [RouterModule.forRoot(appRoutes)],
  imports: [RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled', preloadingStrategy: PreloadAllModules,useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
