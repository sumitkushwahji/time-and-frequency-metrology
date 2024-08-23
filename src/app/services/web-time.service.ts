import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CalanderService } from './calander.service';
declare var $: any;
declare var jwday: any;

declare var document: any;
declare var TodayClock: any;
declare var UTC_TIMESTAMP: any;

@Injectable({
  providedIn: 'root',
})
export class WebTimeService {
  baseUrl: string = '';

  getConfig() {
    return this.httpClient.get<any>('/assets/config.json');
  }
  setNtpServer() {
    return this.httpClient.get<any>('/assets/config/ntpServer.json');
  }

  clock: any = {
    local: new Date(),
    Offset: 0,
  };

  FetchTimer: any = 0; // Fetch timeout timer
  TimeOut = 3000; // http timeout is 3 seconds

  Interval = 100; // Refresh clock display every 100ms
  Offset: number = 0; // Estimated offset (ms)
  diff_hour: string = '00'; // Estimated offset (ms)
  diff_min: string = '00'; // Estimated offset (ms)

  diff_minute: string = '00'; // Estimated offset (ms)
  diff_sec: string = '00'; // Estimated offset (ms)

  Results: any[] = new Array();

  Status: number = 0; // 1: 1 server only, 2: accurate

  originTime: Date = new Date();
  destTime: Date = new Date();
  rtt: number = 0;
  diff: number = 0;

  constructor(
    private httpClient: HttpClient,
    private calanderService: CalanderService
  ) {}

  start() {
    this.baseUrl = environment.domain + '/api/ntp';

    setInterval(() => {
      this.showtime();
    }, this.Interval);

    this.clock['tzoffset'] = this.clock.local.getTimezoneOffset() * 60000; // in ms
    if (this.clock.tzoffset > 12 * 3600000) this.clock.tzoffset -= 24 * 3600000;

    this.fetch();
    new TodayClock($('div.today-clock'));
  }

  fetch() {
    if (this.Status >= 2) return;

    const url = this.baseUrl;
    this.originTime = new Date();

    if (!url) return;

    this.getTimestamp(url).subscribe((data) => {
      this.checkresponse(data);
    });

    this.FetchTimer = setInterval(() => this.fetchtimeout(), this.TimeOut); // Arrow function syntax to preserve the context of 'this'
  }

  fetchtimeout = () => {
    // Using arrow function to preserve 'this' context
    clearInterval(this.FetchTimer);
    this.calculate();
    this.fetch();
  };

  calculate() {
    var maxlb, minub;

    if (this.Results.length == 0) return;

    if (this.Results.length >= 2) {
      // Error should be less than 500ms
      for (var i = 1; i < this.Results.length; i++) {
        maxlb = Math.max(this.Results[0].lb, this.Results[i].lb);
        minub = Math.min(this.Results[0].ub, this.Results[i].ub);
        if (maxlb < minub && minub - maxlb < 500) {
          this.Status = 2;
          this.errmsg('normal');
          break;
        }
      }
    }
    if (this.Status != 2) {
      // Otherwise set status = 1 and try next server
      maxlb = this.Results[0].lb;
      minub = this.Results[0].ub;
      this.Status = 1;
      this.errmsg('warning');
    }

    this.clock.Offset = -(maxlb + minub) / 2;

    var start = Math.floor((this.clock.Offset + new Date().getTime()) / 1000);

    // detail status
    var msg = '';
    for (var i = this.Results.length - 1; i >= 0; i--) {
      msg +=
        this.Results[i].id +
        ': RTT = ' +
        Math.round(this.Results[i].rtt) +
        ' ms , (PC Clock - IST) = ' +
        Math.round((this.Results[i].lb + this.Results[i].ub) / 2) +
        ' ms<br>';
    }

    msg +=
      'Estimated clock difference (PC Clock - IST) = ' +
      Math.round(-this.clock.Offset) +
      ' &plusmn; ' +
      Math.ceil((minub - maxlb) / 2) +
      'ms<br>';

    var msgbox = document.getElementById('Details');
    if (null != msgbox) msgbox.innerHTML = msg;
  }

  checkresponse(json: any) {
    clearInterval(this.FetchTimer);
    if (json) {
      // responseText defined?
      this.destTime = new Date();

      var now = new Date(); // Receive time
      if (json.message) {
        /*
        json.it *= 1000; 			// Initiate time
        json.st = json.nstt * 1000; 			// Send time
        json.rt = now.getTime(); 		// Receive time
        json.rtt = json.rt - json.it;		// Round Trip Time
        json.dif = json.st - (json.it+json.rt)/2;	// estimated clock difference
        */
        json['lb'] =
          this.originTime.getTime() - 16 - json.message.transmitTimeStamp.time; // estimated lower bound
        json['ub'] =
          this.destTime.getTime() + 16 - json.message.transmitTimeStamp.time; // estimated upper bound
        this.rtt = this.destTime.getTime() - this.originTime.getTime();
        this.diff =
          json.message.transmitTimeStamp.time -
          (this.destTime.getTime() + this.originTime.getTime()) / 2;

        this.Results.unshift(json); // json -> Result[0]
      }
    }
    console.log(json);

    this.calculate(); // calculate offset values
    this.log_ntp(); // calculate offset values
    this.fetch(); // next server
  }
  getTimestamp(url: string) {
    return this.httpClient.get(url);
  }
  errmsg(msgnum: string) {
    console.log(msgnum);
  }
  log_ntp() {
    return;
    if (this.Results.length == 0) return;

    this.httpClient
      .post(this.baseUrl + '/insert_log.php', {
        user_transmit_time: this.Results[0].it / 1000,
        user_receive_time: this.Results[0].rt / 1000,
        ntp_client_transmit_time: this.Results[0].nctt,
        ntp_client_receive_time: this.Results[0].ncrt,
        ntp_server_transmit_time: this.Results[0].st / 1000,
        ntp_server_receive_time: this.Results[0].nsrt,
      })
      .subscribe();
  }

