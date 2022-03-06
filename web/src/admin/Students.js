import React, { Component } from 'react';
import { MdPerson, MdPeople } from 'react-icons/md';
import { ImBooks } from 'react-icons/im';
import { CgPlayListAdd } from 'react-icons/cg';
import OneStudent from './OneStudent';
import { tellUser, MAIN_URL, loader } from '../Helper';
import $ from 'jquery';

export default class Students extends Component{
  constructor(props){
    super(props);
    this.state = {
      students: [],
    };
    this.students = <div></div>;

  }

  componentDidMount(){
    this.getAllStudents();
  }

  getAllStudents = () => {
    loader(true);
    $.post(MAIN_URL+'get_all_students.php', {}, (data, status) => {
      loader(false);
      if(status === 'success'){
        let response = JSON.parse(data);
        if(response.status === 1){
          this.students = response.students.map((item) => {
            return (
              <OneStudent getAllStudents={this.getAllStudents} key={"st_"+item.id} data={item}/>
            );
          });

          this.setState({
            students: response.students,
          })
        }
        else{
          tellUser(response.msg);
        }
      }
      else{
        tellUser('Unkown error, check your connection');
      }
    });
  }



  addStudent = () => {
    let firstName = $('#_firstName').val();
    let lastName = $('#_lastName').val();
    let admissionNo = $('#_admissionNo').val();

    if(firstName.trim().length > 0){
      if(lastName.trim().length > 0){
        if(admissionNo.trim().length > 0){
          loader(true);
          $.post(MAIN_URL+"add_student.php", { firstName, lastName, admissionNo}, (data, status) => {
            loader(false);
            if(status === 'success'){
              let response = JSON.parse(data);
              if(response.status === 1){
                tellUser('Student was added');
                $('#adderCloser').click();
                this.getAllStudents();
                $('#_firstName').val('');
                $('#_lastName').val('');
                $('#_admissionNo').val('');
              }
              else{
                tellUser(response.msg);
              }
            }
            else{
              tellUser('Network erro, check your connection');
            }
          });
        }
        else{
          tellUser("Invalid admission number")
        }
      }
      else{
        tellUser("Invalid last name")
      }
    }
    else{
      tellUser("Invalid first name")
    }
  }

  render(){
    return (
      <div className="Books">
        {/* addstudentModal */}
        <div className="modal fade" id="addStudentModal" tabIndex="-1" role="dialog" aria-labelledby="addStudentModal" aria-hidden="true">
          <div className="modal-dialog modal-md modal-dialog-centered" role="document">
            <div className="modal-content">

              <div className="modal-body" style={{color: "var(--darkColor)"}}>
                <h4 style={{ fontWeight:"300" }}><b>Record New Student</b></h4><hr/>

                <div className="form-group">
                  <label>Admission Number</label>
                  <input id="_admissionNo" className="form-control" type="text"/>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label>First Name</label>
                    <input id="_firstName" className="form-control" type="text"/>
                  </div>
                  <div className="col-6">
                    <label>Last Name</label>
                    <input id="_lastName" className="form-control" type="text"/>
                  </div>
                </div>

              </div>
              <div className="modal-footer">
                <button id="adderCloser" type="button" className="btn btn-sm" data-dismiss="modal" style={{ width:"100px", color: "var(--dark)" }}><b>Cancel</b></button>
                <button onClick={() => this.addStudent()} type="button" className="btn btn-sm btn-dark" style={{ width:"100px" }}>Save</button>
              </div>
            </div>
          </div>
        </div>
        {/* addbookModal ends */}
        <h3 className="sectionTitle">Students</h3><hr/>
        <div className="row">
          <div className="col-md-6 col-sm-12 p-2">
            <button className="btn btn-success btn-block" style={{ height:"200px", overflow:"hidden"}}>
              <div className="row">
                <div className="col-6">
                  <MdPeople style={{ width:"150px", height:"150px"}}/>
                </div>
                <div className="col-6">
                  <h1 style={{ lineHeight:"150px", fontSize:"50px" }}>{this.state.students.length}</h1>
                </div>
              </div>
            </button>
          </div>

          <div className="col-md-6 col-sm-12 p-2">
            <button data-toggle="modal" data-target="#addStudentModal" className="btn btn-info btn-block" style={{ height:"200px", overflow:"hidden"}}>
              <div className="row">
                <div className="col-6">
                  <CgPlayListAdd style={{ width:"150px", height:"150px"}}/>
                </div>
                <div className="col-6">
                  <h4 style={{ lineHeight:"150px" }}>Record Student</h4>
                </div>
              </div>
            </button>
          </div>

          <div className="col-md-12 col-sm-12 p-2" style={{marginTop:"40px"}}>
            <div className="d-flex flex-row" style={{ width: "100%"}}>
              <div className="flex-grow-1 align-self-center">
                <h5><b>All Students</b></h5>
              </div>
              <div className="align-self-center">
                <input placeholder="Search students here...." style={{ width: "250px"}} className="form-control"/>
              </div>
            </div>

            {/* list of students*/}
            {this.students}
          </div>
        </div>
      </div>
    );
  }
}
