import React from 'react';
import ReactDOM from 'react-dom';
const baseURL = process.env.ENDPOINT;
const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`http://localhost:8888/api/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return {};
};
class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "",
      temperature: "",
      location_city: "",
      location_country: "",
    };
  }
  async componentWillMount() {
    const response = await getWeatherFromApi();
    console.log(response);
    this.setState({icon: response.weather[0].icon.slice(0, -1),temperature: response.main.temp,location_city: response.name,location_country: response.sys.country});
  }
  render() {
    const { icon } = this.state;
    const { temperature } = this.state;
    const { location_city } = this.state;
    const { location_country } = this.state;
    return (
      <div className="icon">
        { icon && <img src={`/img/${icon}.svg`} /> }
        <p>Temperature: {temperature}</p>
        <p>Location: {location_city}, {location_country}</p>
      </div>
    );
  }
}
ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
