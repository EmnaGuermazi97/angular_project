import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDownloaderClientComponent } from './file-downloader-client.component';

describe('FileDownloaderClientComponent', () => {
  let component: FileDownloaderClientComponent;
  let fixture: ComponentFixture<FileDownloaderClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDownloaderClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDownloaderClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
