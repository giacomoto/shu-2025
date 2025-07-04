import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapGraph } from './map-graph';

describe('MapGraph', () => {
  let component: MapGraph;
  let fixture: ComponentFixture<MapGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapGraph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapGraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
