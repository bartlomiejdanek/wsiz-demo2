import axios from 'axios'
import React from 'react'
import { Route, Link } from 'react-router-dom'

class Item extends React.Component {
  state = {
    person: {}
  }

  constructor(props) {
    // 1
    super(props)
    this.person = {}
  }

  fetchData(id) {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => {
        let person = res.data
        this.setState({ person });
        this.person = person;
      })
  }

  componentDidMount(prevProps) {
    // 2
    this.fetchData(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    // 6
    this.fetchData(this.props.match.params.id);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 5
    return this.state.person.id == this.props.match.params.id;
  }

  render() {
    // 3
    // 6.5
    return (
      <p>{this.person.name}</p>
    )
  }
}

export default class Items extends React.Component {
  render() {
    const { url } = this.props.match
    return (
      <div>
        <h1>Welcome to Item Page</h1>
        <strong>Select item Id</strong>
        <ul>
          <li>
            <Link to="/item/1">Item 1 </Link>
            0
          </li>
          <li>
            <Link to="/item/2">Item 2 </Link>
            4
          </li>
          <li>
            <Link to="/item/3">Item 3 </Link>
          </li>
          <li>
            <Link to="/item/4">Item 4 </Link>
          </li>
        </ul>
        <Route path="/item/:id" component={Item} />
      </div>
    )
  }
}
