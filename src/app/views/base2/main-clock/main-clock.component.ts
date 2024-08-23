import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CalanderService } from '../../../services/calander.service';
import { WebTimeService } from '../../../services/web-time.service';
import { NplModule } from 'src/app/npl.module';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-clock',
  standalone: true,
  imports: [NplModule],
  templateUrl: './main-clock.component.html',
  styleUrl: './main-clock.component.scss',
})
export class MainClockComponent implements OnInit {
  clock = this.webTimeService.clock;
  hindi = true;
  j: any = undefined;
  indcal: any = undefined;
  localTime = new Date();

  maas = [
    'चैत्र',
    'वैशाख',
    'ज्येष्ठ',
    'आषाढ़',
    'श्रावण',
    'भाद्रपद',
    'आश्विन',
    'कार्तिक',
    'मार्गशीर्ष',
    'पौष',
    'माघ',
    'फाल्गुन',
  ];
  hindiMonth = [
    'chaitra',
    'Vaisākha',
    'Jyēshtha',
    'Āshādha',
    'Shrāvana',
    'Bhādra',
    'Āshwin',
    'Kārtika',
    'Agrahāyana',
    'Pausha',
    'Māgha',
    'Phālguna',
  ];
  din = [
    'रविवार',
    'सोमवार',
    'मंगलवार',
    'बुधवार',
    'गुरूवार',
    'शुक्रवार',
    'शनिवार',
  ];
  mahina = [
    'जनवरी',
    'फरवरी',
    'मार्च',
    'अप्रैल',
    'मई',
    'जून',
    'जुलाई',
    'अगस्त',
    'सितम्बर',
    'अक्तूबर',
    'नवम्बर',
    'दिसम्बर',
  ];

  config: any;

  constructor(
    private router: Router,
    private webTimeService: WebTimeService,
    private calanderService: CalanderService
  ) {}

  onClick(): void {
    this.router.navigate(['/sync-clock']); // Route to the new component
  }
  ngOnInit(): void {
    this.webTimeService.getConfig().subscribe((config) => {
      this.config = config;
      environment.domain = this.config.domain;

      this.webTimeService.start();
    });
    this.j =
      this.calanderService.gregorian_to_jd(
        this.localTime.getFullYear(),
        this.localTime.getMonth(),
        this.localTime.getDay()
      ) +
      (this.localTime.getSeconds() +
        60 * (this.localTime.getMinutes() + 60 * this.localTime.getHours())) /
        86400.0;
    console.log(this.indcal);

    setInterval(() => {
      if (this.hindi) this.hindi = false;
      else this.hindi = true;
    }, 10000);
  }
}
