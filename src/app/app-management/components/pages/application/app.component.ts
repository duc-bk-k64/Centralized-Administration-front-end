import { getServerApiUrl } from './../../../../app-constant';
import { Response } from './../../../Model/ResponsMessage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { storageKey } from 'src/app/app-constant';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { ApplicationModel } from 'src/app/app-management/Model/ApplicationModel';

@Component({
    templateUrl: './app.component.html',
    selector: 'app'
})
export class ApplicationComponent implements OnInit{ 
    listApplication:any[] = [];
    header:any;
    showGroupDialog: boolean = false;
    selectedApplication: any;
    group: any[] = [];
    choseApplication: ApplicationModel = {};
    constructor(private httpClient:HttpClient, private messageService: MessageService,private authService: AuthService,private router: Router) {

    }

    ngOnInit() {
        this.header = new HttpHeaders().set(storageKey.AUTHORIZATION,this.authService.getToken());
        this.loadApplication();
    }

    loadApplication() {
        this.httpClient.get<Response>(getServerApiUrl()+"/app/all",{headers: this.header}).subscribe({
            next: data => {
                if(data.resultCode== 0) {
                 this.listApplication =data.data;
                }
                else {
                 this.messageService.add({severity:'error', summary:data.message, detail:data.data});
                }
               },
               error: _error => {
                 this.router.navigate(['/auth/error']);
               }
        })
    }
    findGroup(obj:any) {
        this.httpClient.get<Response>(getServerApiUrl()+"/group/findGroupByAppId?id="+obj.id,{headers: this.header}).subscribe({
            next: data => {
                if(data.resultCode== 0) {
                 this.group =data.data;
                //  console.log(this.parentComponent.group);
                }
                else {
                 this.messageService.add({severity:'error', summary:data.message, detail:data.data});
                }
               },
               error: _error => {
                 this.router.navigate(['/auth/error']);
               }
        })
    }
    
   
}