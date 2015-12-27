import common from 'blog-admin/common';
var g=Ember.get;
var s=Ember.set;
export default Ember.Route.extend({
	model:function(){
		var columnDefer=Ember.RSVP.defer();
		Ember.$.get(UDD.urls.apiBase+"/columns/").then(function(res){
		// this.store.findAll("column").then(function(res){
			// var columns=res.content||[];
			// var formatColumns=columns.filter(function(_item){
			// 	if(_item._data.parent_id == 0){
			// 		var id = _item.id;
			// 		s(_item,"childrenColumn",[]);
			// 		var childrenColumn=columns.filter(function(_item){
			// 			if(_item._data.parent_id == id ){
			// 				return true;
			// 			}
			// 			return false;
			// 		});
			// 		console.log(childrenColumn)
			// 		_item.childrenColumn.pushObjects(childrenColumn);
			// 		// return _item;
			// 		return true;
			// 	}
			// 	return false;
			// })
			if(res.code ===1000){
				columnDefer.resolve(res.columns);
			}else{
				columnDefer.reject(res.msg);
			}
			
			// columnDefer.resolve(formatColumns);
		},function(res){
			columnDefer.reject(res.msg);
		});


		return Ember.RSVP.hash({
			columns:columnDefer.promise
		});
	},
	setupController:function(c,m){
		// console.log(m.columns)
		var columns=m.columns||[];
			var formatColumns=columns.filter(function(_item){
				// console.log(_item.get("parent_id"))
				var pid = _item.parent_id;
				if(pid == 0){
					var id = _item._id;
					s(_item,"childrenColumn",[]);
					var childrenColumn=columns.filter(function(_item){
						if(_item.parent_id == id ){
							return true;
						}
						return false;
					});
					_item.childrenColumn.pushObjects(childrenColumn);
					return true;
				}
				return false;
			})
		console.log(formatColumns)
		s(m,"columns",formatColumns);
		c.setProperties(m);
	},
	actions:{
		error:function(err){
			common.tips.error(err);
		},
		refreshModel:function(){
			this.refresh();
		}
	}
})	