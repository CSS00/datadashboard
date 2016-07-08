/**
 * Created by congshan on 7/8/16.
 */
var ChartData = module.exports = {
    items: [],
    add: function(item) {
        ChartData.items.push(item);
    },
    remove: function() {
        ChartData.pop();
    }
};