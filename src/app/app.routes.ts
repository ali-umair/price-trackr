import { Routes } from '@angular/router';
import { BarcodeScannerComponent } from './shared/components/barcode-scanner/barcode-scanner';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: { title: 'Home' }
    },
    {
        path: 'scan',
        component: BarcodeScannerComponent,
        data: { title: 'Scan' }
    }
];
