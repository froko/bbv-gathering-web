import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { Heroes1Component } from './heroes1/heroes1.component';
import { Heroes2Component } from './heroes2/heroes2.component';
import { Heroes3Component } from './heroes3/heroes3.component';
import { Heroes4Component } from './heroes4/heroes4.component';
import { MemoryLeakComponent } from './memory-leak/memory-leak.component';
import { RouterComponent } from './router/router.component';
import { TakeUntilComponent } from './take-until/take-until.component';
import { WikipediaComponent } from './wikipedia/wikipedia.component';

const routes: Routes = [
  { path: 'heroes1', component: Heroes1Component },
  { path: 'heroes2', component: Heroes2Component },
  { path: 'heroes3', component: Heroes3Component },
  { path: 'heroes4', component: Heroes4Component },
  { path: 'wikipedia', component: WikipediaComponent },
  { path: 'memoryleak', component: MemoryLeakComponent },
  { path: 'takeuntil', component: TakeUntilComponent },
  { path: 'router', component: RouterComponent },
  { path: 'router/:id', component: RouterComponent }
];

@NgModule({
  declarations: [
    Heroes1Component,
    Heroes2Component,
    Heroes3Component,
    Heroes4Component,
    WikipediaComponent,
    MemoryLeakComponent,
    TakeUntilComponent,
    RouterComponent
  ],
  imports: [
    CommonModule,
    JsonpModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCardModule,
    MatInputModule
  ]
})
export class SamplesModule {}
