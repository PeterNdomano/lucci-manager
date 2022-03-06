import React, { Component } from 'react';
import MainLoader from './components/MainLoader';
import Footer from './components/Footer';
import { MAIN_URL, APP_NAME, loader, tellUser } from './Helper';
import $ from 'jquery';
import logo from './logo.png';

class App extends Component{

  showAdminLogin(){
    $('#adminModal').modal().toggle();
  }

  showStudentLogin(){
    $('#studentModal').modal().toggle();
  }

  componentDidMount(){
    loader(false);
  }

  studentLogin = () => {
    let admissionNo = $('#admissionNo').val();
    let password = $('#password').val();

    if(admissionNo.trim().length > 0){
      if(password.trim().length > 0){
        loader(true);
        $.post(MAIN_URL+'student_login.php', { admissionNo, password }, (data, status) => {
          loader(false);
          if(status === 'success'){
            let response = JSON.parse(data);
            if(response.status === 1){
              $('#adminCloser2').click();
              window.location.href = '#/student';
            }
            else{
              tellUser(response.msg);
            }
          }
          else{
            tellUser('Unkown network error');
          }
        });
      }
      else{
        tellUser('Write valid password');
      }
    }
    else{
      tellUser('Write valid admissionNo');
    }
  }


  adminLogin = () => {
    let username = $('#adminUsername').val();
    let password = $('#adminPassword').val();

    if(username.trim().length > 0){
      if(password.trim().length > 0){
        loader(true);
        $.post(MAIN_URL+'admin_login.php', { username, password }, (data, status) => {
          loader(false);
          if(status === 'success'){
            let response = JSON.parse(data);
            if(response.status === 1){
              $('#adminCloser').click();
              window.location.href = '#/admin';
            }
            else{
              tellUser(response.msg);
            }
          }
          else{
            tellUser('Unkown network error');
          }
        });
      }
      else{
        tellUser('Write valid password');
      }
    }
    else{
      tellUser('Write valid username');
    }
  }

  getView = () => {
    return (
      <div>
        {/* Admin login modal */}
        <div className="modal fade" id="adminModal" tabIndex="-1" role="dialog" aria-labelledby="adminModal" aria-hidden="true">
          <div className="modal-dialog modal-md modal-dialog-centered" role="document">
            <div className="modal-content">

              <div className="modal-body" style={{color: "var(--darkColor)"}}>
                <h4 style={{ fontWeight:"300" }}><b>Staff Login</b></h4><hr/>

                <div className="form-group">
                  <label>Username</label>
                  <input id="adminUsername" className="form-control" type="text"/>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input id="adminPassword" className="form-control" type="password"/>
                </div>
              </div>
              <div className="modal-footer">
                <button id="adminCloser" type="button" className="btn btn-sm" data-dismiss="modal" style={{ width:"100px", color: "var(--dark)" }}><b>Cancel</b></button>
                <button onClick={() => this.adminLogin()} type="button" className="btn btn-sm btn-dark" style={{ width:"100px" }}>Login</button>
              </div>
            </div>
          </div>
        </div>
        {/* Admin login modal ends */}

        {/* Student Login */}
        <div className="modal fade" id="studentModal" tabIndex="-1" role="dialog" aria-labelledby="adminModal" aria-hidden="true">
          <div className="modal-dialog modal-md modal-dialog-centered" role="document">
            <div className="modal-content">

              <div className="modal-body" style={{color: "var(--darkColor)"}}>
                <h4 style={{ fontWeight:"300" }}><b>Student Login</b></h4><hr/>

                <div className="form-group">
                  <label>Admission Number</label>
                  <input id="admissionNo" className="form-control" type="text"/>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input id="password" className="form-control" type="password"/>
                </div>
              </div>
              <div className="modal-footer">
                <button id="adminCloser2" type="button" className="btn btn-sm" data-dismiss="modal" style={{ width:"100px", color: "var(--dark)" }}><b>Cancel</b></button>
                <button onClick={() => this.studentLogin()} type="button" className="btn btn-sm btn-dark" style={{ width:"100px" }}>Login</button>
              </div>
            </div>
          </div>
        </div>
        {/* Student login modal ends */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center bg-dark text-light">
              <h1 style={{ paddingTop: "100px", paddingBottom:"100px" }}>KOMU COLLEGE <br/> e-Library</h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center bg-light text-light">
              <img src={logo} width="100%"/>
            </div>
            <div className="col-md-6" style={{ paddingTop:"60px", }}>
              <h3 style={{ fontWeight: "300" }}>Continue As</h3><hr/>
              <div style={{ width: "100%", paddingTop:"60px", paddingBottom:"60px" }} className="text-right">
                <button onClick={() => this.showAdminLogin()} className="btn" style={{ width:"120px", borderRadius:"20px", border:"2px solid var(--dark)" }}>
                  Staff
                </button>
                &nbsp;
                <button onClick={() => this.showStudentLogin()} className="btn" style={{ width:"120px", borderRadius:"20px", border:"2px solid var(--dark)" }}>
                  Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render(){
    let view = this.getView();
    return (
      <div className="App">
        <MainLoader/>
        {view}
        <Footer/>
      </div>
    );
  }
}
export default App;
