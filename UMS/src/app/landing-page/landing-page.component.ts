import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../services/httpservice.service';
import { UtilsService } from '../services/utils.service';
import { barChart } from '../constants/bar-chart-config.constant';
import { sampleChartData } from '../constants/bar-chart-config.constant';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit{

  
  files:any;
  excelData:any=[];
  barChartConfig: {
    config: any,
    data: any,
    visibility: {
      renderChart: boolean,
      showChart: boolean
    }
  } = {
      config: {},
      data: [],
      visibility: {
        renderChart: false,
        showChart: false
      }
    };
  isPlay:boolean = true;
  chartData:any;
  chartInp:any;
  startVal:any;
  endVal:any;


    constructor(private httpSrv:HttpserviceService,private utilSrv:UtilsService){}

    ngOnInit(): void {
      
      this.formatDataForChart();
    }
    
  upload(event: any) {
    this.files = event.target.files[0];
    this.sendFile();
  }
  
  sendFile(){

  const formData = new FormData();
  formData.append('file',this.files,this.files.name);
  
  this.httpSrv.uploadFile(formData).subscribe((response:any)=>{
    console.log(response,"rsponse");
    this.excelData = response?.data;
    this.formatDataForChart();
  });
  }

  formatDataForChart(){
    this.barChartConfig.config = this.utilSrv.deepClone(barChart);
    this.barChartConfig.config.plotOptions.series.colorByPoint = true;
    let data:any = this.excelData;
    this.startVal = 1960;
    this.endVal = 2022;
    this.chartInp = 1960;
    
     this.updateChartData(this.startVal);
  }





  togglePlayPause(){

    if(this.isPlay){

      this.barChartConfig.config.sequenceTimer  = setInterval(()=>{
        this.updateChart(1);
    },500);

    }else{     
    clearTimeout(this.barChartConfig.config.sequenceTimer);
    this.barChartConfig.config.sequenceTimer = undefined;

    }
    this.isPlay = !this.isPlay;
  }




   updateChart(increment:any) {
    if (increment) {
        this.chartInp = parseInt(this.chartInp, 10) + increment;
    }
    if (this.chartInp >= this.endVal) {
       
        clearTimeout(this.barChartConfig.config.sequenceTimer);
        this.barChartConfig.config.sequenceTimer = undefined;
        this.isPlay = true;
    }

      this.updateChartData(this.chartInp);

  }

  getData(year:any) {
    const dataset = this.utilSrv.deepClone(sampleChartData);
    const output = Object.entries(dataset)
        .map(country => {
            let countryName:any = country[0];
            let countryData:any = country[1]; 
            return [countryName, Number(countryData[year])];
        })
        .sort((a:any, b:any) => b[1] - a[1]);
        
    return [output[0], output.slice(1, 20)];
}

updateChartData(year:any){

  let tempConfig:any =  JSON.parse(JSON.stringify(this.barChartConfig.config));
  this.barChartConfig.config = {};

  tempConfig.series = [ {
    name: year,
    data: this.getData(year)[1]
  }];
  tempConfig.subtitle.text = this.getSubtitle(year);
  this.barChartConfig.config = JSON.parse(JSON.stringify(tempConfig));

}

 getSubtitle(value:any) {
    const population = (this.getData(value)[0][1] / 1000000000).toFixed(2);
    return `<span style="font-size: 80px">${value}</span>
        <br>
        <span style="font-size: 22px">
            Total: <b>: ${population}</b> billion
        </span>`;
}

  
}
