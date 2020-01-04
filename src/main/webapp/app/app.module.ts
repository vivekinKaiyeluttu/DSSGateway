import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { DssGatewaySharedModule } from 'app/shared/shared.module';
import { DssGatewayCoreModule } from 'app/core/core.module';
import { DssGatewayAppRoutingModule } from './app-routing.module';
import { DssGatewayHomeModule } from './home/home.module';
import { DssGatewayEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    DssGatewaySharedModule,
    DssGatewayCoreModule,
    DssGatewayHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    DssGatewayEntityModule,
    DssGatewayAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class DssGatewayAppModule {}
