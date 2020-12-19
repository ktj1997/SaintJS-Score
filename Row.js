/**
 * Return Value
 */
module.exports = class{
    constructor(data) {
      this.year = data[0];
      this.semester = data[1];
      this.subjName = data[3];
      this.credit = data[4];
      this.score = data[5];
      this.grade = data[6];
      this.profName = data[7];
    }
  };