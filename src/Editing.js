import React from 'react'
import './styles.css'
export class Editing extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        id: this.props.worker.id,
        name: this.props.worker.name,
        birthDate: this.props.worker.birthDate,
        post: this.props.worker.post,
        gender: this.props.worker.gender,
        fired: this.props.worker.fired,
        marked: this.props.worker.marked
    }

    handleFormChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        })
    }

    handlePostChange = (e) => {
        const { name, value } = e.target;
        let valueInt = parseInt(value)
        this.setState({
            [name]: valueInt,
        })
    }

    handleFiredChange = (e) => {
        const { name, checked } = e.target;
        this.setState({
            [name]: checked,
        })
    }

    handleBirthChange = (e) => {
        const { name, valueAsNumber } = e.target;
        let d = new Date(valueAsNumber);
        this.setState({
            [name]: d,
        })
    }

    render() {
        return (
            <div className="cardToEdit">
                <form onSubmit={() => this.props.handleSave(this.state)}>
                    <h4>
                        <u>
                            ФИО
                        </u>
                        {': '}
                        <input
                            className="inputName"
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
                            Должность
                        </u>
                        {': '}
                        <select
                            className="inputPost"
                            required
                            name="post"
                            onChange={this.handlePostChange}>
                            {this.props.posts.map((post) => {
                                return (
                                    <option value={post.id} key={post.id + Math.random()}>{post.name}</option>
                                )
                            })
                            }
                        </select>
                    </p>
                    <p>
                        <u>
                            Дата рождения
                        </u>
                        {': '}
                        <input
                            type="date"
                            name="birthDate"
                            onChange={this.handleBirthChange}

                        />
                    </p>
                    <p>
                        <u>
                            Пол
                        </u>
                        {': '}
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
                            Уволен
                        </u>
                        {': '}
                        <input
                            type="checkbox"
                            name="fired"
                            defaultChecked={this.props.worker.fired}
                            onChange={this.handleFiredChange}
                        />
                    </p>
                    <button type="submit">
                        Сохранить
                    </button>
                </form>
            </div>
        )
    }
}