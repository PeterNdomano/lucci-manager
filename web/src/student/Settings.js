import React, { Component } from 'react';
import { tellUser, MAIN_URL, loader } from '../Helper';
import $ from 'jquery';

export default class Books extends Component{

  changePwd = () => {
    let password = $('#password').val();
    let confirm = $('#confirm').val();
    if(password.trim().length >= 6){
      if(password === confirm){
        loader(true);
        $.post(MAIN_URL+"change_password.php", { password }, (data, status) => {
          loader(false);
          //console.log(data);
          if(status === 'success'){
            let response = JSON.parse(data);
            if(response.status === 1){
              tellUser('Changes were saved');
              $('#password').val('');
              $('#confirm').val('');
            }
            else{
              tellUser(response.msg);
            }
          }
          else{
            tellUser('Unknown network error');
          }
        })
      }
      else{
        tellUser('Please confirm your password correctly');
      }
    }
    else{
      tellUser('Password must have atleast 6 characters');
    }
  }

  render(){
    return (
      <div className="Books">

        <h3 className="sectionTitle">Update Password</h3><hr/>
        <div className="row">
          <div className="col-md-6 col-sm-12 p-2">
            <div className="form-group">
              <label>New Password</label>
              <input type="password" id="password" className="form-control"/>
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input type="password" id="confirm" className="form-control"/>
            </div>
            <div className="form-group">
              <button onClick={() => { this.changePwd() }} className="btn btn-dark">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
