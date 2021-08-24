import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Exercise = props => (
    <tr>
        <td>{ props.exercises.username }</td>
        <td>{ props.exercises.description }</td>
        <td>{ props.exercises.duration }</td>
        <td>{ props.exercises.date.substring(0, 10) }</td>
        <td>
            <Link to={ "/edit/" + props.exercises._id }>Edit</Link> | <a href="#" onClick={ () => { props.deleteExercise(props.exercises._id) }}>Delete</a>
        </td>
    </tr>
)

export default class CreateExercise extends Component {
    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = { exercises: [] };
        console.log(this.state);
    }

    //call before everything else loaded
    componentDidMount () {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({ exercises: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExercise (id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(response => console.log(response.data));
        
        this.setState({
                exercises: this.state.exercises.filter(el => el.id !== id)
            })
    }

    exercisesList () {
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercises={ currentExercise } deleteExercise={ this.deleteExercise } key={ currentExercise._id } />;
        })
    }

    render () {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exercisesList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
