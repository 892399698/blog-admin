/** ud-table 组建
    描述：表格排序、隐藏列、选择行、...
    作者：tango
    日期：2015/11/7
    参数：
        class[String] 样式名称
        needSort[Boolean] 需要排序, 默认false
        needCheckbox[Boolean] 需要checkbox，默认false
        needSwitchColumn[Boolean] 需要显示|隐藏列，默认false
        needAutoScroll[Boolean] 需要自动滚动条，默认true
        ids[String or Array] 唯一id
        columnNames[String or Array] 列名，以逗号分割 如："firstName,lastName"
        hideColumnNames[String or Array] 需要隐藏的列名，以逗号分割

        noSortColumnNames[String or Array] 不能排序的列名，以逗号分割
        noHideColumnNames[String or Array] 不能隐藏的列名，以逗号分割
    行为: 
        sortBy 排序时触发
            columnName 
            isAsc 是否升序
        switchColumn 切换显示|隐藏列后触发
            columnName
            isShow 是否显示
        checkedChanged 选择发生改变后触发
            ids []
    例子：
        {{#ud-table columnNames="firstName,lastName,username,password" hideColumnNames="password"}}
            <table>...</table>
        {{/ud-table}}
*/
import common from '../common';

var rowSelector = ">tbody>tr";
var colSelector = ">thead>tr>*";
var checkboxSelector = ":first-child:checkbox";
// var checkboxHtml = '<input type="checkbox"/>';

var toArray = function(arr) {
    if (!arr) return [];
    if (_.isArray(arr)) return arr;
    return (arr || "").split(",");
};

var getCacheKey = function() {
    return currentRouter.currentPath + "_hideColumnNames";;
};

var makeStyle = function(id, cssText) {
    var styleEl = $("#" + id);
    if (styleEl.size())
        return styleEl.html(cssText);

    styleEl = $('<style id="' + id + '">' + cssText + '</style>');
    styleEl.appendTo(document.head);
};

