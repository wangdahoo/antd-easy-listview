import React, { forwardRef, useState, useImperativeHandle, useRef, useEffect } from 'react';
import { Modal, Button, Divider, Input, Select, Table, Card, Drawer, message } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined, SearchOutlined, ReloadOutlined, PlusOutlined, ExportOutlined, EditOutlined } from '@ant-design/icons';
import { Form } from '@wangdahoo/antd-easy-form';
import classnames from 'classnames';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function FullscreenModal(props, ref) {
  var title = props.title,
      backText = props.backText;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      _setVisible = _useState2[1];

  useImperativeHandle(ref, function () {
    return {
      setVisible: function setVisible(visible) {
        return _setVisible(visible);
      }
    };
  });

  var createTitle = function createTitle(title) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
      type: "link",
      icon: /*#__PURE__*/React.createElement(ArrowLeftOutlined, null),
      style: {
        paddingLeft: 0
      },
      onClick: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(props.onBack && typeof props.onBack === 'function')) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return props.onBack();

              case 3:
                _setVisible(false);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))
    }, backText || '返回'), props.onDelete ? /*#__PURE__*/React.createElement(Button, {
      type: "link",
      icon: /*#__PURE__*/React.createElement(DeleteOutlined, null),
      style: {
        paddingLeft: 0
      },
      onClick: function onClick() {
        Modal.confirm({
          centered: true,
          title: '提示',
          content: "\u786E\u5B9A\u5220\u9664\u8BE5".concat(props.itemName, "\uFF1F"),
          onOk: function () {
            var _onOk = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!props.onDelete) {
                        _context2.next = 3;
                        break;
                      }

                      _context2.next = 3;
                      return props.onDelete();

                    case 3:
                      _setVisible(false);

                    case 4:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));

            function onOk() {
              return _onOk.apply(this, arguments);
            }

            return onOk;
          }()
        });
      }
    }, "\u5220\u9664") : null, /*#__PURE__*/React.createElement(Divider, {
      type: "vertical"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        paddingLeft: 15
      }
    }, title));
  };

  return /*#__PURE__*/React.createElement(Modal, {
    title: createTitle(title),
    visible: visible,
    className: "elv-fullscreen-modal",
    footer: null,
    closable: false
  }, props.children);
}
var FullscreenModal$1 = forwardRef(FullscreenModal);

var defaultOptions = function defaultOptions() {
  return {
    itemName: '',
    // listview 自定义 class
    className: '',
    // 外层 card 的 extra 宽度
    extraWidth: 'auto',
    // 外层 card 的 extra 中的搜索框占位符
    extraSearchPlaceholder: '请输入关键字',
    // table options
    tableClassName: '',
    tableColumns: [],
    tableOperations: ['update', 'delete'],
    tableWrapper: 'card',
    tableScroll: undefined,
    filters: [],
    createItemEnabled: true,
    batchDeleteEnabled: false,
    // apis
    createItem: function createItem() {
      return Promise.resolve();
    },
    deleteItem: function deleteItem() {
      return Promise.resolve();
    },
    updateItem: function updateItem() {
      return Promise.resolve();
    },
    fetchItems: function fetchItems() {
      return Promise.resolve({
        items: [],
        total: 0,
        pageNum: 1,
        pageSize: 10
      });
    },
    batchDeleteItems: function batchDeleteItems() {
      return Promise.resolve();
    },
    // form
    createFormItems: function createFormItems() {
      return [];
    },
    updateFormItems: function updateFormItems() {
      return [];
    },
    formLabelWidth: 100,
    detailTitle: '',
    creationTitle: '',
    // export options
    exportEnabled: false,
    exportItems: undefined
  };
};

