export default DS.Model.extend({
	name:DS.attr(),
	created_at:DS.attr(),
	updated_at:DS.attr(),
  parent_id:DS.attr(),
  sort:DS.attr(),
  seo_title:DS.attr(),
  keyword:DS.attr(),
  desc:DS.attr(),
})
