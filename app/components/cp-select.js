export default Ember.Component.extend({
    layoutName: "components/cp-select",
    content: null,
    selectedValue: null,
    tagName: "select",
    init: function() {
        var content = this.get('content')||[],
            value = this.get("value"),
            valuePath = this.get("optionValuePath"),
            contentFirst = content.get("firstObject"),
            selectedValue = this.get("selectedValue");
        if (!content) {
            this.set('content', []);
        }
        if (value) {
            this.set("selectedValue", content.findBy(valuePath, value));
            selectedValue = this.get("selectedValue");
        }
        if(selectedValue){
            this.set("value", Ember.get(selectedValue, valuePath));
            value = this.get("value");
        }
        if(!value && !selectedValue) {
            if (!this.get("prompt")) {
                this.set("selectedValue", contentFirst);
            }
        }
        this._super(...arguments);
    },
    changeSelectedValue: function() {
        var content = this.get('content'),
            value = this.get("value"),
            valuePath = this.get("optionValuePath"),
            v = content.findBy(valuePath, value);
        this.set("selectedValue", value && v);
    }.observes('value'),
    onSelectedValueChange: function() {
        this.set("value", this.get("selectedValue") && this.get("selectedValue." + this.get("optionValuePath")));
    }.observes("selectedValue"),
    change() {
        this.send("change");
    },
    actions: {
        change() {
            const changeAction = this.get('action');
            const selectedEl = this.$()[0];
            const selectedIndex = selectedEl.selectedIndex;
            const content = this.get('content');
            if (selectedIndex === 0 && this.get("prompt")) {
                this.set("selectedValue", null);
                return
            }
            const selectedValue = content.objectAt(selectedIndex - (this.get("prompt") ? 1 : 0));

            this.set('selectedValue', selectedValue);
            changeAction && changeAction(selectedValue);
        }
    }
});