
import React, { Component } from 'react'
import * as types from '../../src/actions/actionTypes'
import { page_Loading } from '../../src/actions/pageAction'
import { connect } from 'react-redux'
import { Spin, Alert } from 'antd'

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }


    componentWillMount() {
        this.props.Loading();
    }

    render() {
        const { status } = this.props
        return (
            <div className="page-content">
                <Spin tip={status} >
                </Spin>
            </div>

        )
    }
}

function mapStateToProps(state, ownProps) {
    let _page = state.pageLoad;
    let _status = ""
    if (_page.length > 0) {
        _status = _page[_page.length - 1].status
    }
    return {
        status: _status
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        Loading: () => dispatch(page_Loading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);