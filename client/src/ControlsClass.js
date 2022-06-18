import React from 'react';

export default class ControlsClass extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {

        };
    }


    render() {
        return (
          <div>
              <h4>Archiving Features</h4>
            
                
                <form action="http://localhost:3001/start" method ="POST">
                    <input type="submit" value="Start Archiving"></input>
                </form>
                <form method="post" action="http://localhost:3001/stop">
                    <input type="submit" value="Stop Archiving"></input>
                </form>
                <form action="http://localhost:3000/listarchives" method = 'get'>
                    <input type="submit" value="View Past Archives"></input>
                </form>
                

          </div>
        );
    }
}