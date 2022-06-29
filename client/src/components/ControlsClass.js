import React from 'react';

export default class ControlsClass extends React.Component {

    constructor(props) {
        super(props);
        this.state = { ecidURL: '', sessionId:'' };
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
     
    handleSubmit = (event) => {
        alert('EC URL Submitted');
    
        fetch('http://localhost:3001/store-data', {
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(this.state)
            })
            .then((result) => result.json())
            .then((info) => {console.log(info); })
        
        event.preventDefault();
    }
    
    render() {
        return (
          <div>
              <h3>Session Features</h3>
              <form action="http://localhost:3001/newsession" method = 'POST'>
                    <input type="submit" value="Create New Session"></input>
              </form>
              <p></p>
              <form onSubmit={this.handleSubmit}>
                    <label>
                    Enter Existing Session: 
                    <input type="text" value={this.state.value} id='sessionId' name="sessionId" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
              <h3>Archiving Features</h3>
                <form action="http://localhost:3001/start" method ="POST">
                    <input type="submit" value="Start Archiving"></input>
                </form>
                <form action="http://localhost:3001/stop" method="POST">
                    <input type="submit" value="Stop Archiving"></input>
                </form>
                <form action="http://localhost:3000/listarchives" method = 'GET'>
                    <input type="submit" value="View Past Archives"></input>
                </form>


                <h3>Experience Composer</h3>
                <h4>Create New EC</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    EC URL:
                    <input type="text" value={this.state.value} id='ecidURL' name="ecidURL" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <p></p>
                <form action="http://localhost:3001/stopEC" method = 'GET'>
                    <input type="submit" value="Stop EC"></input>
                </form>
                <h4>EC Archiving</h4>
                <form action="http://localhost:3000/newsessionpage" method = 'GET'>
                    <label>Create New Session</label>
                    <input type="submit" value="Create New Session"></input>
                </form>
                
          </div>
        );
    }
}