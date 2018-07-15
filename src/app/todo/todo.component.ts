import { Component, OnInit} from '@angular/core';
import { TodoList, Todo } from './Itodo.component';
import uuid from 'uuid/v4';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit, TodoList {

	todos: Todo[] = [];
	currentTitle: string;
	currentContent: string;
	mySnackBar: MatSnackBar;
	filter = 'all';

	constructor(public snackBar: MatSnackBar) { }

	private updateStorage() {
		localStorage.removeItem('todos');
		localStorage.setItem('todos', JSON.stringify(this.todos));
	}

	addTodo(title: string, content: string) {
		this.todos.push({
			key: uuid(),
			title,
			content,
			state: 'progress'
		} as Todo);
		this.updateStorage();
		this.openSnackBar('Tâche ajoutée');
	}

	removeTodo(key: string) {
		this.todos.splice(this.indexByKey(key), 1);
		this.updateStorage();
		this.openSnackBar('Tâche supprimée');
	}

	clearTodos() {
		this.todos = [];
		localStorage.removeItem('todos');
	}

	indexByKey(key: string): number {
		let removeIndex = 0;
		this.todos.forEach((e, i) => {
			if (e.key === key) {
				removeIndex = i;
			}
		});
		return removeIndex;
	}

	changeState(key: string) {
		const copyTodo = [...this.todos];
		const todo = copyTodo[this.indexByKey(key)];
		todo.state = todo.state === 'progress' ? 'finish' : 'progress';

		this.todos = copyTodo;
		this.updateStorage();
		this.openSnackBar('Tâche modifiée');
	}

	openSnackBar(message: string) {
		this.snackBar.open(message, 'Ok', {
			duration: 3000
		});
	}

	ngOnInit() {
		const localTodos = localStorage.getItem('todos');
		this.todos = localTodos ? JSON.parse(localTodos) : [];
	}
}
