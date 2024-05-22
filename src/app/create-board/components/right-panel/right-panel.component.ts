import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SwiperContainer } from 'swiper/element';
import { BOARDS, CLIPATH, COLORS, SHAPES, SURFBOARD_SHAPE, TEXTURES } from '../../board';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { NgxColorsModule } from 'ngx-colors';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [
    CommonModule,
    NgxColorsModule,
    FormsModule,
  ],
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightPanelComponent implements AfterViewInit {

  @ViewChild('swiper') public swiper!: ElementRef<SwiperContainer>;
  @ViewChild('surfboardSvg') surfboardSvg!: ElementRef<HTMLImageElement>;
  @ViewChild('creation') creation!: ElementRef<HTMLDivElement>;

  public boards = BOARDS;
  public shapes = SHAPES;
  // public colors = COLORS;
  public surfboardShape = SURFBOARD_SHAPE;
  public textures = TEXTURES;
  public clipPath = CLIPATH;
  public currentShapeIndex!: number | undefined;
  public prevShapeIndex?: number;
  public div!: HTMLDivElement;
  public img!: HTMLImageElement;
  public currentColor = 0;
  public currentTexture!: number;
  public color = "#000000";
  public colorIndex = 0;
  public colors = ["#0070f3", "#00796B", "#D81B60", "#7986CB"];
  public logs: Array<Array<any>> = [];

  constructor(
    @Inject(DestroyRef) private destroy: DestroyRef,
    @Inject(DomSanitizer) private _sanitizer: DomSanitizer,
    @Inject(Renderer2) private renderer: Renderer2,
    @Inject(ElementRef) private ref: ElementRef,
  ) { }

  public ngAfterViewInit(): void {
    this.div = this.renderer.createElement('div');
    this.renderer.addClass(this.div, 'clipPathSvg');
    this.renderer.appendChild(this.creation.nativeElement, this.div);

    this.img = this.renderer.createElement('img');
    this.renderer.addClass(this.img, 'clipPathTexture');
    this.renderer.appendChild(this.creation.nativeElement, this.img);
  }

  public rotateColor(): void {
    this.colorIndex = (this.colorIndex + 1) % this.colors.length;
    this.color = this.colors[this.colorIndex];
  }

  public logEvent(event: any, trigger: any) {
    this.logs.unshift([this.logs.length + 1, trigger, event]);
    console.log(this.logs);
    this.color = this.logs[0][2];
    const svg = this.surfboardSvg.nativeElement;
    svg.style.fill = this.logs[0][2];
  }

  public getSVG(svg: string) {
    return this._sanitizer.bypassSecurityTrustHtml(`${svg}`);
  }

  public setColor(color: string) {
    const svg = this.surfboardSvg.nativeElement;
    svg.style.fill = color;
  }

  public selectTexture(i: number) {
    this.currentTexture = i;
    this.div.innerHTML = this.clipPath[this.currentShapeIndex!].svg;
    this.renderer.setAttribute(this.img, 'src', this.textures[this.currentTexture].texture);
    this.img.style.clipPath = `url(#label-pattern-svg-${this.currentShapeIndex})`;
    this.img.style.left = this.clipPath[this.currentShapeIndex!].left;
    this.img.style.top = this.clipPath[this.currentShapeIndex!].top;
    this.img.style.transform = this.clipPath[this.currentShapeIndex!].transform;
    this.img.style.width = '200px';
    this.img.style.height = '200px';
  }

  public selectShape(shape: HTMLOrSVGElement, index: number) {
    this.currentShapeIndex = index;

    if (this.prevShapeIndex !== this.currentShapeIndex) {
      this.selectTexture(this.currentTexture);
    }

    this.prevShapeIndex = this.currentShapeIndex;
  }

  public download() {
    const node = document.querySelector('.surfboard') as any;

    domtoimage.toBlob(node)
      .then((blob) => {
        saveAs(blob, 'my_surfboard.png');
      });
  }
}


