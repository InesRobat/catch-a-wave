import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="page-wrapper">
      <div class="nav-wrapper" #navWrapper>
          <!-- <div class="grad-bar"></div> -->
          <nav class="navbar">
              <img src="./assets/images/logo.png" alt="logo">
              <div class="menu-toggle" id="mobile-menu" (click)="toggleMenu()" #menuToggle>
                  <span class="bar"></span>
                  <span class="bar"></span>
                  <span class="bar"></span>
              </div>
              <ul class="nav" #navMobile>
                  <li class="nav-item"><a (click)="scrollContent('boards')">Boards</a></li>
                  <li class="nav-item"><a (click)="scrollContent('anatomy')">Anatomy</a></li>
                  <li class="nav-item"><a (click)="scrollContent('creation')">Creation</a></li>
              </ul>
          </nav>
      </div>
    </div>
  `,
  styleUrls: ['./navbar.component.scss'],
  standalone: true
})
export class NavbarComponent implements OnInit {

  @ViewChild('menuToggle') public menuToggle!: ElementRef<HTMLDivElement>;
  @ViewChild('navMobile') public navMobile!: ElementRef<HTMLDivElement>;
  @ViewChild('navWrapper') public navWrapper!: ElementRef<HTMLDivElement>;

  constructor() { }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: Event) {
    if (window.pageYOffset > 0 && this.navWrapper) {
      this.navWrapper.nativeElement.style.backgroundColor = '#eeecea';
      const navItems = this.navWrapper.nativeElement.querySelectorAll('.nav-item a');
      navItems.forEach((item: any) => {
        item.style.color = '#80c6bd';
      });
    } else {
      this.navWrapper.nativeElement.style.backgroundColor = 'transparent';
      const navItems = this.navWrapper.nativeElement.querySelectorAll('.nav-item a');
      navItems.forEach((item: any) => {
        item.style.color = 'white';
      });
    }
  }

  public ngOnInit(): void { }

  public toggleMenu() {
    this.menuToggle.nativeElement.classList.toggle('is-active')
    this.navMobile.nativeElement.classList.toggle('mobile-nav');
  }

  public scrollContent(value: string) {
    this.menuToggle.nativeElement.classList.remove('is-active');
    this.navMobile.nativeElement.classList.remove('mobile-nav');
    // this.navMobile.nativeElement.style.display = 'none';

    if (value === 'name') {
      // scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      document.getElementById(value)!.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        // inline: 'nearest',
      });
    }
  }

}
