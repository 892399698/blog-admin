// import common from 'blog-admin/common';
export default Ember.Route.extend({
    model: function() {
        return {
            column:{}
        };
    },
    setupController: function(c, m) {
      c.setProperties({
        columnData:m.column
      });
    },
});
