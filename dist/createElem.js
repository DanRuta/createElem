"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

window.createElem = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var elemCount = 1;

    if (Number.isInteger(args[0])) {
        if (args[0] > 0) {
            elemCount = args[0];
            args.shift();
        } else throw new Error("Element count must be larger than 0. Actual value: " + args[0]);
    } else if (Number(args[0]) === args[0] && args[0] % 1 !== 0) throw new Error("Floats are not supported for element count.");

    var tag = args[0] ? args[0] : "div";
    args.shift();

    if (typeof tag != "string") throw new Error("Tag name must be a string");

    var newElem = document.createElement(tag.replace(/(#.*)|(\..*)/g, ""));
    var id = tag.match(/#(?:(?![#\.]).)*/);
    var classes = tag.match(/\.(?:(?![#\.]).)*/g);

    if (id) {
        newElem.id = id[0].substr(1, id[0].length);
    }
    if (classes) {
        newElem.className = classes.map(function (c) {
            return c.substr(1, c.length);
        }).join(" ");
    }

    if (args.length) {

        if (typeof args[0] == "string") {
            newElem.innerHTML = args[0];
            args.shift();
        } else if (Object(args[0]) === args[0] && !(args[0] instanceof HTMLElement) && !Array.isArray(args[0])) {

            for (var attribute in args[0]) {
                (function () {

                    switch (attribute) {

                        case "class":
                            newElem.className = args[0].class;
                            break;

                        case "style":
                            var styles = args[0].style;

                            if (styles != null && styles != undefined && styles.constructor === Object) {

                                newElem.style.cssText = Object.keys(styles).map(function (k) {
                                    var key = k.replace(/[A-Z]/g, function (k2) {
                                        return "-" + k2.toLowerCase();
                                    });
                                    var value = typeof styles[k] == "number" ? styles[k] + "px" : styles[k];
                                    return key + ":" + value;
                                }).join(";");
                            } else if (typeof styles == "string") {
                                newElem.style.cssText = styles;
                            } else throw new Error("Style value must be either object or string.");
                            break;

                        case "events":
                            Object.keys(args[0].events).forEach(function (event) {

                                var fn = args[0].events[event];

                                if (Array.isArray(fn)) {
                                    fn.forEach(function (f) {
                                        return newElem.addEventListener(event, f);
                                    });
                                } else if (typeof fn == "function") {
                                    newElem.addEventListener(event, fn);
                                }
                            });
                            break;

                        case "dataset":
                            Object.keys(args[0].dataset).forEach(function (dskey) {

                                var dsvalue = args[0].dataset[dskey];

                                newElem.dataset[dskey] = dsvalue;
                            });
                            break;

                        default:
                            newElem[attribute] = args[0][attribute];
                    }
                })();
            }
            args.shift();
        }
    }

    var processItem = function processItem(item) {

        switch (true) {
            case item instanceof HTMLElement:
                newElem.appendChild(item);
                break;

            case Array.isArray(item):
                item.forEach(processItem);
                break;

            case !!item && item.constructor === Object:
                throw new Error("Multiple attributes objects not supported");
                break;

            default:
                if (item != null) {
                    console.warn("Unsupported parameter. Type: " + (typeof item === "undefined" ? "undefined" : _typeof(item)) + " Value:", item);
                }
        }
    };
    args.forEach(processItem);
    return elemCount > 1 ? [].concat(_toConsumableArray(new Array(elemCount))).map(function (e) {
        return newElem.cloneNode();
    }) : newElem;
};
