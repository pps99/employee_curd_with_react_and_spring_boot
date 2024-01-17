import React, { Component } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const CreateEmployeeWrapper = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    return <CreateEmployeeComponent navigate={navigate}  id={id} />;
};


class CreateEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            emailId: ''
        }
    }

    componentDidMount(){
        if ( this.props.id === "_add" ){
            return
        }else
        {
        EmployeeService.getEmployeeById(this.props.id).then( res => {
            let employee = res.data;
            this.setState({
                firstName: employee.firstName,
                lastName: employee.lastName,
                emailId: employee.emailId
             })
        });
        }
    }

    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }
    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }
    changeEmailIdHandler = (event) => {
        this.setState({emailId: event.target.value});
    }
    saveOrUpdatEmployee = (e) => {
        e.preventDefault();
        let employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId
        }
        if (this.props.id === "_add" ){
            EmployeeService.createEmployee(employee).then(res => {
                this.props.navigate('/employees');
            });
        }else{
            EmployeeService.updateEmployee(this.props.id, employee).then(res => {
                this.props.navigate('/employees');
            });
        }
    }
    getTitle() {
        if(this.props.id === "_add"){
            return <h3 className='card-title text-center mb-4'>Add Employee</h3>
        }else{
            return <h3 className='card-title text-center mb-4'>Update Employee</h3>
        }
    }
    render() {
        return (
            <div className='container mt-3'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-body'>
                            {
                                this.getTitle()
                            }
                            <form>
                                <div className='mb-3'>
                                    <label className='form-label'>First Name:</label>
                                    <input
                                        type='text'
                                        name='firstName'
                                        className='form-control'
                                        placeholder='Enter First Name'
                                        value={this.state.firstName}
                                        onChange={this.changeFirstNameHandler}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Last Name:</label>
                                    <input
                                        type='text'
                                        name='lastName'
                                        className='form-control'
                                        placeholder='Enter Last Name'
                                        value={this.state.lastName}
                                        onChange={this.changeLastNameHandler}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Email Address:</label>
                                    <input
                                        type='email'
                                        name='emailId'
                                        className='form-control'
                                        placeholder='Enter Email Address'
                                        value={this.state.emailId}
                                        onChange={this.changeEmailIdHandler}
                                    />
                                </div>
                                <button className='btn btn-success me-2' onClick={this.saveOrUpdatEmployee}>
                                    Save
                                </button>
                                <Link to='/' className='btn btn-danger'>
                                    Cancel
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default CreateEmployeeWrapper;;