import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import EmployeeService from '../services/EmployeeService';

const ListEmployeeWrapper = () => {
    const navigate = useNavigate();

    return <ListEmployeeComponent navigate={navigate} />;
};

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };
    }
    editEmployee(id) {
        this.props.navigate(`/add-employee/${id}`);
    }
    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id )});
        });
    }
    viewEmployee(id) {
        this.props.navigate(`/view-employee/${id}`);
    }
    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }



    render() {
        return (
            <div>
                <h2 className='text-center'>Employees List</h2>
                <div className='row'>
                    <Link style={{width: "20%", marginBottom: "10px"}} to='/add-employee/_add' className='btn btn-primary'>
                        Add Employee
                    </Link>
                </div>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Employee First Name</th>
                                <th>Employee Last Name</th>
                                <th>Employee Email Id</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.emailId}</td>
                                    <td>
                                        <button onClick= { () => this.editEmployee(employee.id)} className='btn btn-info'>Update </button>
                                        <button style={{marginLeft: "10px"}} onClick= { () => this.deleteEmployee(employee.id)} className='btn btn-danger'>Delete </button>
                                        <button style={{marginLeft: "10px"}} onClick= { () => this.viewEmployee(employee.id)} className='btn btn-info'>View </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeWrapper;
