import { Component, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TabMenuModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  elementosDelMenu : MenuItem[] | undefined;
  ngOnInit(): void {
      this.elementosDelMenu = [
        {
          label : 'Home',
          icon : 'pi pi-home',
          routerLink: ['/'],
        },
        {
          label : 'Alumnos',
          icon : 'pi pi-users',
          routerLink: ['/alumnos'],
        },
        {
          label : 'Alumnos Form',
          icon : 'pi pi-user-edit',
          routerLink: ['/alumnosForm'],
        }
      ]
  }

}
