export default Ember.Helper.helper(function([object, property]) {
    var type=Ember.typeOf(object);
    switch (type){
        case "object":
        case "instance":
        case "array":
            return Ember.get(object, property);
        default:
            return object
    }
});