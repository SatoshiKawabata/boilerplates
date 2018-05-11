import * as React from "react";
import Title from "./components/Title";
import TodoInput from "./components/TodoInput";
import Todo from "./components/Todo";

interface IState {
  todos: {
    text: string;
    done: boolean;
    id: string;
  }[];
  inputText: string;
};

export default class App extends React.Component<null, IState> {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputText: ""
    };
  }

  render() {
    return (
      <div>
        <Title />
        <TodoInput
          inputText={this.state.inputText}
          onAdd={() => {
            this.state.todos.push({
              text: this.state.inputText,
              done: false,
              id: Date.now().toString()
            });
            this.setState({
              inputText: "",
              todos: this.state.todos
            });
          }}
          onChange={todoText => {
            this.setState({ inputText: todoText });
          }}/>
        <div>
          {
            this.state.todos.map((todo, i) => (
              <Todo
                key={i}
                text={todo.text}
                done={todo.done}
                id={todo.id}
                onCheck={checked => {
                  this.state.todos[i].done = checked;
                  this.setState({
                    todos: this.state.todos
                  });
                }} />
            ))
          }
        </div>
      </div>
    );
  }
}