import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {GroupService} from '../../../../services/group/group.service';

@Component({
  selector: 'app-groupdetail',
  templateUrl: './groupdetail.component.html',
  styleUrls: ['./groupdetail.component.css']
})
export class GroupdetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private groupService: GroupService,
              private location: Location) { }

  ngOnInit(): void {
    this.getGroup();
  }

  getGroup(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id)
  }

  goBack(): void {
    this.location.back();
  }

}
