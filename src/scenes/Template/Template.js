import React, {Component} from 'react'
import PropTypes from 'prop-types';
import injectSaga from "../../config/Redux/injectSaga";
import injectReducer from "../../config/Redux/injectReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import {createStructuredSelector} from "reselect";
import tempReducer from "./reducer";
import tempSaga from "./saga";
import {tempAction} from "./actions";
import {injectIntl} from "react-intl";
import {Link} from "react-router-dom";
import {changeLocale} from "../../config/LanguageProvider/actions";


class Temp extends Component {
    componentDidMount() {
        console.log('store', this.context.store)
        this.props.onSubmitForm()
    }

    render() {

        return <Link to="/test"><div>hi</div></Link>

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

const withReducer = injectReducer({key: 'temp', reducer: tempReducer});
const withSaga = injectSaga({key: 'temp', saga: tempSaga});

export default compose(
    withSaga,
    withConnect,
    injectIntl,
)(Temp);



