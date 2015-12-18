import common from 'blog-admin/common';

export default Ember.Controller.extend({
  actions:{
      submit:function(data){
        console.log(data);
        var ajaxing=this.get("ajaxing"),
          self=this;
        if(!data.name){
          common.tips.error("栏目名称不能为空！");
        }
        if(ajaxing){
          return false;
        }
        // var url = UDD.urls.apiBase+'/columns';
        data.save().then(function(){
            common.tips.success("保存成功！");
            self.transitionToRoute("core.column");
        },function(res){
          common.tips.error(res.msg);
        }).finally(function(){
          self.set("ajaxing",false);
        });
        // $.ajax({
        //   url:url,
        //   data:data,
        //   method:"INPUT"
        // }).then(function(res){
        //   if(res.code ===1000){
        //     common.tips.success("保存成功！");
        //     self.transitionToRoute("column.index");
        //   }else{
        //     common.tips.error(res.msg);
        //   }
        // },function(res){
        //   common.tips.error(res.msg);
        // }).always(function(){
        //   self.set("ajaxing",false);
        // })


      }
  }
});