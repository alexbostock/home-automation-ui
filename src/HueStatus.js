import axios from 'axios';
import { useEffect, useState } from 'react';

export default function HueStatus() {
  const [authenticated, setAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function checkAuthenticated() {
      try {
        const response = await axios.get('http://localhost:3740/hue/authenticated');
        setAuthenticated(response.data.authenticated);
      } catch (err) {
        console.error(err);
        setErrorMessage("Error accessing home-automation API");
        setAuthenticated(false);
      }
    }

    if (!authenticated) {
      checkAuthenticated();
    }
  });

  async function authenticate() {
    try {
      const response = await axios.post('http://localhost:3740/hue/authenticate');
      setAuthenticated(response.data.authenticated);
      setErrorMessage(response.data.error);
    } catch (err) {
      console.error(err);
      setErrorMessage("Error accessing home-automation API");
    }
  }

  if (authenticated) {
    return <p>Connected to Hue Bridge</p>;
  } else {
    return (
      <>
        <p>{errorMessage ? `Hue Bridge not connected: ${errorMessage}` : 'Hue Bridge not connected'}</p>
        <button onClick={authenticate}>Connect to Hue Bridge</button>
      </>
    );
  }
}
