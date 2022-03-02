import React, { Component } from 'react';
import MainLoader from './components/MainLoader';
import TopBar from './admin/TopBar';
import Body from './admin/Body';
import { MAIN_URL, APP_NAME, loader, tellUser } from './Helper';
import $ from 'jquery';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      navTo: 'books',
    }
  }

  componentDidMount(){
    loader(false);
  }

  navCallback = (navTo) => {
    this.setState({
      navTo
    });
  }


  render(){
    return (
      <div className="App">
        <TopBar navCallback={this.navCallback}/>
        <MainLoader/>
        <div className="MainBody" id="mainBody">
          <Body navCallback={this.navCallback} navTo={this.state.navTo}/>
        </div>
      </div>
    );
  }
}
export default App;
