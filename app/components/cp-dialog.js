/**
 * 确定按钮事件：submitAction
 * 参数：
 *     style:  自定义内联样式
 *     fire:   默认是否显示弹窗
 *     title:  默认header显示内容
 *     header: true/false   是否隐藏默认header，默认false，为true时需自己设置header
 */

export default Ember.Component.extend({
    classNameBindings: ["class", ":modal", ":fade"],
    title: "提示",
    fire:false,
    realStyle:function(){
      var style=this.get("style");
      if(!style){
        return;
      }
      return "style="+style;
    }.property("style"),
    didInsertElement: function() {
        var t = this.$(),
          self=this;
        var r = Math.floor(Math.random() + (new Date()).getTime());
        t.attr({
            id: "dialog" + r,
            role: "dialog",
        })
        // var head = t.find(".modal-header");
        // if (head.length > 1) {
        //     head.eq(0).remove();
        // }
        t.on('hide.bs.modal',function(){
          self.set("fire",false);
        })
    },
    changeFire: function() {
        var fire = this.get("fire");
        var options = this.get("options") || {};
        if (fire) {
            this.$().modal(options);
        } else {
            this.$().modal('hide');
        }
    }.observes("fire"),
    actions: {
        submit: function() {
            this.sendAction("submitAction", this);
        },
        close:function(){
          this.set("fire",false);
        }
    }
})
