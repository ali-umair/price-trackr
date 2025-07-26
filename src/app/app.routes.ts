import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ScanComponent } from './scan/scan.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: { title: 'Home' }
    },
    {
        path: 'scan',
        component: ScanComponent,
        data: { title: 'Scan' }
    }
    // {
    //     path: 'scan/new',
    //     component: ScanNewComponent,
    //     data: { title: 'New', edit: false }
    // },
    // {
    //     path: 'scan/price',
    //     component: ScanPriceComponent,
    //     data: { title: 'Price Check' }
    // },
    // {
    //     path: 'scan/edit',
    //     component: ScanNewComponent,
    //     data: { title: 'Edit', edit: true }
    // }
];
