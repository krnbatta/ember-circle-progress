import Ember from 'ember';
import layout from '../templates/components/circle-progress';
import DS from 'ember-data';

export default Ember.Component.extend({
  layout: layout,
  value: 50,
  maxValue: 100,
  label: '',
  r: 50,
  cx: 60,
  cy: 60,
  cf: Ember.computed('r', function() {
    return 2 * Math.PI * this.get('r');
  }),
  offsetObs: Ember.observer('percentage', 'cf', function() {
    return this.setOffset();
  }),
  percentage: Ember.computed('value', 'maxValue', function() {
    var f;
    f = this.get('value') * 100 / this.get('maxValue');
    return f.toFixed();
  }),
  poor: Ember.computed('percentage', function() {
    return this.get('percentage') < 50;
  }),
  good: Ember.computed('percentage', function() {
    return this.get('percentage') >= 75;
  }),
  classNames: ['circle-progress'],
  options: {
    showPercentage: true,
    bgColor: 'transparent',
    arcColor: 'red',
    labelColor: 'green'
  },
  didInsertElement: function() {
    var options;
    this.setConfig();
    options = $.extend({}, this.get('options'));
    this.draw(options);
    return this.setOffset();
  },
  draw: function(options) {
    var $circle, c, pct, r, val;
    console.log(options);
    val = parseInt(this.get('percentage'));
    $circle = $("svg bar");
    if (isNaN(val)) {
      val = 100;
    } else {
      r = $circle.attr("r");
      c = Math.PI * (r * 2);
      if (val < 0) {
        val = 0;
      }
      if (val > 100) {
        val = 100;
      }
      pct = ((100 - val) / 100) * c;
    }
  },
  setConfig: function() {
    var margin, p, r, width;
    width = this.$().width();
    margin = 50;
    p = 15;
    r = (width - margin) / 2;
    this.set('r', r);
    this.set('cx', r + p);
    return this.set('cy', r + p);
  },
  setOffset: function() {
    var ofs;
    ofs = (1 - this.get('percentage') / 100) * this.get('cf');
    return this.$('.arc').css('stroke-dashoffset', ofs);
  }

});
