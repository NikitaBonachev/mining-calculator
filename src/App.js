import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'
import { Message } from 'semantic-ui-react'
import './App.css';

class App extends Component {
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

const list = [
	'Окупаемость оборудования через 3 дня',
	'Прибыль в день 10$',
];

const FormExampleForm = React.createClass({
  getInitialState: function () {
    return {
			messageHidden: false,
    };
  },
  handleDismiss: function() {
	  this.setState({ messageHidden: true });
  },
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
        <Form className='attached fluid segment'>
          <Header size='small'>Общие параметры</Header>
          <Form.Field>
            <label>Стоимость электроэнергии ($/кВт.ч.)</label>
            <input placeholder='0'/>
          </Form.Field>
          <Form.Field>
            <label>Курс добываем криптовалюты ($)</label>
            <input placeholder='0'/>
          </Form.Field>
          <Divider section/>
          <Header size='small'>Оборудование</Header>
          <Form.Field>
            <label>Потребление энергии (кВт./ч.)</label>
            <input placeholder='0'/>
          </Form.Field>
          <Form.Field>
            <label>Стоимость ($)</label>
            <input placeholder='0'/>
          </Form.Field>
          <Form.Field>
            <label>Количество единиц оборудования</label>
            <input placeholder='0'/>
          </Form.Field>
          <Button type='submit'>Рассчитать</Button>
        </Form>
        <Message
          attached='bottom'
          list={list}
          header='Результат убыточный'
          icon='warning'
          error />
        <Message
          attached='bottom'
          list={list}
          header='Результат прибыльный'
          icon='thumbs up'
          success />
      </div>
    )
  }
});
