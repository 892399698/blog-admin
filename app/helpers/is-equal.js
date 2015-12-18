export default Ember.Helper.helper(function([leftSide, rightSide]) {
    return leftSide === rightSide;
});