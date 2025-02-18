"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _NavigationBarListItem = _interopRequireDefault(require("./NavigationBarListItem"));
var _theme = require("../functions/theme");
var _helpers = require("../functions/helpers");
var _dibkLogoMobile = _interopRequireDefault(require("../assets/svg/dibk-logo-mobile.svg?url"));
var _dibkLogo = _interopRequireDefault(require("../assets/svg/dibk-logo.svg?url"));
var _NavigationBarModule = _interopRequireDefault(require("./NavigationBar.module.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const NavigationBar = props => {
  var _props$primaryListIte, _props$secondaryListI, _props$mainContentId;
  const [active, setActive] = (0, _react.useState)(false);
  const toggleList = () => {
    setActive(!active);
  };
  const getLogoThemeStyle = theme => {
    return {
      padding: (0, _theme.getThemeLogoPadding)(theme)
    };
  };
  const renderPrimaryList = function () {
    let items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : props.primaryListItems;
    let iteration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    let listItems = items.map((listItem, i) => {
      let key = iteration + "-" + i;
      if (listItem.listItems !== undefined) {
        return _react.default.createElement("li", {
          key: key
        }, _react.default.createElement("span", null, listItem.name), renderPrimaryList(listItem.listItems, iteration + 1));
      } else {
        return _react.default.createElement(_NavigationBarListItem.default, {
          listItem: listItem,
          key: key,
          theme: props.theme
        });
      }
    });
    return !!(listItems !== null && listItems !== void 0 && listItems.length) && _react.default.createElement("ul", {
      className: _NavigationBarModule.default.primaryList
    }, listItems);
  };
  const renderSecondaryList = () => {
    let listItems = props.secondaryListItems.map((listItem, i) => {
      return _react.default.createElement(_NavigationBarListItem.default, {
        listItem: listItem,
        key: i,
        theme: props.theme
      });
    });
    return !!(listItems !== null && listItems !== void 0 && listItems.length) && _react.default.createElement("ul", {
      className: _NavigationBarModule.default.secondaryList
    }, listItems);
  };
  const renderLogo = (logoLink, logoLinkTitle) => {
    const themeLogo = (0, _theme.getThemeLogo)(props.theme);
    const themeAppName = (0, _theme.getThemeAppName)(props.theme);
    const getLogoAltText = () => {
      if (logoLink && logoLinkTitle) {
        return "";
      } else if (themeLogo && themeAppName) {
        return "".concat(themeAppName, " logo");
      } else {
        return "DIBK logo";
      }
    };
    const renderLogoElement = () => {
      const altText = getLogoAltText();
      return themeLogo ? _react.default.createElement("img", {
        alt: altText,
        src: themeLogo,
        style: getLogoThemeStyle(props.theme)
      }) : _react.default.createElement("img", {
        alt: altText,
        src: props.compact ? _dibkLogoMobile.default : _dibkLogo.default
      });
    };
    const logoLinkProps = {
      target: props.openLogoLinkInNewTab ? "_blank" : null,
      rel: props.openLogoLinkInNewTab ? "noopener noreferrer" : null
    };
    return logoLink && logoLink.length ? _react.default.createElement("a", _extends({}, logoLinkProps, {
      href: logoLink,
      title: logoLinkTitle
    }), renderLogoElement()) : renderLogoElement();
  };
  const hasListItems = !!((_props$primaryListIte = props.primaryListItems) !== null && _props$primaryListIte !== void 0 && _props$primaryListIte.length) || !!((_props$secondaryListI = props.secondaryListItems) !== null && _props$secondaryListI !== void 0 && _props$secondaryListI.length);
  return _react.default.createElement("div", {
    className: (0, _helpers.classNameArrayToClassNameString)([props.compact && _NavigationBarModule.default.compact, _NavigationBarModule.default.navigationBarContainer])
  }, ((_props$mainContentId = props.mainContentId) === null || _props$mainContentId === void 0 ? void 0 : _props$mainContentId.length) && _react.default.createElement("a", {
    id: "main-content-link",
    href: "#".concat(props.mainContentId),
    className: _NavigationBarModule.default.mainContentLink
  }, _react.default.createElement("span", {
    id: "main-content-link-text"
  }, "Hopp til hovedinnhold")), _react.default.createElement("div", {
    className: (0, _helpers.classNameArrayToClassNameString)([_NavigationBarModule.default.navigationBar, props.preventChildElementStacking && _NavigationBarModule.default.preventStacking])
  }, _react.default.createElement("div", {
    className: _NavigationBarModule.default.logoContainer
  }, renderLogo(props.logoLink, props.logoLinkTitle)), !!props.children && _react.default.createElement("div", {
    className: _NavigationBarModule.default.childElements
  }, props.children), hasListItems && _react.default.createElement("button", {
    type: "button",
    className: "".concat(_NavigationBarModule.default.menuToggle, " ").concat(active ? _NavigationBarModule.default.active : ""),
    onClick: () => toggleList(),
    "aria-expanded": active ? "true" : "false",
    "aria-controls": "main-menu-dropdown"
  }, !props.compact && "Meny", _react.default.createElement("span", {
    className: _NavigationBarModule.default.hamburgerIcon
  }, _react.default.createElement("span", {
    className: _NavigationBarModule.default.line
  }), _react.default.createElement("span", {
    className: _NavigationBarModule.default.line
  }), _react.default.createElement("span", {
    className: _NavigationBarModule.default.line
  })))), hasListItems && _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", {
    className: (0, _helpers.classNameArrayToClassNameString)([_NavigationBarModule.default.dropdownContainer, active && _NavigationBarModule.default.active])
  }, _react.default.createElement("div", {
    id: "main-menu-dropdown",
    className: _NavigationBarModule.default.dropdown
  }, renderPrimaryList(), renderSecondaryList()))));
};
NavigationBar.propTypes = {
  primaryListItems: _propTypes.default.array,
  secondaryListItems: _propTypes.default.array,
  logoLink: _propTypes.default.string,
  logoLinkTitle: _propTypes.default.string,
  openLogoLinkInNewTab: _propTypes.default.bool,
  theme: _propTypes.default.object,
  preventChildElementStacking: _propTypes.default.bool
};
NavigationBar.defaultProps = {
  primaryListItems: [],
  secondaryListItems: [],
  logoLink: null,
  preventChildElementStacking: false
};
var _default = exports.default = NavigationBar;