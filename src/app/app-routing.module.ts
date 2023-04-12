import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const appRoutes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "auth",
    loadChildren: () => import("./component/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "home",
    loadChildren: () => import("./component/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "culture",
    loadChildren: () => import("./component/culture/culture.module").then(m => m.CultureModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
