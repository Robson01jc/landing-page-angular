import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ForecastComponent } from './forecast/forecast.component';

@NgModule({
  declarations: [ForecastComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [ForecastComponent],
})
export class WeatherModule {}
