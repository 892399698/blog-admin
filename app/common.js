/*公用js*/

var common = {
    injectData: function(name, data, regType) {
        var regName = (regType || "default") + ":" + name;
        if (!name){
            return false;
        }

        currentApp.register(regName, data || {}, {
            instantiate: false
        });
        currentApp.inject("controller", name, regName);
        currentApp.inject("route", name, regName);
        currentApp.inject("component", name, regName);
        currentApp.inject("model", name, regName);
    },
    tips: {
        /*
            type: success/info/warning/danger
            text:
            container: element
        */
        _base: function(type, text, container) {
            if (!type || !text){
                return false;
            }

            type = type || "info";
            container = $(container || "body");
            container.find(">.alert").remove();

            var el = $([
                '<div class="alert alert-' + type + ' alert-dismissible">',
                '   <a class="close" data-dismiss="alert">&times;</a>',
                text,
                '</div>'
            ].join(''));
            // var offset = container.offset();
            // var ow = container.outerWidth();
            var _timeout;
            var _remove = function() {
                _timeout = setTimeout(function() {
                    el.slideUp(function() {
                        el.remove();
                    });
                }, 4000);
            };

            container.append(el);

            _remove();
            el.hover(function() {
                clearTimeout(_timeout);
            }, _remove);

            return el.slideDown();
        },
        info: function(text) {
            return this._base("info", text || "");
        },
        warn: function(text) {
            return this._base("warning", text || "");
        },
        success: function(text) {
            return this._base("success", text || "保存成功");
        },
        error: function(text) {
            return this._base("danger", text || "保存失败");
        },

    },
    scrollbar: function(el, cfg) {
        if (!el) {
            return false;
        }

        try {
            switch (cfg) {
                case "scrollbar":
                case "scrollbar-x":
                case "scrollbar-y":
                    el.addClass("scrollbar " + cfg);
                    break;
                default:
                    el.niceScroll(_.extend({
                        styler: "fb",
                        cursorcolor: "#65cea7",
                        cursorwidth: '5',
                        cursorborderradius: '0px',
                        background: '#424f63',
                        spacebarenabled: false,
                        cursorborder: '10'
                    }, cfg));
                    break;
            }

        } catch (ex) {}
    },
};
export default common;
