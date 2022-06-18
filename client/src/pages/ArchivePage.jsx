import React from 'react';
//import axios from "axios";

export default class ArchivePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            archives:[],
        };
    }

    componentDidMount() {
        fetch('/listarchives')
          .then(response => response.json())
          .then(json => this.setState({ archives: json }));
      }


    render() {
       
        return(
            <div>
                <h1>ARCHIVES PAGE</h1>
                {
                this.state.archives.length === 0
                    ? 'Loading users...'
                    : this.state.archives.map(archive => (
                        <div>
                            {archive.id}
                        </div>
    
                    ))
                }
                
            </div>
        )
    };
};
                