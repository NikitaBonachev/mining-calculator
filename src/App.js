import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'
import { Message } from 'semantic-ui-react'
import './App.css';

class App extends Component {
  //noinspection JSMethodCanBeStatic
	render() {
    return (
      <div className="main ui text container">
        <h1 className="ui dividing centered header">Mining Calculator</h1>
        <FormExampleForm />
      </div>
    );
  }
}

export default App;

class MessageResult extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hidden: true,
			list: [],
			header: '',
			icon: 'warning'
		};
	};
	componentWillReceiveProps(props) {
	  if (props.result.type !== 'no') {
			this.setState({
				header: props.result.type  === 'good' ? 'Результат прибыльный' : 'Результат убыточный',
				list: [
					`Прибыль в день ${props.result.profitInDay} $`,
					`Окупаемость оборудования через ${props.result.profitFromCardInDays}`
				],
				icon: props.result.type === 'good' ? 'thumbs up' : 'warning',
				hidden: props.result.type === 'no'
			});
    }
  };
  render() {
    if (this.props.result.type === 'good') {
			return (
        <Message
          hidden={this.state.hidden}
          attached='bottom'
          list={this.state.list}
          header={this.state.header}
          icon={this.state.icon}
          success />
			)
    } else {
			return (
        <Message
          hidden={this.state.hidden}
          attached='bottom'
          list={this.state.list}
          header={this.state.header}
          icon={this.state.icon}
          error />
			)
    }

	};
}

class FormExampleForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messageHidden: false,
      electricityCostPerHour: '',
      cryptoCurrencyCourse: '',
      videoCardEnergyPerHour: '',
      videoCardCost: '',
      videoCardNumber: '',
			videoCardProfit: '',
			result: {
			  type: 'no'
      }
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	};
	handleSubmit(event) {
		event.preventDefault();
		let energyCostPermHour = this.state.electricityCostPerHour;
		let cryptoCurrencyCourse = this.state.cryptoCurrencyCourse;
		let videoCardEnergyPerHour = this.state.videoCardEnergyPerHour;
		let videoCardCost = this.state.videoCardCost;
		let videoCardNumber = this.state.videoCardNumber;
		let videoCardProfit = this.state.videoCardProfit;

		let energyCostInDollars = energyCostPermHour / 60;
		let coinsInDay = videoCardProfit * videoCardNumber * 24;
		let moneyForEnergyPerDay = videoCardEnergyPerHour * 24 * energyCostInDollars;

		let profitInDay = coinsInDay * cryptoCurrencyCourse - moneyForEnergyPerDay; // Прибыль карты в день
		let profitFromCardInDays = videoCardCost / profitInDay; // Окупаемость карты через дней

    this.setState({
      result: {
        type: profitFromCardInDays > 100 ? 'bad' : 'good',
				profitInDay,
				profitFromCardInDays
      }
    });
	};
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}
	handleDismiss() {
	  this.setState({ messageHidden: true });
  };
  render() {
    return (
      <div>
        <Message
          attached={true}
          onDismiss={ this.handleDismiss }
          hidden={ this.state.messageHidden }
          info>
          <Message.Header>Хотите подсчитать свою прибыль с указанным оборудованием?</Message.Header>
          <p>Заполните все указанные ниже поля</p>
        </Message>
        <Form
          className='attached fluid segment'
          onSubmit={this.handleSubmit}
        >
          <Header size='small'>Общие параметры</Header>
          <Form.Field>
            <label>Стоимость электроэнергии ($/кВт.ч.)</label>
            <input
              name='electricityCostPerHour'
              placeholder='0'
              value={this.state.electricityCostPerHour}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Курс добываем криптовалюты ($)</label>
            <input
              name='cryptoCurrencyCourse'
              placeholder='0'
              value={this.state.cryptoCurrencyCourse}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Divider section/>
          <Header size='small'>Оборудование</Header>
          <Form.Field>
            <label>Потребление энергии (кВт./ч.)</label>
            <input
              name='videoCardEnergyPerHour'
              placeholder='0'
              value={this.state.videoCardEnergyPerHour}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Стоимость ($)</label>
            <input
              name='videoCardCost'
              placeholder='0'
              value={this.state.videoCardCost}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Количество единиц оборудования</label>
            <input
              name='videoCardNumber'
              placeholder='0'
              value={this.state.videoCardNumber}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Валюты в час</label>
            <input
              name='videoCardProfit'
              placeholder='0'
              value={this.state.videoCardProfit}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Button
            type='submit'
            content='Рассчитать'
          />
        </Form>
        <MessageResult
          result={this.state.result}
        />
      </div>
    )
  };
}
