import DS from 'ember-data';
export default DS.Model.extend({
	title:DS.attr(),
	update_time:DS.attr(),
	create_time:DS.attr(),
	column_id:DS.belongsTo("column"),
	click:DS.attr(),
	HTML:DS.attr(),
	status:DS.attr(),
	editor:DS.attr(),
})