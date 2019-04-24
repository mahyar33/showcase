/*
  This component connects the redux state language locale to the
  IntlProvider component and i18n messages (loaded from `app/translations`).
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';

class LanguageProvider extends React.PureComponent {
  render() {
    const { locale, messages, children } = this.props;
    return (
      <IntlProvider
        locale={locale}
        key={locale}
        messages={messages[locale]}
      >
        {React.Children.only(children)}
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string.isRequired,
  messages: PropTypes.objectOf(PropTypes.object).isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale,
}));

export default connect(mapStateToProps)(LanguageProvider);
