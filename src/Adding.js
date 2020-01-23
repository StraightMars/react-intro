import React from 'react'
import './styles.css'
export class Editing extends React.Component {
    constructor(props){
        super(props)
    }

    state = {
        id: this.props.worker.id,
        name: this.props.worker.name,
        birthDate: this.props.worker.birthDate,
        post: this.props.worker.post,
        gender: this.props.worker.gender,
        fired: this.props.worker.fired
    }

    handleFormChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        })
    }

    handleFiredChange = (e) => {
        const {name, checked} = e.target;
        this.setState({
            [name]: checked,
        })
    }

    handleBirthChange = (e) => {
        const { name, valueAsNumber } = e.target;
        let d = new Date(valueAsNumber);
        //console.log(new Date(d))
        this.setState({
            [name]: d,
        })
        console.log(this.state)
    }

    render(){
        return (
            <div className="cardToEdit">
                <h4> 
                    <u>
                        ФИО:
                    </u>
                    {' '}
                    <input 
                        required 
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        defaultValue={this.props.worker.name}
                        onChange={this.handleFormChange}
                    />
                </h4>
                <p>
                    <u>
                        Должность:
                    </u>
                    {' '}
                    <input 
                        required
                        name="post"
                        type="text"
                        placeholder="Enter post"
                        defaultValue={this.props.worker.post}
                        onChange={this.handleFormChange}
                    />
                </p>
                <p>
                    <u>
                        Дата рождения:
                    </u>
                    {' '}
                    <input
                        type="date"
                        name="birthDate"
                        //defaultValue={this.props.worker.birthDate}
                        onChange={this.handleBirthChange}
                    />
                </p>
                <p>
                    <u>
                        Пол: 
                    </u>
                    {' '}
                    <input 
                        type="radio" 
                        value="MALE" 
                        name="gender"
                        defaultChecked={this.props.worker.gender == 'MALE' ? true : false}
                        onChange={this.handleFormChange}
                    />
                    Мужской
                    <input 
                        type="radio" 
                        value="FEMALE" 
                        name="gender"
                        defaultChecked={this.props.worker.gender == 'FEMALE' ? true : false}
                        onChange={this.handleFormChange}
                    />
                    Женский
                </p>
                <p>
                    <u>
                        Уволен:
                    </u>
                    {' '}
                    <input
                        type="checkbox"
                        name="fired"
                        defaultChecked={this.props.worker.fired}
                        onChange={this.handleFiredChange}
                    />
                </p>
                <button onClick={() => this.props.handleSave(this.state)}>
                    Сохранить
                </button>
            </div>
        )
    }
}