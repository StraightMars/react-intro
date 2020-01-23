import React, { useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import {Worker} from './Worker'
import {Editing} from './Editing'
import {Adding} from './Adding'
import './styles.css'

class App extends React.Component{
  state = {
      posts: [
          {id: 0, name: 'Нет'},
          {id: 1, name: 'developer'},
          {id: 2, name: 'analyst'},
          {id: 3, name: 'hr-manager'},
          {id: 4, name: 'tester'},
          {id: 5, name: 'translator'},
          {id: 6, name: 'program manager'},
          {id: 7, name: 'architect'},
      ],
      workers: [
          {id: 1, fired: true, marked: false, name: 'Нуреев Марсель Ринатович', post: 1, birthDate: new Date('November 27, 1998'), gender: 'MALE'},
          {id: 2, fired: false, marked: false, name: 'Курицына Елизавета Юрьевна', post: 2, birthDate: new Date('September 16, 1999'), gender: 'FEMALE'},
          {id: 3, fired: false, marked: false, name: 'Лепихин Вадим Владимирович', post: 3, birthDate: new Date('April 5, 1999'), gender: 'MALE'},
          {id: 4, fired: false, marked: false, name: 'Субботин Алексей Сергеевич', post: 4, birthDate: new Date('August 14, 1999'), gender: 'MALE'},
          {id: 5, fired: false, marked: false, name: 'Цыганков Анатолий Олегович', post: 2, birthDate: new Date('February 27, 1999'), gender: 'MALE'},
          {id: 6, fired: false, marked: false, name: 'Рязанов Ивань Дмитриевич', post: 1, birthDate: new Date('June 7, 1999'), gender: 'MALE'}
      ],
      visible: true,
      appTitle: 'Workers application'
  }

  setGender(event) {
      console.log(event.target.value);
  }

  handleMarked(id){
      const workers = this.state.workers.concat()

      const worker = workers.find(w => w.id === id)
      worker.marked = !worker.marked

      this.setState({workers})
  }

  toggleHandler(){
      this.setState({visible: !this.state.visible})
  }

  renderWorkers(){
    console.log(this.state.workers)
      if (!this.state.visible)
          return null
      return this.state.workers.map(worker => {
          return (
              <Worker worker={worker}
              post={this.state.posts[this.state.posts.findIndex((p) => {
                   return p.id === worker.post 
                })]}
              key={worker.id + Math.random()} 
              onMark={this.handleMarked.bind(this, worker.id)}
              /> 
          )
      })
  }
  
  editWorker = (updatedWorker) => {
    const workerIndex = this.state.workers.findIndex((worker) => {
      return worker.id === updatedWorker.id;
    });
    const newWorkers = this.state.workers.concat();
    newWorkers[workerIndex] = updatedWorker;
    this.setState({
      workers: newWorkers
    });

  }

  addWorker = () => {
      const {workers} = this.state
      const worker = {id: null, fired: false, marked: true, name: '', post: 0, birthDate: new Date(0), gender: ''}
          let workerIds = workers.map(worker => worker.id)
          if (workerIds.length > 0){
              worker.id = Math.max(...workerIds) + 1
          }
          else{
              worker.id = 1
          }
      
      this.setState({
          workers: [...workers, worker]
      })
  }

  

  renderEditing(){
      return this.state.workers.map(worker => {
            if (worker.marked ){
                return (
                    <Editing worker = {worker}
                    posts={this.state.posts.slice(1)}
                    key={worker.id + Math.random()}
                    handleSave={this.editWorker}
                    />
                )
            }
          }
      )
  }

  

  deleting(){
      return this.state.workers.map(worker => {
          if (worker.marked){
              this.setState({
                  workers: this.state.workers.filter(workerD => {
                      return (workerD.marked == false)
                  })
              })
          }
      })
  }


  /* renderAdding(){
      
      return this.state.workers.map(worker => {
          if(worker.id == this.state.workers.length - 1){
          return (
            <Editing worker = {worker}
            key={worker.name + Math.random()}
            handleSave={this.editWorker}
            />
        )}
    })
  } */

  titleChangeHandler(title){
      if (this.state.appTitle.workers.trim() === '')
          return 
      this.setState({
          appTitle: title
      })
  }

  nameChangeHandler(name, actualName){
      const workers = this.state.workers.concat()

      const worker = workers.find(w => w.name === name)
      if (name.trim() === ''){
          return this.setState(
              {workers}
          )
          }
  }
  render() {
      const style = {
          marginRight: 20
      }

      return (
          <div className="app">

              <h1>{this.state.appTitle}</h1>
              <button 
              onClick={() => this.toggleHandler()}
              style={style}
              >Toggle</button>

              <input
                  type="text"
                  placeholder="Change title"
                  onChange={(event) => this.titleChangeHandler(event.target.value)}
                  value={this.state.appTitle}
              />

              <hr/>

              <table>
                  <thead>
                      <tr>
                          <th colSpan="2" align="center">Сотрудники</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>
                              <div>
                                  {this.renderWorkers()}
                              </div>
                          </td>
                          <td id="verticalTop">
                              <div>
                                  {this.renderEditing()}
                                  {console.log(this.state.workers)}
                              </div>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <button onClick={() => this.addWorker()}>
                                  Добавить нового сотрудника
                              </button>
                              <button onClick={() => this.deleting()}>
                                  Удалить сотрудника
                              </button>
                          </td>
                      </tr>
                  </tbody>
              </table>                
              
          </div>
      )
  }
}

export default App;
