export default Ember.Component.extend({
  tagName: "a",
  classNames: ["thumbnail", "image-thumb"],
  complete: function () {
    return this.get("image.progress") === 100;
    //return false;
  }.property("image.progress"),
  layout: Ember.Handlebars.compile(
    '<img {{bind-attr src=image.thumb}} />' +
    '{{#if image.selected}}' +
    '<div class="check-wrapper"><i class="fa fa-check"></i> </div>' +
    '{{/if}}' +
    '{{#unless complete}}' +
    '<div class="inner-modal-backend"></div>' +
    '<div class="inner-modal">{{image.progress}}%</div>' +
    '{{/unless}}'
  ),
  click(){
    if (this.get("complete")) {
      this.toggleProperty("image.selected");
    }
  }
});
