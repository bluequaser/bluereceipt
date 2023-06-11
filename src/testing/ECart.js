import React from 'react';

class ECart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      total: 0
    };
  }

  addItem(item) {
    this.setState((state) => {
      return {
        items: state.items.concat(item),
        total: state.total + item.price
      };
    });
  }

  render() {
    return (
      <div>
        <h1>Point of Sale</h1>
        <ItemList items={this.state.items} />
        <Total total={this.state.total} />
        <AddItemForm onAddItem={this.addItem} />
      </div>
    );
  }
}

class ItemList extends React.Component {
  render() {
    const items = this.props.items.map((item) => (
      <li key={item.name}>{item.name} - ${item.price}</li>
    ));
    return (
      <ul>
        {items}
      </ul>
    );
  }
}

class Total extends React.Component {
  render() {
    return (
      <p>Total: ${this.props.total}</p>
    );
  }
}

class AddItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: ''
    };
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handlePriceChange(event) {
    this.setState({price: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onAddItem({
      name: this.state.name,
      price: parseFloat(this.state.price)
    });
    this.setState({name: '', price: ''});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        </label>
        <label>
          Price:
          <input type="number" value={this.state.price} onChange={this.handlePriceChange} />
        </label>
        <input type="submit" value="Add Item" />
      </form>
    );
  }
}
 export default ECart;