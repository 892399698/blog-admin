import common from 'blog-admin/common';

export default Ember.Controller.extend({
	columnData:{},
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
	      var url = UDD.urls.apiBase+'/columns';
	      $.post(url,data).then(function(res){
	      	if(res.code ===1000){
	      		common.tips.success("保存成功！");
	      	}else{
	      		common.tips.error(res.msg);
	      	}
	      },function(res){
	      	common.tips.error(res.msg);
	      }).always(function(){
	      	self.set("ajaxing",false);
	      })


	    }
  }
})