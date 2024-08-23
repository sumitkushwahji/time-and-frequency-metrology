import { Injectable } from '@angular/core';
declare var mod: any;

@Injectable({
  providedIn: 'root'
})
export class CalanderService {

  GREGORIAN_EPOCH = 1721425.5;



  constructor() { }
  jd_to_indian_civil(jd: any) {
    var Caitra, Saka, greg, greg0, leap, start, year, yday, mday;

    Saka = 79 - 1;                    // Offset in years from Saka era to Gregorian epoch
    start = 80;                       // Day offset between Saka and Gregorian

    jd = Math.floor(jd) + 0.5;
    greg = this.jd_to_gregorian(jd);       // Gregorian date for Julian day
    leap = this.leap_gregorian(greg[0]);   // Is this a leap year?
    year = greg[0] - Saka;            // Tentative year in Saka era
    greg0 = this.gregorian_to_jd(greg[0], 1, 1); // JD at start of Gregorian year
    yday = jd - greg0;                // Day number (0 based) in Gregorian year
    Caitra = leap ? 31 : 30;          // Days in Caitra this year

    if (yday < start) {
      //  Day is at the end of the preceding Saka year
      year--;
      yday += Caitra + (31 * 5) + (30 * 3) + 10 + start;
    }

    yday -= start;
    let month = undefined;
    let day = undefined;
    if (yday < Caitra) {
      month = 1;
      let day = yday + 1;
    } else {
      mday = yday - Caitra;
      if (mday < (31 * 5)) {
        month = Math.floor(mday / 31) + 2;
        day = (mday % 31) + 1;
      } else {
        mday -= 31 * 5;
        month = Math.floor(mday / 30) + 7;
        day = (mday % 30) + 1;
      }
    }

    return new Array(year, month, day);
  }
  jd_to_gregorian(jd: any) {
    var wjd, depoch, quadricent, dqc, cent, dcent, quad, dquad,
      yindex, dyindex, year, yearday, leapadj;

    wjd = Math.floor(jd - 0.5) + 0.5;
    depoch = wjd - this.GREGORIAN_EPOCH;
    quadricent = Math.floor(depoch / 146097);
    dqc = mod(depoch, 146097);
    cent = Math.floor(dqc / 36524);
    dcent = mod(dqc, 36524);
    quad = Math.floor(dcent / 1461);
    dquad = mod(dcent, 1461);
    yindex = Math.floor(dquad / 365);
    year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
    if (!((cent == 4) || (yindex == 4))) {
      year++;
    }
    yearday = wjd - this.gregorian_to_jd(year, 1, 1);
    leapadj = ((wjd < this.gregorian_to_jd(year, 3, 1)) ? 0
      :
      (this.leap_gregorian(year) ? 1 : 2)
    );
    let month = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
    let day = (wjd - this.gregorian_to_jd(year, month, 1)) + 1;

    return new Array(year, month, day);
  }
  gregorian_to_jd(year: any, month: any, day: any) {
    return (this.GREGORIAN_EPOCH - 1) +
      (365 * (year - 1)) +
      Math.floor((year - 1) / 4) +
      (-Math.floor((year - 1) / 100)) +
      Math.floor((year - 1) / 400) +
      Math.floor((((367 * month) - 362) / 12) +
        ((month <= 2) ? 0 :
          (this.leap_gregorian(year) ? -1 : -2)
        ) +
        day);
  }
  leap_gregorian(year: any) {
    return ((year % 4) == 0) &&
      (!(((year % 100) == 0) && ((year % 400) != 0)));
  }
}
