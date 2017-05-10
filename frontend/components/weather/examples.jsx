import React from 'react';
import ExampleItem from './example_item.jsx';

class Examples extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="examples-container">
        <ul className="example-list">
          <li><ExampleItem image={ "Boston2014" } city={ "Boston" } year={ "2014" } sub={ "A normal year" } /></li>
          <li><ExampleItem image={ "Chicago1893" } city={ "Chicago" } year={ "1893" } sub={ "World's Columbian Exposition" }/></li>
          <li><ExampleItem image={ "NewYork1929" } city={ "New York" } year={ "1929" } sub={ "Start of the Great Depression" }/></li>
          <li><ExampleItem image={ "Beijing2008" } city={ "Beijing" } year={ "2008" } sub={ "Olympics XXIX" }/></li>
          <li><ExampleItem image={ "Canberra2015" } city={ "Canberra" } year={ "2015" } sub={ "The Southern Hemisphere" }/></li>
          <li><ExampleItem image={ "Berlin1989" } city={ "Berlin" } year={ "1989" } sub={ "Fall of the Berlin Wall" }/></li>
          <li><ExampleItem image={ "Paris1940" } city={ "Paris" } year={ "1940" } sub={ "Germany Invades France" }/></li>
          <li><ExampleItem image={ "BakerLake2015" } city={ "Baker Lake Canada" } year={ "2015" } sub={ "Craziness" }/></li>
        </ul>
      </div>
    )
  }
}

export default Examples;
