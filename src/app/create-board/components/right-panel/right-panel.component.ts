import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { timer } from 'rxjs';
import { SwiperContainer } from 'swiper/element';
import { BOARDS, SHAPES, COLORS, SURFBOARD_SHAPE, TEXTURES, CLIPATH } from '../../board';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [
    CommonModule,
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
  public colors = COLORS;
  public surfboardShape = SURFBOARD_SHAPE;
  public textures = TEXTURES;
  public clipPath = CLIPATH;
  public currentShapeIndex!: number | undefined;
  public prevShapeIndex?: number;
  public div!: HTMLDivElement;
  public img!: HTMLImageElement;
  public currentColor = 0;
  public currentTexture!: number;

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

  public getSVG(svg: string) {
    return this._sanitizer.bypassSecurityTrustHtml(`${svg}`);
  }

  public setColor(color: string, i: number) {
    this.currentColor = i;
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
  }

  public selectShape(shape: HTMLOrSVGElement, index: number) {
    this.currentShapeIndex = index;

    if (this.prevShapeIndex !== this.currentShapeIndex) {
      this.selectTexture(this.currentTexture);
    }

    this.prevShapeIndex = this.currentShapeIndex;
  }
}


