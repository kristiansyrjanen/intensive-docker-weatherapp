import React from 'react';
import ReactDOM from 'react-dom';
const baseURL = process.env.ENDPOINT;
const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
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
    };
  }
  async componentWillMount() {
    const response = await getWeatherFromApi();
    console.log(response);
    this.setState({icon: response.weather[0].icon.slice(0, -1),temperature: response.main.temp});
  }
  render() {
    const { icon } = this.state;
    const { temperature } = this.state;
    return (
      <div className="icon">
        <p>Hello World</p>
        { icon && <img src={`/img/${icon}.svg`} /> }
        <p>Temperature: {temperature}</p>
      </div>
    );
  }
}
ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
