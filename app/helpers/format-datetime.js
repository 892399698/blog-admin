import Ember from 'ember';

export default Ember.Helper.extend({
  compute: function ([date], {format}) {
    format = format || "YYYY-MM-DD HH:mm:ss";
    return moment(date).format(format);
  }
});