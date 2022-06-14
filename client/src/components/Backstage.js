import React,{ useEffect, useState} from "react";
import '../style/Backstage.css'

var apiKey;
var sessionId;
var token;

function BackstagePage(){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
    return(
        <div className="Backstage">
            <h4>BACKSTAGE</h4>
            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            {data && (
                apiKey = data.apiKey,
                sessionId = data.sessionId,
                token = data.token
            )}
        </div>
    );
}

export default BackstagePage