var Search = Input.Search;
function createListView(options) {
  if (!options.itemName) throw new Error('itemName 不能为空');
  options = Object.assign({}, defaultOptions(), options || {});
  var _options = options,
      itemName = _options.itemName,
      className = _options.className,
      extraWidth = _options.extraWidth,
      extraSearchPlaceholder = _options.extraSearchPlaceholder,
      extraAddOn = _options.extraAddOn,
      tableClassName = _options.tableClassName,
      tableColumns = _options.tableColumns,
      tableOperations = _options.tableOperations,
      tableWrapper = _options.tableWrapper,
      tableScroll = _options.tableScroll,
      filters = _options.filters,
      createItemEnabled = _options.createItemEnabled,
      batchDeleteEnabled = _options.batchDeleteEnabled,
      createItem = _options.createItem,
      deleteItem = _options.deleteItem,
      updateItem = _options.updateItem,
      fetchItems = _options.fetchItems,
      batchDeleteItems = _options.batchDeleteItems,
      createFormItems = _options.createFormItems,
      updateFormItems = _options.updateFormItems,
      formLabelWidth = _options.formLabelWidth,
      detailTitle = _options.detailTitle,
      createDetailComponent = _options.createDetailComponent,
      creationTitle = _options.creationTitle,
      createCreationComponent = _options.createCreationComponent,
      exportEnabled = _options.exportEnabled,
      exportItems = _options.exportItems;
  var FORM_TYPE_CREATE = 1;
  var FORM_TYPE_UPDATE = 2;
  return function ListView(props) {
    var _useState = useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        items = _useState2[0],
        setItems = _useState2[1];

    var _useState3 = useState({
      total: 0,
      pageNum: 1,
      pageSize: 10
    }),
        _useState4 = _slicedToArray(_useState3, 2),
        pagination = _useState4[0],
        setPagination = _useState4[1];

    var _useState5 = useState(''),
        _useState6 = _slicedToArray(_useState5, 2),
        keyword = _useState6[0],
        setKeyword = _useState6[1];

    var _useState7 = useState(false),
        _useState8 = _slicedToArray(_useState7, 2),
        drawerVisible = _useState8[0],
        setDrawerVisible = _useState8[1];

    var _useState9 = useState(''),
        _useState10 = _slicedToArray(_useState9, 2),
        drawerTitle = _useState10[0],
        setDrawerTitle = _useState10[1];

    var _useState11 = useState(0),
        _useState12 = _slicedToArray(_useState11, 2),
        formType = _useState12[0],
        setFormType = _useState12[1];

    var _useState13 = useState([]),
        _useState14 = _slicedToArray(_useState13, 2),
        innerTableColumns = _useState14[0],
        setInnerTableColumns = _useState14[1];

    var _useState15 = useState(null),
        _useState16 = _slicedToArray(_useState15, 2),
        record = _useState16[0],
        setRecord = _useState16[1];

    var _useState17 = useState(filters.filter(function (filter) {
      return typeof filter !== 'string';
    }).reduce(function (selectors, filter) {
      return _objectSpread2(_objectSpread2({}, selectors), {}, _defineProperty({}, filter.name, _objectSpread2(_objectSpread2({}, filter), {}, {
        value: filter.options[0].value
      })));
    }, {})),
        _useState18 = _slicedToArray(_useState17, 2),
        selectFilters = _useState18[0],
        setSelectFilters = _useState18[1];

    var _useState19 = useState([]),
        _useState20 = _slicedToArray(_useState19, 2),
        selectedRecords = _useState20[0],
        setSelectedRecords = _useState20[1]; // console.log(selectFilters)


    var detailRef = useRef(null);
    var creationRef = useRef(null);

    function formatFilters(filters, newSelectFilters) {
      return filters.map(function (filter) {
        if (typeof filter === 'string') {
          return filter;
        } else {
          var value = (newSelectFilters || selectFilters)[filter.name].value;
          return "".concat(filter.name, "=").concat(value === null || value === undefined ? '' : value);
        }
      });
    }

    var rowSelection = {
      fixed: true,
      columnWidth: 40,
      onChange: function onChange(selectedRowKeys, newSelectedRecords) {
        // console.log('newSelectedRecords: ', newSelectedRecords)
        setSelectedRecords(newSelectedRecords.filter(function (r) {
          return r !== undefined;
        }));
      }
    };
    useEffect(function () {
      if (props.created) props.created();
      resolveOptions(filters);
      onFetchItems(keyword, formatFilters(filters), pagination.pageNum, pagination.pageSize);
      setInnerTableColumns(createTableColumns(tableColumns, renderOperations));
    }, [props]);

    function resolveOptions(_x) {
      return _resolveOptions.apply(this, arguments);
    }

    function _resolveOptions() {
      _resolveOptions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(filters) {
        var i, filter;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                i = 0;

              case 1:
                if (!(i < filters.length)) {
                  _context7.next = 10;
                  break;
                }

                filter = filters[i];

                if (!(typeof filter !== 'string' && filter.getOptions)) {
                  _context7.next = 7;
                  break;
                }

                _context7.next = 6;
                return filter.getOptions(props);

              case 6:
                filter.options = _context7.sent;

              case 7:
                i++;
                _context7.next = 1;
                break;

              case 10:
                setSelectFilters(filters.filter(function (filter) {
                  return typeof filter !== 'string';
                }).reduce(function (selectors, filter) {
                  return _objectSpread2(_objectSpread2({}, selectors), {}, _defineProperty({}, filter.name, _objectSpread2(_objectSpread2({}, filter), {}, {
                    value: filter.options[0].value
                  })));
                }, {}));

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));
      return _resolveOptions.apply(this, arguments);
    }

    function onFetchItems(_x2, _x3, _x4, _x5) {
      return _onFetchItems.apply(this, arguments);
    }

    function _onFetchItems() {
      _onFetchItems = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(keyword, filters, pageNum, pageSize) {
        var searchProps, _yield$fetchItems, items, total;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                searchProps = {
                  keyword: keyword,
                  filters: filters,
                  pageNum: pageNum,
                  pageSize: pageSize
                }; // console.log('searchProps =>', searchProps)

                _context8.next = 3;
                return fetchItems(searchProps, props);

              case 3:
                _yield$fetchItems = _context8.sent;
                items = _yield$fetchItems.items;
                total = _yield$fetchItems.total;
                setItems(items || []);
                setPagination({
                  total: total,
                  pageNum: pageNum,
                  pageSize: pageSize
                });

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));
      return _onFetchItems.apply(this, arguments);
    }

    function onRefresh() {
      return _onRefresh.apply(this, arguments);
    }

    function _onRefresh() {
      _onRefresh = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return onFetchItems(keyword, formatFilters(filters), pagination.pageNum, pagination.pageSize);

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));
      return _onRefresh.apply(this, arguments);
    }

    function onChangeSelect(_x6, _x7) {
      return _onChangeSelect.apply(this, arguments);
    }

    function _onChangeSelect() {
      _onChangeSelect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(name, value) {
        var newSelectFilters;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                newSelectFilters = _objectSpread2(_objectSpread2({}, selectFilters), {}, _defineProperty({}, name, _objectSpread2(_objectSpread2({}, selectFilters[name]), {}, {
                  value: value
                })));
                _context10.next = 3;
                return onFetchItems(keyword, formatFilters(filters, newSelectFilters), 1, pagination.pageSize);

              case 3:
                setSelectFilters(newSelectFilters);

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));
      return _onChangeSelect.apply(this, arguments);
    }

    function onCreate() {
      if (createCreationComponent) {
        setTimeout(function () {
          if (creationRef.current !== null) {
            creationRef.current.setVisible(true);
          }
        });
        return;
      }

      setDrawerTitle("\u6DFB\u52A0".concat(itemName));
      setDrawerVisible(true);
      setFormType(FORM_TYPE_CREATE);
    }

    function onEdit(record) {
      // console.log('onEdit: ', record)
      if (createDetailComponent) {
        setRecord(null);
        setTimeout(function () {
          setRecord(record);

          if (detailRef.current !== null) {
            detailRef.current.setVisible(true);
          }
        });
        return;
      }

      setRecord(record);
      setDrawerTitle("\u7F16\u8F91".concat(itemName));
      setDrawerVisible(true);
      setFormType(FORM_TYPE_UPDATE);
    }

    function onDelete(record) {
      Modal.confirm({
        centered: true,
        title: '提示',
        content: "\u786E\u5B9A\u5220\u9664\u8BE5".concat(itemName, "\uFF1F"),
        onOk: function () {
          var _onOk = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return deleteItem(record, props);

                  case 2:
                    message.success("\u5220\u9664".concat(itemName, "\u6210\u529F"));
                    _context.next = 5;
                    return onFetchItems(keyword, formatFilters(filters), 1, pagination.pageSize);

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function onOk() {
            return _onOk.apply(this, arguments);
          }

          return onOk;
        }()
      });
    }

    function onBatchDelete() {
      Modal.confirm({
        centered: true,
        title: '提示',
        content: "\u786E\u5B9A\u5220\u9664\u9009\u4E2D\u7684".concat(itemName, "\uFF1F"),
        onOk: function () {
          var _onOk2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return batchDeleteItems(selectedRecords, props);

                  case 2:
                    message.success("\u6279\u91CF\u5220\u9664".concat(itemName, "\u6210\u529F"));
                    setSelectedRecords([]);
                    _context2.next = 6;
                    return onFetchItems(keyword, formatFilters(filters), 1, pagination.pageSize);

                  case 6:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          function onOk() {
            return _onOk2.apply(this, arguments);
          }

          return onOk;
        }()
      });
    }

    function onExport() {
      var exportProps = {
        keyword: keyword,
        filters: formatFilters(filters)
      };

      if (exportItems) {
        exportItems(exportProps, props);
      }
    }

    function onSubmit(_x8) {
      return _onSubmit.apply(this, arguments);
    }

    function _onSubmit() {
      _onSubmit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(form) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!(formType === FORM_TYPE_CREATE)) {
                  _context11.next = 4;
                  break;
                }

                _context11.next = 3;
                return createItem(form, props);

              case 3:
                message.success("\u6DFB\u52A0".concat(itemName, "\u6210\u529F"));

              case 4:
                if (!(formType === FORM_TYPE_UPDATE)) {
                  _context11.next = 8;
                  break;
                }

                _context11.next = 7;
                return updateItem(form, props);

              case 7:
                message.success("\u4FDD\u5B58".concat(itemName, "\u6210\u529F"));

              case 8:
                setDrawerVisible(false);
                _context11.next = 11;
                return onFetchItems(keyword, formatFilters(filters), 1, pagination.pageSize);

              case 11:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));
      return _onSubmit.apply(this, arguments);
    }

    var renderOperations = function renderOperations(_, record) {
      return /*#__PURE__*/React.createElement("div", {
        className: "operations"
      }, tableOperations.indexOf('update') > -1 ? /*#__PURE__*/React.createElement(Button, {
        type: "link",
        size: "small",
        icon: /*#__PURE__*/React.createElement(EditOutlined, null),
        onClick: function onClick() {
          return onEdit(record);
        }
      }, "\u7F16\u8F91") : null, tableOperations.indexOf('delete') > -1 ? /*#__PURE__*/React.createElement(Button, {
        type: "link",
        danger: true,
        size: "small",
        icon: /*#__PURE__*/React.createElement(DeleteOutlined, null),
        onClick: function onClick() {
          return onDelete(record);
        }
      }, "\u5220\u9664") : null);
    };

    var createTableColumns = function createTableColumns(tableColumns, renderOperations) {
      return tableColumns.concat(tableOperations.length > 0 ? [{
        title: '操作',
        key: 'operations',
        align: 'center',
        width: tableOperations.length > 1 ? 160 : 80,
        render: renderOperations
      }] : []).map(function (col) {
        return _objectSpread2(_objectSpread2({}, col), {}, {
          ellipsis: true
        }, col.detailLink ? {
          render: function render(val, record) {
            return /*#__PURE__*/React.createElement(Button, {
              type: "link",
              onClick: function onClick() {
                return onEdit(record);
              },
              style: {
                padding: 0,
                height: 20
              }
            }, val);
          }
        } : {});
      });
    };

    var listExtra = /*#__PURE__*/React.createElement("div", {
      className: "list-extra",
      style: {
        width: extraWidth
      }
    }, Object.keys(selectFilters).map(function (name, index) {
      return /*#__PURE__*/React.createElement("span", {
        key: index
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          float: 'left',
          lineHeight: '32px'
        }
      }, selectFilters[name].labelText), /*#__PURE__*/React.createElement("div", {
        style: {
          float: 'left'
        }
      }, /*#__PURE__*/React.createElement(Select, {
        style: _objectSpread2(_objectSpread2({}, selectFilters[name].selectStyle || {}), {}, {
          margin: '0 15px 0 5px'
        }),
        value: selectFilters[name].value,
        onChange: function onChange(value) {
          return onChangeSelect(name, value);
        },
        showSearch: true,
        optionFilterProp: "children",
        filterOption: function filterOption(input, option) {
          return (option === null || option === void 0 ? void 0 : option.props.children.toLowerCase().indexOf(input.toLowerCase())) >= 0;
        }
      }, selectFilters[name].options.map(function (option, optionIndex) {
        return /*#__PURE__*/React.createElement(Select.Option, {
          key: optionIndex,
          value: option.value
        }, option.text);
      }))));
    }), /*#__PURE__*/React.createElement(Search, {
      className: "input-search",
      placeholder: extraSearchPlaceholder,
      value: keyword,
      onChange: function onChange(e) {
        return setKeyword(e.target.value);
      },
      onSearch: /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return onFetchItems(keyword, formatFilters(filters), 1, pagination.pageSize);

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      })),
      enterButton: /*#__PURE__*/React.createElement(Button, {
        type: "primary",
        icon: /*#__PURE__*/React.createElement(SearchOutlined, null)
      }, "\u641C\u7D22")
    }), /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      icon: /*#__PURE__*/React.createElement(ReloadOutlined, null),
      style: {
        marginLeft: 10
      },
      onClick: onRefresh
    }, "\u5237\u65B0"), createItemEnabled ? /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      icon: /*#__PURE__*/React.createElement(PlusOutlined, null),
      style: {
        marginLeft: 10
      },
      onClick: onCreate
    }, "\u6DFB\u52A0") : null, batchDeleteEnabled ? /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      danger: true,
      disabled: selectedRecords.length === 0,
      icon: /*#__PURE__*/React.createElement(DeleteOutlined, null),
      style: {
        marginLeft: 10
      },
      onClick: onBatchDelete
    }, "\u5220\u9664") : null, exportEnabled && exportItems ? /*#__PURE__*/React.createElement(Button, {
      type: "default",
      icon: /*#__PURE__*/React.createElement(ExportOutlined, null),
      style: {
        marginLeft: 10
      },
      onClick: onExport
    }, "\u5BFC\u51FA") : null, extraAddOn && extraAddOn(props));
    var listContent = /*#__PURE__*/React.createElement(Table, {
      className: classnames('table-items', tableClassName),
      columns: innerTableColumns,
      dataSource: items,
      pagination: {
        total: pagination.total,
        current: pagination.pageNum,
        pageSize: pagination.pageSize,
        showTotal: function showTotal(total, _ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              start = _ref3[0],
              end = _ref3[1];

          return "\u5171 ".concat(total, " \u6761\u8BB0\u5F55\uFF0C\u5F53\u524D ").concat(start, " ~ ").concat(end);
        },
        showSizeChanger: true,
        onChange: function () {
          var _onChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(pageNum, pageSize) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return onFetchItems(keyword, formatFilters(filters), pageNum, pageSize || pagination.pageSize);

                  case 2:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));

          function onChange(_x9, _x10) {
            return _onChange.apply(this, arguments);
          }

          return onChange;
        }(),
        onShowSizeChange: function () {
          var _onShowSizeChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, newPageSize) {
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    setPagination(_objectSpread2(_objectSpread2({}, pagination), {}, {
                      pageSize: newPageSize
                    }));
                    _context5.next = 3;
                    return onFetchItems(keyword, formatFilters(filters), 1, newPageSize);

                  case 3:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5);
          }));

          function onShowSizeChange(_x11, _x12) {
            return _onShowSizeChange.apply(this, arguments);
          }

          return onShowSizeChange;
        }()
      },
      rowSelection: batchDeleteEnabled ? rowSelection : undefined,
      scroll: tableScroll
    });
    return /*#__PURE__*/React.createElement("div", {
      className: classnames('ant-layout', 'elv-list-view', className)
    }, /*#__PURE__*/React.createElement("div", {
      className: "ant-layout-content"
    }, tableWrapper !== 'none' ? /*#__PURE__*/React.createElement(Card, {
      title: options.title === false ? null : options.title || "".concat(itemName, "\u5217\u8868"),
      extra: listExtra
    }, listContent) : /*#__PURE__*/React.createElement("div", {
      className: "table-wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "list-extra-wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }), listExtra), listContent), /*#__PURE__*/React.createElement(Drawer, {
      title: drawerTitle,
      width: 800,
      placement: "right",
      onClose: function onClose() {
        return setDrawerVisible(false);
      },
      visible: drawerVisible
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 50px'
      }
    }, drawerVisible ? /*#__PURE__*/React.createElement(Form, {
      labelWidth: formLabelWidth,
      items: formType === FORM_TYPE_CREATE ? createFormItems && createFormItems(props) : updateFormItems && updateFormItems(record, props),
      onSubmit: onSubmit
    }) : null)), record !== null ? /*#__PURE__*/React.createElement(FullscreenModal$1, {
      title: detailTitle,
      ref: detailRef,
      onBack: function onBack() {
        return onFetchItems(keyword, formatFilters(filters), 1, pagination.pageSize);
      },
      itemName: itemName,
      onDelete: deleteItem ? /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return deleteItem(record, props);

              case 2:
                message.success("\u5220\u9664".concat(itemName, "\u6210\u529F"));
                _context6.next = 5;
                return onFetchItems(keyword, formatFilters(filters), 1, pagination.pageSize);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      })) : undefined
    }, createDetailComponent ? createDetailComponent(record, props, function () {
      if (detailRef.current) {
        detailRef.current.setVisible(false);
        onRefresh();
      }
    }) : null) : null, createCreationComponent ? /*#__PURE__*/React.createElement(FullscreenModal$1, {
      title: creationTitle,
      ref: creationRef,
      onBack: function onBack() {
        return onFetchItems(keyword, formatFilters(filters), 1, pagination.pageSize);
      },
      itemName: itemName
    }, createCreationComponent ? createCreationComponent(props, function () {
      if (detailRef.current) {
        detailRef.current.setVisible(false);
        onRefresh();
      }
    }) : null) : null));
  };
}
var createListViewOptions = defaultOptions;

export { createListView, createListViewOptions };
