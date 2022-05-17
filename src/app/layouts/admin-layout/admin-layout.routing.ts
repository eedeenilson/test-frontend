import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { EventComponent } from 'app/event/event.component';
import { LogoutComponent } from 'app/logout/logout.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'event',      component: EventComponent },
    { path: 'logout',      component: LogoutComponent },
];