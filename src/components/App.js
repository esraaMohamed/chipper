import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleInitialData} from "../actions/shared";
import Dashboard from './dashboard'
import LoadingBarContainer from "react-redux-loading";
import NewTweet from "./newTweet";
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div>
        <LoadingBarContainer/>
        {this.props.loading === true ? null :
            <NewTweet/>
        }
      </div>
    )
  }
}

const mapStateToProps = ({authedUser}) => {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)