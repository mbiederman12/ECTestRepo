import React from 'react';

export default class ControlsClass extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {

        };
    };

    activateEC = () => {
        //e.preventDefault();
        alert('You clicked submit.');
        fetch('http://localhost:3001/fake', { method: 'GET' })
        .then(data => data.json()) // Parsing the data into a JavaScript object
        .then(json => alert(JSON.stringify(json))) // Displaying the stringified data in an alert popup
    };
    deactivateEC = () => {
        //e.preventDefault();
        alert('You clicked submit.');
    };


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
                <form action="http://localhost:3000/listarchives" method = 'get'>
                    <input type="submit" value="View Past Archives"></input>
                </form>
                <h3>Experience Composer</h3>
                <form action="http://localhost:3001/startEC" method = 'get'>
                    <input type="submit" value="Start EC"></input>
                </form>
                <form action="http://localhost:3001/stopEC" method = 'get'>
                    <input type="submit" value="Stop EC"></input>
                </form>
          </div>
        );
    }
}