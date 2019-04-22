import React, {Component} from 'react'
import PropTypes from 'prop-types';
import injectSaga from "../../configs/redux/injectSaga";
import injectReducer from "../../configs/redux/injectReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import {createStructuredSelector} from "reselect";
import tempReducer from "./reducer";
import tempSaga from "./saga";
import {tempAction} from "./actions";
import {injectIntl} from "react-intl";


class Test extends Component {
    componentDidMount() {
        console.log('store', this.context.store)
    }

    render() {

        return <div>ok</div>

    }
}

Test.propTypes = {};

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

const withReducer = injectReducer({key: 'test', reducer: tempReducer});
const withSaga = injectSaga({key: 'test', saga: tempSaga});

export default compose(
    withSaga,
    withConnect,
    injectIntl,
)(Test);



