import React from "react";
import './style/Backstage.css'
import Stream from './Stream';



function BackstagePage(){
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        console.error('Failed to get session creddentials', err);
        alert('Failed to get opentok sessionId and token');
      });
      
  }, []);
  return(
      <div className="Backstage">
          <h4>BACKSTAGE</h4>
          <Stream data={data} />
      </div>
  );
}

export default BackstagePage