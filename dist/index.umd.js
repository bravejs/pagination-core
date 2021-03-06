(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.PaginationCore = factory());
})(this, (function () { 'use strict';

    function getSafeIndex(index, totalPages) {
        return index < 1 ? 1 : index > totalPages ? totalPages : index;
    }
    var PaginationCore = /** @class */ (function () {
        function PaginationCore(options, callback) {
            this.props = {
                current: 1,
                total: 0,
                pageSize: 50,
                maxLength: 9,
                totalPages: 0
            };
            this._cb = callback;
            this.set(options);
        }
        PaginationCore.prototype.prev = function () {
            this.to(this.props.current - 1);
        };
        PaginationCore.prototype.next = function () {
            this.to(this.props.current + 1);
        };
        PaginationCore.prototype.to = function (page) {
            var _a = this.props, current = _a.current, totalPages = _a.totalPages;
            if (getSafeIndex(page, totalPages) !== current) {
                this.set({ current: page });
            }
        };
        PaginationCore.prototype.set = function (options) {
            var key;
            for (key in options) {
                this.props[key] = options[key];
            }
            this.pages = [];
            this._init();
        };
        PaginationCore.prototype._init = function () {
            var _a = this, props = _a.props, pages = _a.pages, _cb = _a._cb;
            var current = props.current, total = props.total, pageSize = props.pageSize, maxLength = props.maxLength;
            var totalPages = total ? Math.ceil(total / pageSize) : 1;
            var length = totalPages > maxLength ? maxLength : totalPages;
            var ellipsisPrerequisites = length >= 5;
            var activeIndex = getSafeIndex(current, totalPages);
            var startIndex = activeIndex - (length - length % 2) / 2;
            var endIndex = startIndex + length - 1;
            if (startIndex < 1) {
                startIndex = 1;
                endIndex = length;
            }
            else if (endIndex > totalPages) {
                startIndex = totalPages - length + 1;
                endIndex = totalPages;
            }
            if (ellipsisPrerequisites && startIndex > 1) {
                startIndex += 2;
                pages.push(1, 0);
            }
            var backEllipsis = ellipsisPrerequisites && endIndex < totalPages;
            if (backEllipsis) {
                endIndex -= 2;
            }
            while (startIndex <= endIndex) {
                pages.push(startIndex++);
            }
            if (backEllipsis) {
                pages.push(0, totalPages);
            }
            props.current = activeIndex;
            props.totalPages = totalPages;
            if (_cb) {
                _cb(pages, props);
            }
        };
        return PaginationCore;
    }());

    return PaginationCore;

}));
