import { Component, EventEmitter, OnInit, Output, AfterViewInit } from '@angular/core';
import { CommonModule, Location, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';

// project import
import { NavigationItem, NavigationItems } from '../navigation';
import { environment } from 'src/environments/environment';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { NavGroupComponent } from './nav-group/nav-group.component';

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [SharedModule, CommonModule, RouterModule, NavGroupComponent],
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit, AfterViewInit {
  // public props
  @Output() NavCollapsedMob: EventEmitter<string> = new EventEmitter();

  navigations: NavigationItem[];

  // version
  title = 'Demo application for version numbering';
  currentApplicationVersion = environment.appVersion;

  navigation = NavigationItems;
  windowWidth = window.innerWidth;

  // Constructor
  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy
  ) {
    this.navigations = NavigationItems;
  }

  // Life cycle events
  ngOnInit() {
    // Puedes dejar ngOnInit vacío si no necesitas hacer nada en este ciclo
  }

  ngAfterViewInit() {
    if (this.windowWidth < 1025) {
      const navbar = document.querySelector('.coded-navbar');
      if (navbar) {
        (navbar as HTMLDivElement).classList.add('menupos-static');
      }
    }
  }

  fireOutClick() {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;
      if (parent?.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger');
        parent.classList.add('active');
      } else if (up_parent?.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('coded-trigger');
        up_parent.classList.add('active');
      } else if (last_parent?.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('coded-trigger');
        last_parent.classList.add('active');
      }
    }
  }

  navMob() {
    if (this.windowWidth < 1025 && document.querySelector('app-navigation.coded-navbar')?.classList.contains('mob-open')) {
      this.NavCollapsedMob.emit();
    }
  }
}
