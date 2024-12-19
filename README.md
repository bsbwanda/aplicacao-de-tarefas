# aplicacao-de-tarefas
Desafio 2 - Aplicação de Tarefas com Rotas, Estado, Efeito e Contexto



Desafio 2 - Aplicação de Tarefas com Rotas, Estado, Efeito e Contexto
Resumo do Projeto
Neste projeto, criamos uma aplicação React para gerenciar tarefas, utilizando rotas, gerenciamento de estado com Context API, efeitos colaterais com useEffect, e navegação com React Router. A aplicação permite ao usuário adicionar, editar, excluir e visualizar tarefas, com persistência de dados entre sessões usando localStorage.

Introdução
O objetivo desse desafio é desenvolver uma aplicação mais robusta, que combine múltiplos conceitos do React, como hooks, navegação entre páginas e gerenciamento de estado global. A aplicação é uma lista de tarefas (to-do list) que utiliza o React Router para navegação entre páginas e a Context API para gerenciar o estado global das tarefas. Além disso, os dados das tarefas são armazenados no localStorage para garantir persistência entre as sessões.

Tecnologias Utilizadas
React: Biblioteca principal para criar a interface da aplicação.
React Router: Para navegação entre diferentes páginas.
Context API: Para gerenciamento de estado global.
useState: Hook para gerenciamento de estado local.
useEffect: Hook para manipulação de efeitos colaterais, como carregar e salvar tarefas no localStorage.
localStorage: Para persistir as tarefas entre as sessões do navegador.
Funcionalidades
Adicionar Tarefa: O usuário pode adicionar novas tarefas.
Visualizar Tarefas: A lista de tarefas é exibida na página principal.
Editar Tarefa: O usuário pode editar o texto de uma tarefa existente.
Excluir Tarefa: O usuário pode remover uma tarefa da lista.
Persistência de Tarefas: As tarefas são salvas no localStorage, permitindo que elas sejam recuperadas entre diferentes sessões da aplicação.
Estrutura do Projeto
A estrutura do projeto é organizada para separar as responsabilidades em diferentes componentes e contextos. Aqui está uma visão geral da estrutura do código:

php
Copiar código
aplicacao-de-tarefas/
├── public/
├── src/
│   ├── components/          # Componentes reutilizáveis (Ex: TaskItem, TaskForm)
│   ├── context/             # Contêiner para o gerenciamento de estado (TaskContext.js)
│   ├── pages/               # Páginas da aplicação (Home, AddTask)
│   ├── App.js               # Componente principal que configura as rotas
│   ├── index.js             # Ponto de entrada da aplicação
├── package.json             # Dependências e scripts
└── README.md                # Este arquivo de documentação
Como Executar o Projeto
Clonar o repositório:

Primeiro, clone este repositório para sua máquina local:

bash
Copiar código
git clone https://github.com/seu-usuario/aplicacao-de-tarefas.git
Instalar as dependências:

Após clonar o repositório, entre no diretório do projeto e instale as dependências utilizando o npm ou yarn:

bash
Copiar código
cd aplicacao-de-tarefas
npm install
Rodar a aplicação:

Após a instalação das dependências, execute o comando para iniciar o servidor de desenvolvimento:

bash
Copiar código
npm start
Isso irá rodar a aplicação localmente em http://localhost:3000.

Acessar as Páginas:

A aplicação possui duas páginas principais:

Home: Exibe a lista de tarefas e oferece links para adicionar ou editar tarefas.
Adicionar Tarefa: Página onde o usuário pode adicionar novas tarefas.
A navegação entre as páginas é feita utilizando o React Router.

Estrutura do Código
Componente Principal (App.js)
O componente App.js gerencia as rotas da aplicação utilizando o React Router. A navegação permite acessar a página principal e a página de adicionar tarefas.

javascript
Copiar código
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import { TaskProvider } from './context/TaskContext';

const App = () => {
  return (
    <Router>
      <TaskProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/add-task" component={AddTask} />
        </Switch>
      </TaskProvider>
    </Router>
  );
};

export default App;
Contexto de Tarefas (TaskContext.js)
O contexto gerencia o estado global das tarefas e permite que os componentes acessem e modifiquem a lista de tarefas. As tarefas são armazenadas no localStorage para persistência entre sessões.

javascript
Copiar código
import React, { createContext, useState, useEffect } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Carregar tarefas do localStorage quando o componente for montado
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Salvar tarefas no localStorage sempre que a lista de tarefas mudar
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Funções para adicionar, remover e editar tarefas
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, editTask }}>
      {children}
    </TaskContext.Provider>
  );
};
Dicas
React Router: Utilize os componentes BrowserRouter, Route e Switch para configurar as rotas.
Context API: Use o contexto para compartilhar o estado das tarefas entre os componentes.
useEffect: Utilize o useEffect para carregar e salvar tarefas no localStorage.
Componentização: Mantenha a lógica do contexto separada dos componentes de apresentação.
Contribuições
Sinta-se à vontade para contribuir com melhorias, relatórios de bugs ou novas funcionalidades. Para isso, basta criar um fork do projeto, fazer as alterações desejadas e enviar um pull request.

