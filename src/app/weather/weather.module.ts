import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForecastComponent } from './forecast/forecast.component';

@NgModule({
  declarations: [ForecastComponent],
  imports: [CommonModule],
  exports: [ForecastComponent],
})
export class WeatherModule {}
