import { AuthGuard } from './app-management/service/auth-guard';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './app-management/components/notfound/notfound.component';
import { ProductService } from './app-management/service/product.service';
import { CountryService } from './app-management/service/country.service';
import { CustomerService } from './app-management/service/customer.service';
import { EventService } from './app-management/service/event.service';
import { IconService } from './app-management/service/icon.service';
import { NodeService } from './app-management/service/node.service';
import { PhotoService } from './app-management/service/photo.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@NgModule({
    declarations: [
        AppComponent, NotfoundComponent

    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,AuthGuard,JwtHelperService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
