import React from 'react'
import './List.css';


const List = props => (

  <ul>
    {
      props.items.map(
        (item, index) => <li className="li" key={index}> {item}</li>
      )
    }
  </ul>
)

export default List
