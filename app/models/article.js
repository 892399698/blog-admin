import DS from 'ember-data';
export default DS.Model.extend({
	title:DS.attr(),
	update_time:DS.attr(),
	create_time:DS.attr(),

})