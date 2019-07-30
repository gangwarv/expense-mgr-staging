import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { MatNativeDateModule, MatProgressSpinnerModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { TableComponent } from './table/table.component';

@NgModule({
    imports:[
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    exports:[
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        TableComponent
    ],
    declarations: [TableComponent]
})
export class MaterialModule {

}