import { AppComponent } from './../../../app.component';
import { AppCategoryComponent } from './application/applicationCategory/appCategory.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { AccountComponent } from './account/account.component';
import { ToastModule } from 'primeng/toast';
import { TableControlComponent } from '../customize/table-control/table-control.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';
import {MultiSelectModule} from 'primeng/multiselect';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DropdownModule} from 'primeng/dropdown';
import { AppGroupComponent } from './application/applicationGroup/appGroup.component';
import { ApplicationComponent } from './application/app.component';
import { CustomizeModule } from '../customize/customize.module';
import {PasswordModule} from 'primeng/password';
@NgModule({
    declarations: [
    AccountComponent,
    AppCategoryComponent,
    AppGroupComponent,
    ApplicationComponent
  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        ToastModule,
        TableModule,
        ButtonModule,
        ToolbarModule,
        DialogModule,
        FormsModule,
        InputTextModule,
        TooltipModule,
        MultiSelectModule,
        ConfirmDialogModule,
        DropdownModule,
        CustomizeModule,
        PasswordModule
    ]
})
export class PagesModule { }
