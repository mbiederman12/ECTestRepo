import React from "react";
import '../style/Backstage.css'

function BackstagePage(){
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data));
      
  }, []);
    return(
        <div className="Backstage">
            <h4>BACKSTAGE</h4>
            
            <p>{!data ? "Loading . . .": data.token}</p>
        </div>
    );
}

export default BackstagePage