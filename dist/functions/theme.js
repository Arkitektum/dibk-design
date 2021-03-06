"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getThemeLinkColor = exports.getThemeTextColor = exports.getThemeAppName = exports.getThemeLogoPadding = exports.getThemeLogo = exports.getThemeNavigationBarTextColor = exports.getThemeNavigationBarBackgroundColor = exports.getThemePaletteTextColor = exports.getThemePaletteBackgroundColor = void 0;

var getThemePaletteBackgroundColor = function getThemePaletteBackgroundColor(theme, color) {
  return theme && theme.colors && theme.colors.palette && theme.colors.palette[color] && theme.colors.palette[color].background ? theme.colors.palette[color].background : null;
};

exports.getThemePaletteBackgroundColor = getThemePaletteBackgroundColor;

var getThemePaletteTextColor = function getThemePaletteTextColor(theme, color) {
  return theme && theme.colors && theme.colors.palette && theme.colors.palette[color] && theme.colors.palette[color].text ? theme.colors.palette[color].text : null;
};

exports.getThemePaletteTextColor = getThemePaletteTextColor;

var getThemeNavigationBarBackgroundColor = function getThemeNavigationBarBackgroundColor(theme) {
  return theme && theme.colors && theme.colors.navigationBar && theme.colors.navigationBar.background ? theme.colors.navigationBar.background : null;
};

exports.getThemeNavigationBarBackgroundColor = getThemeNavigationBarBackgroundColor;

var getThemeNavigationBarTextColor = function getThemeNavigationBarTextColor(theme) {
  return theme && theme.colors && theme.colors.navigationBar && theme.colors.navigationBar.text ? theme.colors.navigationBar.text : null;
};

exports.getThemeNavigationBarTextColor = getThemeNavigationBarTextColor;

var getThemeLogo = function getThemeLogo(theme) {
  return theme && theme.logo ? theme.logo : null;
};

exports.getThemeLogo = getThemeLogo;

var getThemeLogoPadding = function getThemeLogoPadding(theme) {
  return theme && theme.logoPadding ? theme.logoPadding : null;
};

exports.getThemeLogoPadding = getThemeLogoPadding;

var getThemeAppName = function getThemeAppName(theme) {
  return theme && theme.appName ? theme.appName : null;
};

exports.getThemeAppName = getThemeAppName;

var getThemeTextColor = function getThemeTextColor(theme) {
  return theme && theme.colors && theme.colors.text ? theme.colors.text : null;
};

exports.getThemeTextColor = getThemeTextColor;

var getThemeLinkColor = function getThemeLinkColor(theme) {
  return theme && theme.colors && theme.colors.link ? theme.colors.link : null;
};

exports.getThemeLinkColor = getThemeLinkColor;