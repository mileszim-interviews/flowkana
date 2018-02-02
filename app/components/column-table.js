import Component from '@ember/component';
import { computed } from '@ember/object';
import _array from 'lodash/array';

export default Component.extend({
  columnArray: [],
  numColumns: 2,
  rowHeader: [1, 2],

  numFullColumns: computed('columnArray.[]', 'numColumns', function() {
    return this.get('columnArray.length') % this.get('numColumns');
  }),

  numShortColumns: computed('numFullColumns', 'numColumns', function() {
    return this.get('numColumns') - this.get('numFullColumns');
  }),

  columnLength: computed('columnArray.[]', 'numColumns', function() {
    if (this.get('columnArray.length') == 0) { return 0; }
    return Math.ceil(this.get('columnArray.length')/this.get('numColumns'));
  }),

  matrix: computed('columnArray.@each', 'numColumns', 'columnLength', 'numFullColumns', 'numShortColumns', function() {
    let m = [];
    let i = 0;
    let j = 0;
    this.get('columnArray').forEach((item, index) => {
      if (!m[i]) { m[i] = []; }
      if (index % this.get('numFullColumns')) {
        m[i][j] = item;
      } else
      if (index % this.get('numShortColumns')) {
        if (item) { m[i][j] = item; }
        m[i][j] = '';
      }
      j = j + 1;
      if (j === (this.get('numColumns') - 1)) {
        j = 0;
        i = i + 1;
      }
    });
    return m;
  })
});
