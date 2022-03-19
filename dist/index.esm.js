function getSafeIndex(index, totalPages) {
    return index < 1 ? 1 : index > totalPages ? totalPages : index;
}
class PaginationCore {
    props;
    pages;
    _cb;
    constructor(options, callback) {
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
    prev() {
        this.to(this.props.current - 1);
    }
    next() {
        this.to(this.props.current + 1);
    }
    to(page) {
        const { current, totalPages } = this.props;
        if (getSafeIndex(page, totalPages) !== current) {
            this.set({ current: page });
        }
    }
    set(options) {
        let key;
        for (key in options) {
            this.props[key] = options[key];
        }
        this.pages = [];
        this._init();
    }
    _init() {
        const { props, pages, _cb } = this;
        const { current, total, pageSize, maxLength } = props;
        const totalPages = total ? Math.ceil(total / pageSize) : 1;
        const length = totalPages > maxLength ? maxLength : totalPages;
        const ellipsisPrerequisites = length >= 5;
        const activeIndex = getSafeIndex(current, totalPages);
        let startIndex = activeIndex - (length - length % 2) / 2;
        let endIndex = startIndex + length - 1;
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
        const backEllipsis = ellipsisPrerequisites && endIndex < totalPages;
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
    }
}

export { PaginationCore as default };
