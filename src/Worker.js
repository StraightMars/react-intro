import React from 'react'
import './styles.css'
export class Worker extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const classes = ['card']
        if (this.props.worker.marked) {
            classes.push('marked')
        }
        let d = this.props.worker.birthDate
        return (
            <div
                className={classes.join(' ')}
                onClick={this.props.onMark}>

                <h4>
                    <u>ФИО</u>
                    {': '}
                    {this.props.worker.name}
                </h4>
                <p>
                    <u>Должность</u>
                    {': '}
                    {this.props.post.name}
                </p>
                <p>
                    <u>Дата рождения</u>
                    {': '}
                    {d.getDate() + "." + (parseInt(d.getMonth(), 10) + 1) + "." + d.getFullYear()}
                </p>
                <p>
                    <u>Пол</u>
                    {': '}
                    {this.props.worker.gender === "MALE" ? 'Мужской' : 'Женский'}
                </p>
                <p>
                    <u>Уволен</u>
                    {': '}
                    {<input
                        type="checkbox"
                        defaultChecked={this.props.worker.fired}
                    />}
                </p>
            </div>
        )
    }
}