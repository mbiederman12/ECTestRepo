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
              <h3>Archiving Features</h3>
                <form action="http://localhost:3001/start" method ="POST">
                    <input type="submit" value="Start Archiving Session"></input>
                </form>
                <p></p>
                <form action="http://localhost:3001/stop" method="POST">
                    <input type="submit" value="Stop Archiving Session"></input>
                </form>
                <p></p>
                <form action="http://localhost:3000/listarchives" method = 'GET'>
                    <input type="submit" value="View Past Archives"></input>
                </form>

                <h3>Experience Composer</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Start EC: 
                    <input type="text" value={this.state.value} placeholder = "Enter URL Here:" id='ecidURL' name="ecidURL" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <p></p>
                <form action="http://localhost:3001/stopEC" method = 'GET'>
                    <input type="submit" value="Stop EC"></input>
                </form>
                <p></p>
                <form action="http://localhost:3001/startArchivingEC" method ="POST">
                    <input type="submit" value="Start Archiving EC"></input>
                </form>
                <p></p>
                <form action="http://localhost:3001/stopArchivingEC" method="POST">
                    <input type="submit" value="Stop Archiving EC"></input>
                </form>
          </div>
        );
    }
}