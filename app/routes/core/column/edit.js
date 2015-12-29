import common from '../../../common';
export default Ember.Route.extend({
    model: function(params) {
        var id = params.id;
        if (!id) {
            common.tips.error("错误，id不存在");
        }

        var columnDefer = Ember.RSVP.defer();
        this.store.findRecord('column', id, {
            reload: true
        }).then(function(res) {
            columnDefer.resolve(res);
        }, function(error) {
            var msg = error.msg || "错误！";
            common.tips.error(msg);
        })

        return Ember.RSVP.hash({
          column:columnDefer.promise
        })

    },
    setupController: function(c, m) {
      c.setProperties({
        columnData:m.column
      })
    },
    actions:{
      willTransition:function(){
        this.get('controller.model').rollback();
      },
      error:function(err){
        common.tips.error(err);
      }
    }
})
