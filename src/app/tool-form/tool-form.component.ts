import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Tool} from '../../models/tool.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ToolService} from '../../services/tool.service';

@Component({
  selector: 'app-tool-form',
  templateUrl: './tool-form.component.html',
  styleUrls: ['./tool-form.component.scss']
})
export class ToolFormComponent implements OnInit {
  currentItemId: string;
  item: Tool;
  form: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toolService: ToolService,
  ) { }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.toolService.getToolById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item);
      });
    } else {
      this.initForm(null);
    }

  }

  initForm(item: Tool): void {
    this.form = new FormGroup({
      cin: new FormControl(item?.date, [Validators.required]),
      name: new FormControl(item?.source, [Validators.required]),
    });
  }


  onSubmit(): void {
    const objectToSubmit = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    this.toolService.saveTool(objectToSubmit).then(() =>
      this.router.navigate(['./tools'])
    );
  }

}
