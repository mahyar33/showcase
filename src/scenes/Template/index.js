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


class Temp extends Component {
    componentDidMount() {
        console.log('store', this.context.store)
    }

    render() {

        return <div>hi</div>

    }
}

Temp.propTypes = {};

export function mapDispatchToProps(dispatch) {
    return {
        onSubmitForm: evt => {
            dispatch(tempAction(evt));
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



