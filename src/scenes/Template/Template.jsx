import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import injectSaga from '../../configs/redux/injectSaga';
import injectReducer from '../../configs/redux/injectReducer';
import tempReducer from '../../redux/reducers/reducer';
import tempSaga from './saga';
import { changeLocale } from '../../configs/languageProvider/actions';

class Temp extends Component {
  componentDidMount() {
    console.log('store', this.context.store);
  }

  render() {
    return <Link to="/test"><div>hi</div></Link>;
  }
}

Temp.propTypes = {};

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: () => {
      dispatch(changeLocale('de'));
    },
  };
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'temp', reducer: tempReducer });
const withSaga = injectSaga({ key: 'temp', saga: tempSaga });

export default compose(
  withSaga,
  withReducer,
  withConnect,
  injectIntl,
)(Temp);
