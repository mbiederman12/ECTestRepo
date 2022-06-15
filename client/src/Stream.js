import React from "react";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
function Stream(){
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data));
      
  }, []);


  return(
    <div>
        <OTSession
          apiKey={data.apiKey}
          sessionId={data.sessionId}
          token={data.token}
        >
          <OTPublisher
    
          />
          <OTStreams>
            <OTSubscriber
              properties={{ width: 100, height: 100 }}
            />
          </OTStreams>
        </OTSession>
      </div>
  );
}
export default Stream