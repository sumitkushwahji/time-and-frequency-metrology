/* Copyright (c) 2013 David Easley, http://easleyonline.appspot.com/
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
 
 
var UTC_TIMESTAMP;

function TodayClock(div) {
  var me = this;

  me.timeout = null;
  me.invert = div.hasClass('invert');
  me.highlightNearestHour = div.hasClass('highlight-nearest-hour');

  var initClock = function() {
    // In case we're responding to a window resize, remove any existing canvas elements and clear interval timer.
    if (me.timeout) {
      clearTimeout(me.timeout);
      me.timeout = null;
      div.html('');
      setTimeout(initClock, 0);  // start again on new thread, otherwise we sometimes get a ghost image of the last clock.
      return;
    }

    var w = div.width();
    var h = div.height();
    var d = Math.min(w, h);
    var scale = d / 300.0; // Nominal diameter is 300px, so scale accordingly.

    var createCanvasElementAndInitContext = function(z, relativeAdjustTop) {
      var canvas = $('<canvas width="' + d + '" height="' + d +
        '" style="display:block; z-index:' + z + '; position:relative; left:' + (w-d)/2 + 'px; top:' + ((h-d)/2 - (relativeAdjustTop ? h : 0)) + 'px;"></canvas>');
      canvas.appendTo(div);
      var ctx = canvas.get(0).getContext('2d');
      ctx.scale(scale, scale);
      ctx.translate(150,150);  // Reset origin
      return ctx;
    };
    me._clockStaticParts(createCanvasElementAndInitContext(0));
    me._clockMovingParts(createCanvasElementAndInitContext(1, true));
  };

  initClock();
  $(window).resize(initClock);
}
TodayClock.prototype = {
  _colourInversions: {},
  _clockStaticParts: function(ctx) {
    var me = this,
      twoPi = 2 * Math.PI,
      i;

    ctx.save();
    ctx.clearRect(-150,-150, 300,300);
    ctx.rotate(-twoPi / 4);

    // Face background
    ctx.beginPath();
    ctx.fillStyle = me._invert("#fff");
    ctx.arc(0,0, 149, 0,twoPi, true);
    ctx.fill();

    // Hour and minute marks
    ctx.save();
    //ctx.lineCap = "round";
    ctx.strokeStyle = me._invert("#444");
    for (i = 0; i < 60; i++) {
      ctx.beginPath();
      if (i % 5 === 0) { // hour
        ctx.lineWidth = 8;
        ctx.moveTo(130,0);
      } else { // minute
        ctx.lineWidth = 2;
        ctx.moveTo(135,0);
      }
      ctx.lineTo(148,0);
      ctx.stroke();
      ctx.rotate(twoPi / 60);
    }
    ctx.restore();

    // Clock surround
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.strokeStyle = me._invert('#444');
    ctx.arc(0,0, 147, 0, twoPi, true);
    ctx.stroke();

    ctx.restore();
  },
  _clockMovingParts: function(ctx) {
    var me = this,
      now = new Date(UTC_TIMESTAMP),
      ms = now.getMilliseconds(),
      sec = now.getSeconds(),
      min = now.getMinutes(),
      hr  = now.getHours(),
      twoPi = 2 * Math.PI,
      i;

    hr = hr >= 12 ? hr - 12 : hr;

    ctx.save();
    ctx.clearRect(-150,-150, 300,300);
    ctx.lineCap = "round";
    ctx.strokeStyle = me._invert("#000");
    ctx.rotate(-twoPi / 4);

    // Hour numerals
    var h  = hr  +  min / 60  +  sec / (60*60);
    h = h >= 12 ? h - 12 : h;
    ctx.save();
    ctx.rotate(twoPi / 4);
    ctx.font = "38px Arial";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var l = 105;
    for (i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.fillStyle = me._invert(me.highlightNearestHour && (i + 1) != Math.round(h) ? "#AAA" : "#444");
      var j = 12 - (i+7);
      ctx.fillText("" + (i + 1), l * Math.sin(j * twoPi/12), l * Math.cos(j * twoPi/12) + 2);
    }
    ctx.restore();

    // A short thick (hour) hand
    ctx.save();
    ctx.rotate(hr * twoPi/12 + min * twoPi/(60*12) + sec * twoPi/(60*60*12));
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(100,0);
    ctx.stroke();
    ctx.restore();

    // A long, thinner (minute) hand
    ctx.save();
    ctx.rotate(min * twoPi/60 + sec * twoPi/(60*60));
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(132,0);
    ctx.stroke();
    ctx.restore();

    // A thin sweep hand (seconds)
    ctx.save();
    ctx.rotate(sec * twoPi/60);
    ctx.strokeStyle = me._invert("#D40000");
    ctx.fillStyle = me._invert("#D40000");
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-30,0);
    ctx.lineTo(132,0);
    ctx.stroke();
    // centre
    ctx.beginPath();
    ctx.arc(0,0, 9, 0,twoPi, true);
    ctx.fill();
    // centre pivot
    ctx.beginPath();
    ctx.fillStyle = me._invert("#444");
    ctx.arc(0,0, 3, 0,twoPi, true);
    ctx.fill();
    ctx.restore();

    ctx.restore();

    // Calculate how long until next tic (ensures seconds hand is properly synchronised)
    me.timeout = setTimeout(function() {me._clockMovingParts(ctx);}, 1000 - ms);
  },
  _invert: function(colour) {
    var me = this;

    if (!me.invert)  // Not inverting, nothing to do
      return colour;

    // Check if we have inverted this colour before.
    var inverted = me._colourInversions[colour];
    if (inverted)
      return inverted;

    var c = colour.substring(1);
    if (c.length === 3)
      c = c.charAt(0) + c.charAt(0) + c.charAt(1) + c.charAt(1) + c.charAt(2) + c.charAt(2);
    if (c.length !== 6)
      return colour;
    var invertChannel = function(i) {
      var n = parseInt(c.substring(i, i + 2), 16) ^ 0xFF;
      var str = n.toString(16);
      return str.length === 1 ? '0' + str : str;
    };
    inverted = '#' + invertChannel(0) + invertChannel(2) + invertChannel(4);
    me._colourInversions[colour] = inverted;
    return inverted;
  }
};

function TodayTellTime(div) {
  var me = this;

  me.timeout = null;

  var initTellTime = function() {
    // In case we're responding to a window resize, remove any existing canvas elements and clear interval timer.
    if (me.timeout) {
      clearTimeout(me.timeout);
      me.timeout = null;
      div.html('');
      setTimeout(initTellTime, 0);  // start again on new thread, otherwise we sometimes get a ghost image of the last clock.
      return;
    }

    var w = div.width();
    var h = div.height();
    // Nominal w*h is 600*400, so scale accordingly.
    var wScale = w / 600.0;
    var hScale = h / 200.0;

    var createCanvasElementAndInitContext = function(z, relativeAdjustTop) {
      var canvas = $('<canvas width="' + w + '" height="' + h +
        '" style="display:block; z-index:' + z + '; position:relative; left:0px; top:' + (relativeAdjustTop ? -h : 0) + 'px;"></canvas>');
      canvas.appendTo(div);
      var ctx = canvas.get(0).getContext('2d');
      ctx.scale(wScale, hScale);
      ctx.translate(0,0);  // Reset origin
      return ctx;
    };
    me._movingParts(createCanvasElementAndInitContext(0));
    me._staticParts(createCanvasElementAndInitContext(1, true));
  };

  initTellTime();
  $(window).resize(initTellTime);
}
TodayTellTime.prototype = {
  _movingParts: function(ctx) {
    var me = this,
      now = new Date(),
      tNow = now.getTime(),
      tMin = 60 * 1000,
      ms = now.getMilliseconds(),
      s = now.getSeconds(),
      adj = 100.0 * ((s + ms/1000) / 60),
      textAdj = navigator.userAgent.indexOf("Firefox") !== -1 ? -3 : 0,
      nowStyle = "#000",
      notNowStyle = "#666",
      i, j, offset,
      minWidth = 6, secWidth = 1,
      minLen = 18, secLen = 10;

    // Write the times (3 + 1 times)
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0,0, 600,200);
    ctx.fillStyle = notNowStyle;
    ctx.font = "63px Arial";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(me._tellTime(tNow - tMin * 1), 300,  0 - adj - textAdj);
    if (s < 30)
      ctx.fillStyle = nowStyle;
    ctx.fillText(me._tellTime(tNow - tMin * 0), 300,100 - adj - textAdj);
    if (s < 30)
      ctx.fillStyle = notNowStyle;
    else
      ctx.fillStyle = nowStyle;
    ctx.fillText(me._tellTime(tNow + tMin * 1), 300,200 - adj - textAdj);
    ctx.fillStyle = notNowStyle;
    ctx.fillText(me._tellTime(tNow + tMin * 2), 300,300 - adj - textAdj);

    // Draw the graduations
    ctx.save();
    ctx.strokeStyle = "#444";
    for (i = 0; i < 3 + 1; i++) {
      ctx.lineWidth = minWidth;
      ctx.beginPath();
      offset = i * 100 - adj;
      ctx.moveTo(0, offset);
      ctx.lineTo(minLen, offset);
      ctx.stroke();
      ctx.moveTo(600 - minLen, offset);
      ctx.lineTo(600, offset);
      ctx.stroke();
      for (j = 1; j < 12; j++) {
        ctx.lineWidth = secWidth;
        ctx.beginPath();
        offset = i * 100 + (j * 100 / 12) - adj;
        ctx.moveTo(0, offset);
        ctx.lineTo(secLen, offset);
        ctx.stroke();
        ctx.moveTo(600 - secLen, offset);
        ctx.lineTo(600, offset);
        ctx.stroke();
      }
    }
    ctx.restore();

    // Calculate how long until next tic (ensures seconds hand is properly synchronised)
    me.timeout = setTimeout(function() {me._movingParts(ctx);}, 1000 - ms);
  },
  _staticParts: function(ctx) {
    var lineLen = 35,
      grd;

    grd = ctx.createLinearGradient(0, 0, 0, 200);
    grd.addColorStop(0, "rgba(0, 0, 0, 0.75)");
    grd.addColorStop(0.5, "rgba(255, 255, 255, 0)");
    grd.addColorStop(1, "rgba(0, 0, 0, 0.75)");
    ctx.fillStyle = grd;
    ctx.fillRect(0,0, 600,200);

    ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.moveTo(0,100);
    ctx.lineTo(lineLen,100);
    ctx.stroke();
    ctx.moveTo(600 - lineLen,100);
    ctx.lineTo(600,100);
    ctx.stroke();
  },
  _tellTime: function(time) {
    var date = new Date(time),
      min = date.getMinutes(),
      hr  = date.getHours(),
      past = min <= 30,
      pastTo = past ? " past " : " to ";

    if (!past)
      hr++;

    hr = hr > 12 ? hr - 12 : hr;
    min = past ? min : 60 - min;

//wide: return "24 minutes past 12";
    if (min === 0)
      return hr + " o'clock";
    if (min === 15)
      return "quarter" + pastTo + hr;
    if (min === 30)
      return "half" + pastTo + hr;
    if (min % 5 === 0)
      return min + pastTo + hr;
    return min + " minute" + (min !== 1 ? "s" : '') + pastTo + hr;
  }
};


$(document).ready(function() {
  /*
  $('div.today-tell-time').each(function(idx, el) {
    new TodayTellTime($(el));
  });
  */
});

// eof
