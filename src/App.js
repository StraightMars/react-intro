import React, { useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import { Worker } from './Worker'
import { Editing } from './Editing'
import './styles.css'

class App extends React.Component {
    state = {
        posts: [
            { id: 0, name: 'Нет' },
            { id: 1, name: 'developer' },
            { id: 2, name: 'analyst' },
            { id: 3, name: 'hr-manager' },
            { id: 4, name: 'tester' },
            { id: 5, name: 'translator' },
            { id: 6, name: 'program manager' },
            { id: 7, name: 'architect' },
        ],
        workers: [
            { id: 1, fired: false, marked: false, name: 'Нуреев Марсель Ринатович', post: 1, birthDate: new Date('November 27, 1998'), gender: 'MALE' },
            { id: 2, fired: true, marked: false, name: 'Курицына Елизавета Юрьевна', post: 2, birthDate: new Date('September 16, 1999'), gender: 'FEMALE' },
            { id: 3, fired: false, marked: false, name: 'Лепихин Вадим Владимирович', post: 7, birthDate: new Date('April 5, 1999'), gender: 'MALE' },
            { id: 4, fired: true, marked: false, name: 'Субботин Алексей Сергеевич', post: 5, birthDate: new Date('August 14, 1999'), gender: 'MALE' },
            { id: 5, fired: false, marked: false, name: 'Цыганков Анатолий Олегович', post: 3, birthDate: new Date('February 27, 1999'), gender: 'MALE' },
            { id: 6, fired: true, marked: false, name: 'Рязанов Иван Дмитриевич', post: 6, birthDate: new Date('June 7, 1999'), gender: 'MALE' }
        ],
        appTitle: 'Workers application'
    }

    handleMarked(id) {
        const workers = this.state.workers.concat()

        const worker = workers.find(w => w.id === id)
        worker.marked = !worker.marked

        this.setState({ workers })
    }

    renderWorkers() {
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

    renderEditing() {
        return this.state.workers.map(worker => {
            if (worker.marked) {
                return (
                    <Editing worker={worker}
                        posts={this.state.posts.slice(1)}
                        key={worker.id + Math.random()}
                        handleSave={this.editWorker}
                    />
                )
            }
        }
        )
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
        const { workers } = this.state
        const worker = { id: null, fired: false, marked: true, name: '', post: 0, birthDate: new Date(0), gender: '' }
        let workerIds = workers.map(worker => worker.id)
        if (workerIds.length > 0) {
            worker.id = Math.max(...workerIds) + 1
        }
        else {
            worker.id = 1
        }

        this.setState({
            workers: [...workers, worker]
        })
    }

    deleteWorker() {
        return this.state.workers.map(worker => {
            if (worker.marked) {
                this.setState({
                    workers: this.state.workers.filter(workerD => {
                        return (workerD.marked == false)
                    })
                })
            }
        })
    }

    checkLockBtn() {
        let ok = this.state.workers.filter(w => w.marked === true)
        if (ok.length != 0) {
            return false
        }
        else {
            return true
        }
    }

    render() {

        return (
            <div className="app">

                <h1>{this.state.appTitle}</h1>

                <hr />

                <table>
                    <thead>
                        <tr>
                            <th align="center">Сотрудники</th>
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
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button style={{ width: '200px' }} onClick={() => this.addWorker()}>
                                    Добавить нового сотрудника
                              </button>
                                <button name="deleteBtn" disabled={this.checkLockBtn()} style={{ marginLeft: 22, width: '150px' }} onClick={() => this.deleteWorker()}>
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