export default Ember.Component.extend({
    sortByAction: "sortBy",
    switchColumnAction: "switchColumn",
    checkedChangedAction: "checkedChanged",
    classNames: ["ud-table"],
    attributeBindings: ["style"],
    initData: function() {
        var self = this;
        var el = this.el = this.$();
        var tableEl = this.tableEl = el.find("table").eq(0);
        var colEls = this.colEls = tableEl.find(colSelector);
        var cachedKey = getCacheKey();
        // var className = this.get("class");

        //to Array of String or Array
        _(["columnNames", "hideColumnNames", "noSortColumnNames", "noHideColumnNames", "ids"]).each(function(name) {
            Em.set(self, name, toArray(self.get(name)));
        });
        //need options
        _(["needSort", "needSwitchColumn", "needCheckbox", "needAutoScroll"]).each(function(name) {
            Em.set(self, name, self.get(name));
            self[name] && el.addClass(name);
        });

        this.needAutoScroll = this.needAutoScroll !== false;
        this.needAutoScroll && el.addClass("needAutoScroll");

        if (cachedKey in localStorage)
            this.hideColumnNames = toArray(localStorage[cachedKey]);

        tableEl.addClass("table");
        // className && el.addClass(className);

        colEls.each(function(idx) {
            var it = $(this);
            var name = self.columnNames[idx] || "";
            name && it.data("name", name);
        });
    },
    initSort: function() {
        var self = this;
        var tableEl = this.tableEl;
        var colEls = this.colEls;

        colEls.append('<a class="fa fa-sort"></a>');
        tableEl.on("click", colSelector, function() {
            var it = $(this);
            var name = it.data("name");
            var isHide = it.data("isHide");
            var sortEl, isAsc;

            if (!name) return;

            sortEl = it.find(".fa-sort");
            isAsc = sortEl.is(".fa-sort-asc");

            colEls.find(".fa-sort").removeClass("fa-sort-asc fa-sort-desc");
            sortEl.addClass("fa-sort-" + (isAsc ? "desc" : "asc"));
            self.send("sortBy", name, !isAsc);
        });
    },
    initCheckbox: function() {
        var self = this;
        var ids = this.ids;
        var tableEl = this.tableEl;
        var colEls = this.colEls;
        var rowEls = tableEl.find(rowSelector);
        var checkedEach = function(itemCb) {
            var _ids = [];
            rowEls.find(checkboxSelector).each(function(idx) {
                itemCb && itemCb(this);
                this.checked && _ids.push(ids[idx] || idx);
            });
            self.send("checkedChanged", _ids);
        };

        // colEls.prepend("<th>" + checkboxHtml + "</th>");
        // rowEls.prepend("<td>" + checkboxHtml + "</td>");

        tableEl
            .on("change", rowSelector + " " + checkboxSelector, function() {
                checkedEach();
            })
            .on("click", checkboxSelector, function(ev) {
                ev.stopPropagation();
            });

        colEls.on("change", checkboxSelector, function(ev) {
            var checked = this.checked;
            checkedEach(function(el) {
                el.checked = checked;
            });
        });
    },
    initSwitchColumns: function() {
        var self = this;
        var el = this.el;
        var tableEl = this.tableEl;
        var colEls = this.colEls;
        var rowEls = tableEl.find(rowSelector);
        var optionsEl = el.find(".switchColumnOptions");
        var columnNames = this.columnNames;
        var hideColumnNames = this.hideColumnNames;
        var options = [];
        var validChecked = function() {
            var checkedCount = 0;
            optionsEl.find(":checkbox").each(function() {
                this.checked && (checkedCount++);
            });

            if (checkedCount < 1) {
                common.tips.error("至少保留一列显示");
                return false;
            }
            return true;
        }
        var makeOptions = function() {
            colEls.each(function(idx) {
                var it = $(this);
                var name = columnNames[idx];
                var isHide = hideColumnNames.length ? hideColumnNames.contains(name) : false;

                if (name) {
                    options.push({
                        index: idx,
                        name: name,
                        text: it.text(),
                        checked: !isHide
                    });
                }
            });
            self.set("switchColumnOptions", options);
            setTimeout(switchColumns, 10);
        };
        var switchColumns = function() {
            var hideNameArr = [],
                cssText = "";

            optionsEl.find("li").each(function(idx) {
                var it = $(this);
                var name = it.data("name");
                var inputEl = it.find("input");
                if (name && inputEl.size() && !inputEl[0].checked) {
                    hideNameArr.push(name);
                }
            });

            localStorage[getCacheKey()] = hideNameArr.join(",");

            colEls.each(function(idx) {
                var it = $(this);
                var name = it.data("name");
                if (_(hideNameArr).contains(name)) {
                    cssText += "#" + el[0].id + " tr>*:nth-child(" + (idx + 1) + "){display:none} ";
                }
            });

            makeStyle(el[0].id + "-style", cssText);
        };

        makeOptions();
        // optionsEl.css({
        //     top: (el.offset().top + 8) + "px"
        // });
        optionsEl.on("change", "input", function() {
            var it = $(this);
            var parentEl = it.parents("li");
            var name = parentEl.data("name");
            var index = parentEl.data("index");
            var checked = it[0].checked;

            if (!validChecked()) {
                it[0].checked = !checked;
                return;
            }

            switchColumns(index, checked);
            self.send("switchColumn", name, checked);
        });
    },
    didInsertElement: function() {
        this.initData();

        var self = this;
        var el = this.el;
        var tableEl = this.tableEl;

        if (!tableEl.size()) return;

        this.needSort && this.initSort();
        this.needSwitchColumn && this.initSwitchColumns();
        this.needCheckbox && this.initCheckbox();
        this.needAutoScroll && common.scrollbar(el, "scrollbar-x");
    },
    actions: {
        sortBy: function(name, isAsc) {
            this.sendAction("sortByAction", name, isAsc);
        },
        switchColumn: function(name, checked) {
            this.sendAction("switchColumnAction", name, checked);
        },
        checkedChanged: function(ids) {
            this.sendAction("checkedChangedAction", ids);
        }
    }
});