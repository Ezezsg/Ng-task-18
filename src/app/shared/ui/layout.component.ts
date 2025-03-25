import { Component, inject } from "@angular/core";
import { RouterModule, Router, RouterLink } from "@angular/router";
import { AuthStateService } from "../data-access/auth-state.service";


@Component({
    standalone:true,
    imports: [RouterModule, RouterLink],
    selector: 'app-layout',
    template: `
    
        <nav class="site-header sticky-top py-2 text-light">
            <div class="container d-flex flex-column flex-md-row justify-content-between">
                <a class="text-light link-underline link-underline-opacity-0" routerLink="/tasks">Ng Task</a>
                <button (click)="logOut()" type="button" class="btn btn-dark">&nbsp;&nbsp;&nbsp;Salir&nbsp;&nbsp;&nbsp;</button>
            </div>
        </nav> 
    
    <router-outlet /> `,
})
export default class LayoutComponent {
    private _authState = inject(AuthStateService);
    private _router = inject(Router);

    async logOut(){
        await this._authState.logOut();
        this._router.navigateByUrl('auth/sign-in');
    }
}