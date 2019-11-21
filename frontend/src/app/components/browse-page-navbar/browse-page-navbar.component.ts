import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BrowsePageDialogComponent } from '../browse-page-dialog/browse-page-dialog.component';

@Component({
  selector: 'app-browse-page-navbar',
  templateUrl: './browse-page-navbar.component.html',
  styleUrls: ['./browse-page-navbar.component.css']
})
export class BrowsePageNavbarComponent implements OnInit {
  @Output() searchterm: EventEmitter<string> = new EventEmitter<string>();
  query: string;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  search() {
    this.searchterm.emit(this.query);
  }
  openMenu() {
    this.dialog.closeAll();
    this.dialog.open(BrowsePageDialogComponent, {width: '90%', height: '50%'});
  }
}
