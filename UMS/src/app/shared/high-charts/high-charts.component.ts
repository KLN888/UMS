import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-charts',
  templateUrl: './high-charts.component.html',
  styleUrls: ['./high-charts.component.scss']
})
export class HighChartsComponent implements OnInit,OnChanges {
  Highcharts: typeof Highcharts = Highcharts;
  @Input() chartOptions: Highcharts.Options | undefined;
  @Input() height: any;
  dataPresent = false;
  updateChart = false;

  constructor() { }

  ngOnInit() {
    Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      },
      accessibility: {
        enabled: false
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.chartOptions = changes['chartOptions'].currentValue;
    if (this.chartOptions && Object.keys(this.chartOptions).length > 0) {
      this.dataPresent = true;
      this.updateChart = true;
    }
  }


  addCustomDataLabelAnimation(): void {
    // (function (H) {
    //   const FLOAT = /^-?\d+\.?\d*$/;

    //   // Add animated textSetter, just like fill/strokeSetters
    //   H.Fx.prototype.textSetter = function () {
    //     let startValue = this.start.replace(/ /g, ''),
    //       endValue = this.end.replace(/ /g, ''),
    //       currentValue = this.end.replace(/ /g, '');

    //     if ((startValue || '').match(FLOAT)) {
    //       startValue = parseInt(startValue, 10);
    //       endValue = parseInt(endValue, 10);

    //       // No support for float
    //       currentValue = H.numberFormat(
    //         Math.round(startValue + (endValue - startValue) * this.pos),
    //         0
    //       );
    //     }

    //     this.elem.endText = this.end;

    //     this.elem.attr(this.prop, currentValue, null, true);
    //   };

    //   // Add textGetter, not supported at all at this moment:
    //   H.SVGElement.prototype.textGetter = function () {
    //     const ct = this.text.element.textContent || '';
    //     return this.endText ? this.endText : ct.substring(0, ct.length / 2);
    //   };

    //   // Temporary change label.attr() with label.animate():
    //   H.wrap(H.Series.prototype, 'drawDataLabels', function (proceed) {
    //     const attr = H.SVGElement.prototype.attr,
    //       chart = this.chart;

    //     if (chart.sequenceTimer) {
    //       this.points.forEach(point =>
    //         (point.dataLabels || []).forEach(
    //           label =>
    //             (label.attr = function (hash) {
    //               if (
    //                 hash &&
    //                 hash.text !== undefined &&
    //                 chart.isResizing === 0
    //               ) {
    //                 const text = hash.text;

    //                 delete hash.text;

    //                 return this
    //                   .attr(hash)
    //                   .animate({ text });
    //               }
    //               return attr.apply(this, arguments);
    //             })
    //         )
    //       );
    //     }

    //     const ret = proceed.apply(
    //       this,
    //       Array.prototype.slice.call(arguments, 1)
    //     );

    //     this.points.forEach(p =>
    //       (p.dataLabels || []).forEach(d => (d.attr = attr))
    //     );

    //     return ret;
    //   });
    // }(Highcharts));
  }


}
