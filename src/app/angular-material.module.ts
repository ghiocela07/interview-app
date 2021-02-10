import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
// import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';


const materialModules = [
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    LayoutModule,
    MatPaginatorModule,
    MatInputModule,
    // MatSliderModule,
    MatFormFieldModule,

    MatSnackBarModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    // MatExpansionModule,
    MatTabsModule,
    MatSidenavModule,
    // MatSelectModule,
    // MatRadioModule,
    MatChipsModule,
    // MatAutocompleteModule,
    // MatProgressSpinnerModule,
    MatDialogModule,
    MatBadgeModule
];

@NgModule({
    imports: [
        materialModules
    ],
    exports: [
        materialModules
    ]
})
export class AngularMaterialModule {

}
