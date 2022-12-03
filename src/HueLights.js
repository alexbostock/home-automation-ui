import axios from 'axios';
import { useEffect, useState } from 'react';

export default function HueLights() {
  const [errorMessage, setErrorMessage] = useState("No Hue lights connected");
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3740/hue/lights');
        setData(response.data);
      } catch (err) {
        setErrorMessage(err.message);
      }
    }
    if (!data) {
      fetchData();
    }
  });

  async function switchLight(lightId, onState) {
    try {
      const url = `http://localhost:3740/hue/lights/${lightId}/${onState ? 'on' : 'off'}`;
      const response = await axios.put(url);
      if (response.data.success) {
        setData(null);
      }
    } catch (err) {
      console.error(err.message); // TODO: error on-screen
    }
  }

  if (data && data.length) {
    const rows = data.map((light) => {
      return (
        <tr key={light.id}>
          <td>{light.name}</td>
          <td>{light.state.on ? 'on' : 'off'}</td>
          <td><button onClick={() => switchLight(light.id, true)}>switch on</button></td>
          <td><button onClick={() => switchLight(light.id, false)}>switch off</button></td>
        </tr>
      );
    });
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  } else {
    return <p>{errorMessage ? errorMessage : 'No data'}</p>;
  }
}
