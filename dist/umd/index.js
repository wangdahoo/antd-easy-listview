!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react"),require("antd"),require("@ant-design/icons"),require("@wangdahoo/antd-easy-form"),require("classnames")):"function"==typeof define&&define.amd?define(["exports","react","antd","@ant-design/icons","@wangdahoo/antd-easy-form","classnames"],t):t((e=e||self).AntdEasyForm={},e.React,e.antd,e.icons,e.AndtEasyForm,e.classNames)}(this,(function(e,t,n,r,a,i){"use strict";var o="default"in t?t.default:t;function c(e,t,n,r,a,i,o){try{var c=e[i](o),u=c.value}catch(e){return void n(e)}c.done?t(u):Promise.resolve(u).then(r,a)}function u(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var i=e.apply(t,n);function o(e){c(i,r,a,o,u,"next",e)}function u(e){c(i,r,a,o,u,"throw",e)}o(void 0)}))}}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,i=void 0;try{for(var o,c=e[Symbol.iterator]();!(r=(o=c.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,i=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw i}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}i=i&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i;var d=t.forwardRef((function(e,a){var i=e.title,c=e.backText,l=f(t.useState(!1),2),s=l[0],p=l[1];return t.useImperativeHandle(a,(function(){return{setVisible:function(e){return p(e)}}})),o.createElement(n.Modal,{title:function(t){return o.createElement("div",null,o.createElement(n.Button,{type:"link",icon:o.createElement(r.ArrowLeftOutlined,null),style:{paddingLeft:0},onClick:u(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.onBack||"function"!=typeof e.onBack){t.next=3;break}return t.next=3,e.onBack();case 3:p(!1);case 4:case"end":return t.stop()}}),t)})))},c||"返回"),e.onDelete?o.createElement(n.Button,{type:"link",icon:o.createElement(r.DeleteOutlined,null),style:{paddingLeft:0},onClick:function(){var t;n.Modal.confirm({centered:!0,title:"提示",content:"确定删除该".concat(e.itemName,"？"),onOk:(t=u(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.onDelete){t.next=3;break}return t.next=3,e.onDelete();case 3:p(!1);case 4:case"end":return t.stop()}}),t)}))),function(){return t.apply(this,arguments)})})}},"删除"):null,o.createElement(n.Divider,{type:"vertical"}),o.createElement("span",{style:{paddingLeft:15}},t))}(i),visible:s,className:"elv-fullscreen-modal",footer:null,closable:!1},e.children)})),g=function(){return{itemName:"",className:"",extraWidth:"auto",extraSearchPlaceholder:"请输入关键字",tableClassName:"",tableColumns:[],tableOperations:["update","delete"],tableOperationsStyle:{},tableWrapper:"card",tableScroll:void 0,tableExpandable:{rowExpandable:function(){return!1}},filters:[],createItemEnabled:!0,batchDeleteEnabled:!1,createItem:function(){return Promise.resolve()},deleteItem:function(){return Promise.resolve()},updateItem:function(){return Promise.resolve()},fetchItems:function(){return Promise.resolve({items:[],total:0,pageNum:1,pageSize:10})},batchDeleteItems:function(){return Promise.resolve()},createFormItems:function(){return[]},updateFormItems:function(){return[]},formLabelWidth:100,detailTitle:"",creationTitle:"",exportEnabled:!1,exportItems:void 0}},y=n.Input.Search;var h=g;e.createListView=function(e){if(!e.itemName)throw new Error("itemName 不能为空");var c=e=p(p({},g()),e||{}),s=c.itemName,m=c.className,h=c.extraWidth,v=c.extraSearchPlaceholder,b=c.extraAddOn,x=c.tableClassName,w=c.tableColumns,E=c.tableOperations,S=c.tableOperationsStyle,O=c.tableWrapper,k=c.tableScroll,R=c.tableExpandable,N=c.filters,C=void 0===N?[]:N,I=c.createItemEnabled,P=c.batchDeleteEnabled,z=c.createItem,j=c.deleteItem,D=c.updateItem,B=c.fetchItems,L=c.batchDeleteItems,T=c.createFormItems,A=c.updateFormItems,F=c.formLabelWidth,W=c.detailTitle,V=c.createDetailComponent,M=c.creationTitle,q=c.createCreationComponent,H=c.exportEnabled,_=c.exportItems;return function(c){var g=f(t.useState([]),2),N=g[0],U=g[1],$=f(t.useState({total:0,pageNum:1,pageSize:10}),2),G=$[0],J=$[1],K=f(t.useState(""),2),Q=K[0],X=K[1],Y=f(t.useState(!1),2),Z=Y[0],ee=Y[1],te=f(t.useState(""),2),ne=te[0],re=te[1],ae=f(t.useState(0),2),ie=ae[0],oe=ae[1],ce=f(t.useState([]),2),ue=ce[0],le=ce[1],se=f(t.useState(null),2),pe=se[0],fe=se[1],me=f(t.useState(C.filter((function(e){return"string"!=typeof e})).reduce((function(e,t){return p(p({},e),{},l({},t.name,p(p({},t),{},{value:t.options[0].value})))}),{})),2),de=me[0],ge=me[1],ye=f(t.useState([]),2),he=ye[0],ve=ye[1],be=t.useRef(null),xe=t.useRef(null);function we(e,t){return e.map((function(e){if("string"==typeof e)return e;var n=(t||de)[e.name].value;return"".concat(e.name,"=").concat(null==n?"":n)}))}var Ee={fixed:!0,columnWidth:40,onChange:function(e,t){ve(t.filter((function(e){return void 0!==e})))}};function Se(){return(Se=u(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=0;case 1:if(!(n<t.length)){e.next=10;break}if("string"==typeof(r=t[n])||!r.getOptions){e.next=7;break}return e.next=6,r.getOptions(c);case 6:r.options=e.sent;case 7:n++,e.next=1;break;case 10:ge(t.filter((function(e){return"string"!=typeof e})).reduce((function(e,t){return p(p({},e),{},l({},t.name,p(p({},t),{},{value:t.options[0].value})))}),{}));case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Oe(e,t,n,r){return ke.apply(this,arguments)}function ke(){return(ke=u(regeneratorRuntime.mark((function e(t,n,r,a){var i,o,u,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i={keyword:t,filters:n,pageNum:r,pageSize:a},e.next=3,B(i,c);case 3:o=e.sent,u=o.items,l=o.total,U(u||[]),J({total:l,pageNum:r,pageSize:a});case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Re(){return Ne.apply(this,arguments)}function Ne(){return(Ne=u(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Oe(Q,we(C),G.pageNum,G.pageSize);case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Ce(){return(Ce=u(regeneratorRuntime.mark((function e(t,n){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=p(p({},de),{},l({},t,p(p({},de[t]),{},{value:n}))),e.next=3,Oe(Q,we(C,r),1,G.pageSize);case 3:ge(r);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Ie(e){if(V)return fe(null),void setTimeout((function(){fe(e),null!==be.current&&be.current.setVisible(!0)}));fe(e),re("编辑".concat(s)),ee(!0),oe(2)}function Pe(e){var t;n.Modal.confirm({centered:!0,title:"提示",content:"确定删除该".concat(s,"？"),onOk:(t=u(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,j(e,c);case 2:return n.message.success("删除".concat(s,"成功")),t.next=5,Oe(Q,we(C),1,G.pageSize);case 5:case"end":return t.stop()}}),t)}))),function(){return t.apply(this,arguments)})})}function ze(){return(ze=u(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(1!==ie){e.next=4;break}return e.next=3,z(t,c);case 3:n.message.success("添加".concat(s,"成功"));case 4:if(2!==ie){e.next=8;break}return e.next=7,D(t,c);case 7:n.message.success("保存".concat(s,"成功"));case 8:return ee(!1),e.next=11,Oe(Q,we(C),1,G.pageSize);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}t.useEffect((function(){c.created&&c.created(),function(e){Se.apply(this,arguments)}(C),Oe(Q,we(C),G.pageNum,G.pageSize),le(Le(w,Be))}),[c]);var je,De,Be=function(e,t){var a=E.map((function(e){return"update"===e?{type:"update",icon:o.createElement(r.EditOutlined,null),text:"编辑",onOperation:Ie}:"delete"===e?{type:"delete",icon:o.createElement(r.DeleteOutlined,null),text:"删除",onOperation:Pe}:p({type:"custom"},e)}));return o.createElement("div",{className:"operations"},a.map((function(e,r){return o.createElement(n.Button,{key:r,type:"link",size:"small",icon:e.icon,danger:"delete"===e.type||void 0,onClick:function(){e.onOperation&&e.onOperation(t)}},e.text)})))},Le=function(e,t){return e.concat(E.length>0?[p({title:"操作",key:"operations",align:"center",width:80*E.length,render:t},S)]:[]).map((function(e){return p(p({},e),{},{ellipsis:!0},e.detailLink?{render:function(e,t){return o.createElement(n.Button,{type:"link",onClick:function(){return Ie(t)},style:{padding:0,height:20}},e)}}:{})}))},Te=o.createElement("div",{className:"list-extra",style:{width:h}},Object.keys(de).map((function(e,t){return o.createElement("span",{key:t},o.createElement("span",{style:{float:"left",lineHeight:"32px"}},de[e].labelText),o.createElement("div",{style:{float:"left"}},o.createElement(n.Select,{style:p(p({},de[e].selectStyle||{}),{},{margin:"0 15px 0 5px"}),value:de[e].value,onChange:function(t){return function(e,t){return Ce.apply(this,arguments)}(e,t)},showSearch:!0,optionFilterProp:"children",filterOption:function(e,t){return(null==t?void 0:t.props.children.toLowerCase().indexOf(e.toLowerCase()))>=0}},de[e].options.map((function(e,t){return o.createElement(n.Select.Option,{key:t,value:e.value},e.text)})))))})),o.createElement(y,{className:"input-search",placeholder:v,value:Q,onChange:function(e){return X(e.target.value)},onSearch:u(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Oe(Q,we(C),1,G.pageSize);case 2:case"end":return e.stop()}}),e)}))),enterButton:o.createElement(n.Button,{type:"primary",icon:o.createElement(r.SearchOutlined,null)},"搜索")}),o.createElement(n.Button,{type:"primary",icon:o.createElement(r.ReloadOutlined,null),style:{marginLeft:10},onClick:Re},"刷新"),I?o.createElement(n.Button,{type:"primary",icon:o.createElement(r.PlusOutlined,null),style:{marginLeft:10},onClick:function(){q?setTimeout((function(){null!==xe.current&&xe.current.setVisible(!0)})):(re("添加".concat(s)),ee(!0),oe(1))}},"添加"):null,P?o.createElement(n.Button,{type:"primary",danger:!0,disabled:0===he.length,icon:o.createElement(r.DeleteOutlined,null),style:{marginLeft:10},onClick:function(){var e;n.Modal.confirm({centered:!0,title:"提示",content:"确定删除选中的".concat(s,"？"),onOk:(e=u(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L(he,c);case 2:return n.message.success("批量删除".concat(s,"成功")),ve([]),e.next=6,Oe(Q,we(C),1,G.pageSize);case 6:case"end":return e.stop()}}),e)}))),function(){return e.apply(this,arguments)})})}},"删除"):null,H&&_?o.createElement(n.Button,{type:"default",icon:o.createElement(r.ExportOutlined,null),style:{marginLeft:10},onClick:function(){var e={keyword:Q,filters:we(C)};_&&_(e,c)}},"导出"):null,b&&b(c,Re)),Ae=o.createElement(n.Table,{className:i("table-items",x),columns:ue,dataSource:N,pagination:{total:G.total,current:G.pageNum,pageSize:G.pageSize,showTotal:function(e,t){var n=f(t,2),r=n[0],a=n[1];return"共 ".concat(e," 条记录，当前 ").concat(r," ~ ").concat(a)},showSizeChanger:!0,onChange:(De=u(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Oe(Q,we(C),t,n||G.pageSize);case 2:case"end":return e.stop()}}),e)}))),function(e,t){return De.apply(this,arguments)}),onShowSizeChange:(je=u(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return J(p(p({},G),{},{pageSize:n})),e.next=3,Oe(Q,we(C),1,n);case 3:case"end":return e.stop()}}),e)}))),function(e,t){return je.apply(this,arguments)})},rowSelection:P?Ee:void 0,scroll:k,expandable:R});return o.createElement("div",{className:i("ant-layout","elv-list-view",m)},o.createElement("div",{className:"ant-layout-content"},"none"!==O?o.createElement(n.Card,{title:!1===e.title?null:e.title||"".concat(s,"列表"),extra:Te},Ae):o.createElement("div",{className:"table-wrapper"},o.createElement("div",{className:"list-extra-wrapper"},o.createElement("div",{className:"flex-1"}),Te),Ae),o.createElement(n.Drawer,{title:ne,width:800,placement:"right",onClose:function(){return ee(!1)},visible:Z},o.createElement("div",{style:{padding:"0 50px"}},Z?o.createElement(a.Form,{labelWidth:F,items:1===ie?T&&T(c):A&&A(pe,c),onSubmit:function(e){return ze.apply(this,arguments)}}):null)),null!==pe?o.createElement(d,{title:W,ref:be,onBack:function(){return Oe(Q,we(C),1,G.pageSize)},itemName:s,onDelete:j?u(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j(pe,c);case 2:return n.message.success("删除".concat(s,"成功")),e.next=5,Oe(Q,we(C),1,G.pageSize);case 5:case"end":return e.stop()}}),e)}))):void 0},V?V(pe,c,(function(){be.current&&(be.current.setVisible(!1),Re())})):null):null,q?o.createElement(d,{title:M,ref:xe,onBack:function(){return Oe(Q,we(C),1,G.pageSize)},itemName:s},q?q(c,(function(){be.current&&(be.current.setVisible(!1),Re())})):null):null))}},e.createListViewOptions=h,Object.defineProperty(e,"__esModule",{value:!0})}));
