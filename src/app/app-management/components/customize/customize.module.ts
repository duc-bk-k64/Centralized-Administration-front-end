import { TableControlComponent } from './table-control/table-control.component';
import { NgModule } from "@angular/core";
import { ButtonModule } from 'primeng/button';
@NgModule({
    declarations: [
        TableControlComponent
    ],
    imports: [
       ButtonModule
    ],
    exports: [
      TableControlComponent
    ]

})
export class CustomizeModule {}