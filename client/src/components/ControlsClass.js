import React from 'react';

export default class ControlsClass extends React.Component {

    constructor(props) {
        super(props);
        this.state = { ecidURL: '' };
    };

    handleChange = (event) => {
        this.setState({[event.target.ecidURL]: event.target.value});
    }
     
    handleSubmit = (event) => {
    alert('EC URL Submitted');
    
    fetch('http://localhost:3001/store-data', {
        method: 'POST',
        body: JSON.stringify(this.state)
        }).then(function(response) {
        console.log(response)
        return response.json();
        });
    
    event.preventDefault();
    }
    
    render() {
        return (
          <div>
              <h3>Archiving Features</h3>
                <form action="http://localhost:3001/start" method ="POST">
                    <input type="submit" value="Start Archiving"></input>
                </form>
                <form method="post" action="http://localhost:3001/stop">
                    <input type="submit" value="Stop Archiving"></input>
                </form>
                <form action="http://localhost:3000/listarchives" method = 'GET'>
                    <input type="submit" value="View Past Archives"></input>
                </form>


                <h3>Experience Composer</h3>
                <form action="http://localhost:3001/startEC" method = 'GET'>
                    <input type="submit" value="Start EC"></input>
                </form>
                <form action="http://localhost:3001/stopEC" method = 'GET'>
                    <input type="submit" value="Stop EC"></input>
                </form>
                <p></p>

                <form onSubmit={this.handleSubmit}>
                    <label>
                    EC URL:
                    <input type="text" value={this.state.value} name="ecidURL" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                
          </div>
        );
    }
}