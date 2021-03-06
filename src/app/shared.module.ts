import { NgModule} from '@angular/core';
//import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GroupByPipe } from './pipes/group-by.pipe';
// import { ComplaintDetailsComponent } from './complaint-details/complaint-details.component';
// import { RouterModule } from '@angular/router';
// import { ReactiveFormsModule } from '@angular/forms';
// import { ThanksComponent } from './thanks/thanks.component';
// import { NgxSpinnerModule } from 'ngx-spinner';
// import { ForwardOutsideComponent } from './admin-module/user/forward-outside/forward-outside.component';
// import { ScpcrInputsComponent } from './admin-module/user/scpcr-inputs/scpcr-inputs.component';



@NgModule({
  imports: [
  // CommonModule,
  //  HeaderComponent,
  //  FooterComponent
  //  RouterModule,
  //  ReactiveFormsModule,
  //  NgxSpinnerModule
  ],
  declarations: [
    GroupByPipe,
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    GroupByPipe,
    HeaderComponent,
   FooterComponent
    // ComplaintDetailsComponent,
    // ThanksComponent,NgxSpinnerModule,ForwardOutsideComponent,ScpcrInputsComponent
  ]
})

export class SharedModule { }