import React from 'react';

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
                <h1>Past Archives: </h1>
                <p></p>
                {
                this.state.archives.length === 0
                    ? 'Loading users...'
                    : 
                    this.state.archives.map(archive => (
                        <table class="table table-striped">
                            
                            <tbody>
                                <tr>
                                    <td><b>Name: </b>{archive.name || "Untitled"}</td>
                                    <td><b>Time: </b>{archive.duration} seconds</td>
                                    <td><b>Status: </b>{archive.status}</td>
                                    <td><b>Archive ID: </b> {archive.id}</td>
                                    {archive.status === 'available'?
                                    <td><b>URL: </b><a href={archive.url}>Archive Link</a></td>
                                    :
                                    <td><b>URL: </b>Link Not Available</td>
                                    }
                                    

                                </tr>
                            </tbody>
                        </table>
    
                    ))
                }
                
            </div>
        )
    };
};
                