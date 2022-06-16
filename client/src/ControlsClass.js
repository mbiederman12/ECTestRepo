import React from 'react';

export default class ControlsClass extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            archiving: true,
        };
    }

    

   /* toggleArchiving = () => {
        if(this.archiving){
            fetch('/start'{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(data)
            })
            .then(function(res){ console.log(res) })
        }
        else{
            fetch('/stop'{
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(function(res){ console.log(res) })
        }

        this.setState(state => ({
            archiving: !state.archiving,
        }));
    }*/

    render() {
        return (
          <div>
            
          </div>
        );
    }
}