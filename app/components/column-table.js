import Component from '@ember/component';
import Ember from 'ember';
import _array from 'lodash/array';

export default Component.extend({
  columnArray: [],
  numColumns: 2,

  numFullColumns: Ember.computed('columnArray.[]', 'numColumns', function() {
    return this.get('columnArray.length') % this.get('numColumns');
  }),

  numShortColumns: Ember.computed('numFullColumns, numColumns', function() {
    return this.get('numColumns') - this.get('numFullColumns');
  }),

  transposedColumnArray: Ember.computed('columnArray.@each', 'numColumns', 'numFullColumns', 'numShortColumns', function() {
    let { columnArray, numColumns } = this.getProperties('columnArray', numColumns);
    let chunked = _array.chunk(columnArray, numColomns);
    let lastArray = chunked.get('lastObject');
    for (let i = 0; i < (numColumns - lastArray.length); i++) {
      lastArray.pushObject('');
    }
    chunked.set('lastObject', lastArray);
    return _array.zip(chunked);
  })
});
