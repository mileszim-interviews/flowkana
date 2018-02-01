import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  columnArray: [],
  columns: 2,
  csvArray: [],
  errorMsg: null,

  parseCSV(csvString) {
    return csvString.split(',').map(item => item.trim());
  },

  validateCSV(csvString) {
    try {
      let csvArray = this.parseCSV(csvString);
      if (csvArray.length < 1 || csvArray.length > 100) {
        this.set('csvErrorMsg', `CSV must have between 1 and 100 items. The current string has ${csvArray.length}`);
        return false;
      }
    } catch(e) {
      console.error(e);
      this.set('csvErrorMsg', 'CSV String malformed. Please try again.');
      return false;
    }
    return csvArray;
  },

  actions: {
    submitCSV(csvForm) {
      const { csvString, columns } = csvForm.get('csvString', 'columns');
      this.set('columns', columns);

      let csvArray = validateCSV(csvString);
      if (!csvArray) { return false; }
      this.set('csvArray', csvArray);
      this.set('errorMsg', null);
    }
  }
});
