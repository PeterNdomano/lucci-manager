import React, { Component } from 'react';
import MainLoader from './components/MainLoader';
import TopBar from './student/TopBar';
import Body from './student/Body';
import { MAIN_URL, APP_NAME, loader, tellUser } from './Helper';
import $ from 'jquery';

class Student extends Component{

  constructor(props){
    super(props);
    this.state = {
      navTo: 'books',
    }
  }

  auth = () => {
    loader(true);
    $.post(MAIN_URL+'auth_student.php', {}, (data, status) => {
      //console.log(data);
      if(status === 'success'){
        let response = JSON.parse(data);
        if(response.status === 1){
          loader(false);
        }
        else{
          tellUser('Student login required');
          window.location.href = '/komu/';
        }
      }
      else{
        tellUser('Nework error');
        window.location.href = '/komu/';
      }
    })
  }

  componentDidMount(){
    this.auth();
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
export default Student;
