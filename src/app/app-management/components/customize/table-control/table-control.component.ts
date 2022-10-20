import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-control',
  templateUrl: './table-control.component.html',
})
export class TableControlComponent implements OnInit {
  @Input() entity: any;
  // @Input()
  // preActive!: (ett: any) => void;
  // @Input()
  // preDeactive!: ((ett: any) => void);
  @Input() btnActive = true;
  @Input() btnDeactive = true;

  constructor() { }

  ngOnInit(): void {
  }

}
