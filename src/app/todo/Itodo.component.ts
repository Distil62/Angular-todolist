export interface Todo {
	key: string;
	title: string;
	content: string;
	state: 'progress' | 'finish';
}

export interface TodoList {
	todos: Todo[];
	currentTitle: string;
	currentContent: string;
	addTodo: (title: string, content: string) => void;
	removeTodo: (key: string) => void;
	indexByKey: (key: string) => number;
	changeState: (key: string, state: 'progress' | 'finish' | 'cancel') => void;
}

