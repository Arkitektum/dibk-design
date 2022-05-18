import React from 'react';
import PropTypes from 'prop-types';
import { getThemeAppName, getThemeLogo, getThemeLogoPadding, getThemeNavigationBarBackgroundColor, getThemeNavigationBarTextColor } from '../functions/theme';
import logo from '../images/dibk-logo-mobile.svg';
import NavigationBarListItem from './NavigationBarListItem';
import style from './NavigationBar.module.scss';


class NavigationBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
  }
  handleClickOutside () {
    this.setState({
      active: false
    })
  }
  toggleList () {
    this.setState(prevState => ({
      active: !prevState.active
    }))
  }
  getNavigationBarThemeStyle(theme){
    return {
      backgroundColor: getThemeNavigationBarBackgroundColor(theme),
      color: getThemeNavigationBarTextColor(theme)
    }
  }
  getListItemThemeStyle(theme){
    return {
      color: getThemeNavigationBarTextColor(theme),
      borderBottomColor: getThemeNavigationBarTextColor(theme)
    }
  }
  getLogoThemeStyle(theme){
    return {
      padding: getThemeLogoPadding(theme)
    }
  }
  renderPrimaryList (items = this.props.primaryListItems, iteration = 0) {
    const listItemThemeStyle = this.getListItemThemeStyle(this.props.theme);
    let listItems = items.map((listItem, i) => {
      let key = iteration + '-' + i
      if (listItem.listItems !== undefined) {
        return (
          <li key={key}><span style={listItemThemeStyle}>{ listItem.name }</span>{ this.renderPrimaryList(listItem.listItems, iteration + 1) }</li>
        )
      } else {
        return <NavigationBarListItem listItem={listItem} key={key} theme={this.props.theme} />
      }
    })
    return <ul className={style.primaryList}>{listItems}</ul>
  }
  renderSecondaryList () {
    let listItems = this.props.secondaryListItems.map((listItem, i) => {
      return <NavigationBarListItem listItem={listItem} key={i} theme={this.props.theme} />
    })
    return <ul className={style.secondaryList}>{listItems}</ul>
  }
  renderLogo(logoLink){
    const themeLogo = getThemeLogo(this.props.theme);
    const themeAppName = getThemeAppName(this.props.theme);

    const logoElement = themeLogo && themeAppName
      ? <img alt={`${themeAppName} logo`} src={themeLogo} style={this.getLogoThemeStyle(this.props.theme)} />
      : <img alt='DIBK logo' src={logo} />;

    const logoLinkProps = {
      target: this.props.openLogoLinkInNewTab ? '_blank': null,
      rel: this.props.openLogoLinkInNewTab ? 'noopener noreferrer' : null
    }
    return logoLink && logoLink.length
      ? (<a {...logoLinkProps} href={logoLink}>{logoElement}</a>)
      : logoElement
  }
  render () {
    const navigationBarThemeStyle = this.getNavigationBarThemeStyle(this.props.theme);
    const hamburgerIconLineStyle = {
      backgroundColor: getThemeNavigationBarTextColor(this.props.theme)
    };
    return (
      <header>
        <div className={style.isPresent}>
          <div className={style.navigationBar} style={navigationBarThemeStyle}>
            <div className={style.logoContainer}>
              {this.renderLogo(this.props.logoLink)}
            </div>
            {
              this.props.children
                ? <div className={style.childElements}>{this.props.children}</div>
                : ''
            }
            {
              (this.props.primaryListItems && this.props.primaryListItems.length) || (this.props.secondaryListItems && this.props.secondaryListItems.length)
                ? (
                  <button type="button" className={`${style.menuToggle} ${this.state.active ? style.active : ''}`} onClick={() => this.toggleList()}>
                    <span className={style.hamburgerIcon}>
                      <span className={style.line} style={hamburgerIconLineStyle}></span>
                      <span className={style.line} style={hamburgerIconLineStyle}></span>
                      <span className={style.line} style={hamburgerIconLineStyle}></span>
                    </span>
                  </button>
                )
                : ''
            }
          </div>
          <div className={`${style.dropdownContainer} ${this.state.active ? style.active : ''}`}>
            <div className={style.dropdown} style={navigationBarThemeStyle}>{this.renderPrimaryList()}{this.renderSecondaryList()}{this.props.children}</div>
          </div>
          <div className={`${style.dropdownOverlay} ${this.state.active ? style.active : ''}`} />
        </div>
      </header>
    )
  }
}

NavigationBar.propTypes = {
  /** Main links in navigation bar */
  primaryListItems: PropTypes.array,
  /** Secondary links in navigation bar */
  secondaryListItems: PropTypes.array,
  /** Link for logo */
  logoLink: PropTypes.string,
  /** Opens logo link in a new tab on click */
  openLogoLinkInNewTab: PropTypes.bool,
  /** Theme for navigation bar */
  theme: PropTypes.object
}

NavigationBar.defaultProps = {
  primaryListItems: [],
  secondaryListItems: [],
  logoLink: null
}

export default NavigationBar