  display_date_time(timer: Date, parent: any) {
    var d = new Date(timer);
    let months = new Array(
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    );

    let day_array = new Array(
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    );

    let currentYear = d.getUTCFullYear();
    let month = d.getUTCMonth();
    var currentMonth = months[month];

    //currentMonth = currentMonth < 10 ? '0'+currentMonth : currentMonth;
    let currentDate: any = d.getUTCDate();
    currentDate = currentDate < 10 ? '0' + currentDate : currentDate;

    var day = d.getUTCDay();
    let current_day = day_array[day];
    let hours: any = d.getUTCHours();
    let minutes: any = d.getUTCMinutes();
    let seconds: any = d.getUTCSeconds();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    var strTime = hours + ':' + minutes + ':' + seconds;

    $(parent)
      .find('.year')
      .html(currentMonth + ' ' + currentDate + ', ' + currentYear);
    $(parent).find('.day').html(current_day);
    $(parent).find('.timer').html(strTime);

    document.getElementById('year').innerHTML =
      currentDate + '-' + currentMonth + '-' + currentYear;
    document.getElementById('day').innerHTML = current_day;
    document.getElementById('timer').innerHTML = strTime;
  }

  showtime() {
    this.clock.local = new Date();
    // This function uses Global Variables below:
    // Offset, Interval, SL, Text[]

    var sec, utcms, utcsec;
    var UTC, LOC, CMP;

    CMP = new Date(this.clock.local.getTime() - this.clock.tzoffset);

    //document.clock.LOCAL.value = ToDateStr(CMP);
    //#this.display_date_time(CMP, $('#device_clock'));

    if (this.Results.length == 0) return; // not ready

    utcms = this.clock.local.getTime() + this.clock.Offset + this.Interval / 2;
    utcsec = Math.floor(utcms / 1000);

    this.clock['ntp'] = new Date(utcms);
    UTC_TIMESTAMP = new Date(utcms);

    this.clock['ist'] = new Date(utcms + 5.5 * 3600000); // IST = UTC + 9H

    let j =
      this.calanderService.gregorian_to_jd(
        this.clock.ntp.getFullYear(),
        this.clock.ntp.getMonth() + 1,
        this.clock.ntp.getDate()
      ) +
      (this.clock.ntp.getSeconds() +
        60 * (this.clock.ntp.getMinutes() + 60 * this.clock.ntp.getHours())) /
        86400.0;

    this.clock['indCal'] = this.calanderService.jd_to_indian_civil(j);

    let IST = new Date(utcms + 5.5 * 3600000); // IST = UTC + 9H
    //document.clock.IST.value = ToDateStr(IST);
    //this.display_date_time(IST, $('#ist'));

    UTC = new Date(utcms);
    //document.clock.UTC.value = ToDateStr(UTC);
    //this.display_date_time(UTC, $('#utc'));

    LOC = new Date(utcms - this.clock.tzoffset);
    //document.clock.LOC.value = ToDateStr(LOC);
    //this.display_date_time(LOC, $('#lst'));

    sec = Math.round((this.clock.Offset / 1000) * 10) / 10;
    $('#clock_diff').removeClass();

    let diff_sec = Math.abs(parseInt(sec.toString()));
    let a = sec;
    let b = this.diff_sec;

    let milli_sec = 0;

    if (sec < 0) {
      milli_sec = (-1 * sec - diff_sec) * 10;
    } else {
      milli_sec = (sec - diff_sec) * 10;
    }
    milli_sec = parseInt(milli_sec.toString());

    let diff_hour = parseInt((diff_sec / 3600).toString());
    let diff_min = parseInt(((diff_sec % 3600) / 60).toString());
    diff_sec = diff_sec % 60;

    let view_diff_hour = diff_hour.toString();
    let view_diff_min = diff_min.toString();
    let view_diff_sec = diff_sec.toString();

    if (diff_hour < 10) view_diff_hour = '0' + view_diff_hour;
    if (diff_min < 10) view_diff_min = '0' + view_diff_min;
    if (diff_sec < 10) view_diff_sec = '0' + view_diff_sec;
    //console.log(sec);
    if (sec == 0) {
      $('#diff_amt').html('00:00:00.0');

      //document.clock.offset.value = Text.correct;
      $('#clock_diff').addClass('col-sm-3 green');
    } else {
      $('#clock_diff').addClass('col-sm-3 red');

      $('#diff_amt').html(
        view_diff_hour +
          ':' +
          view_diff_min +
          ':' +
          view_diff_sec +
          '.' +
          Math.abs(milli_sec) +
          (sec < 0 ? ' Fast' : ' Slow')
      );

      /*
        $('#diff_amt').html(Math.abs(sec) +
          ((sec < 0) ? Text.fast : Text.slow));
    
        document.clock.offset.value = Math.abs(sec) +
          ((sec < 0) ? Text.fast : Text.slow);
          */
    }
  }
}
