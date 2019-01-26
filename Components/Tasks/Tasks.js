import React  from 'react';
import {connect} from 'react-redux';
import CryptoJS from 'crypto-js';

class Tasks extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            pageNumber: 1,
            admin: false
        }
    }

    componentDidMount(){
        this.props.dispatch({ type: 'GET_TASKS', payload: { params: { method: 'GET' } } });
    }

    createTask = e => {
        e.preventDefault();
        let body = new FormData(e.target);
        this.props.dispatch({ type: 'CREATE_TASK', payload: { params: { method: 'POST', body } } });
    }

    fixedEncodeURIComponent = (str) => {
        return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
    }

    editTask = e => {
        e.preventDefault();
        const status = 10;
        const text = this.fixedEncodeURIComponent(e.target.text.value);
        let signature = `status=10&text=${e.text}&token=beejee`;

        const body = new FormData(e.target);
        body.append('token', 'beejee');
        body.append('signature', CryptoJS.MD5(signature).toString(CryptoJS.enc.MD5) );
        this.props.dispatch({
            type: 'EDIT_TASK',
            payload: {
                params: {
                    method: 'POST',
                    body
                }
            }
        });
    }

    getNextPaginationPage = () => {
        const pageNumber = Math.floor(this.props.message.total_task_count / 3) > this.state.pageNumber 
                            ? this.state.pageNumber + 1
                            : this.state.pageNumber;
        if (pageNumber != this.state.pageNumber) {
            this.props.dispatch({
                type: 'GET_PAGE',
                payload: {
                    page: pageNumber,
                    params: {
                        method: 'GET'
                    }
                }
            });
            this.setState({ pageNumber: pageNumber });
        }
    }

    getPrevPaginationPage = () => {
        const pageNumber = this.state.pageNumber == 1 ? 1 : this.state.pageNumber - 1;
        if (pageNumber != this.state.pageNumber) {
            this.props.dispatch({
                type: 'GET_PAGE',
                payload: {
                    page: pageNumber,
                    params: {
                        method: 'GET'
                    }
                }
            });
            this.setState({ pageNumber: pageNumber });
        }
    }

    sortTasks = (sortField) => 
        this.props.dispatch({ type: 'SORT_TASKS', payload: { sortField, params: { method: 'GET' } } });

    adminSubmit = (e)=> {
        e.preventDefault();
        if (e.target.adminname.value === 'admin' && e.target.adminpassword.value === '123') {
            this.setState({admin: true});
        }
    }    

    render(){
        const {message} = this.props;
        return (    
            <div className="tasks">
                <div className="tasks__box tasks__box--filter">
                    <button 
                        className="tasks__btn tasks__btn-sort--user"
                        onClick={() => this.sortTasks('username')}
                    > 
                        По имени 
                    </button>
                    <button
                        className="tasks__btn tasks__btn-sort--email"
                        onClick={() => this.sortTasks('email')}
                    > По email</button>
                    <button
                        className="tasks__btn tasks__btn-sort--task"
                        onClick={() => this.sortTasks('status')}
                    > По задаче</button>
                </div>
                <div className="tasks__box tasks__box--data">
                    {message.tasks && message.tasks.map(el=> (
                        <p key={el.id} className="tasks__row">
                            <span className="tasks__item tasks__item--name">{el.username}</span>
                            <span className="tasks__item tasks__item--email">{el.email}</span>
                            <span className="tasks__item tasks__item--text">{el.text}</span>
                            <span className="tasks__item tasks__item--status">{el.status ? 'done' : 'process'}</span>
                        </p>
                        )
                    )}
                </div>
                <div className="tasks__box tasks__box--settings">
                    <form onSubmit={this.createTask} className="tasks__form">
                        <input placeholder="task" name="text" className="tasks__input-task" type="text" />
                        <input placeholder="username" name="username" className="tasks__input-task" type="text" />
                        <input placeholder="email" name="email" className="tasks__input-task" type="email" />
                        <button className="tasks__btn tasks__btn--submit" type="submit">Отправить</button>
                    </form>
                    <div className="tasks__pagination">
                        <button className="tasks__btn" onClick={this.getPrevPaginationPage}>Пред</button>
                        <button className="tasks__btn" onClick={this.getNextPaginationPage}>След</button>
                    </div>
                    {this.state.admin
                        ? 'Вы администратор'
                        : <form className="tasks__form tasks__form--admin" onSubmit={this.adminSubmit}>
                            <input placeholder="adminname" name="adminname" className="tasks__input-task" type="text" />
                            <input placeholder="password" name="adminpassword" className="tasks__input-task" type="password" />
                            <button className="tasks__btn tasks__btn--submit" type="submit">Админ клик</button>
                          </form>
                    }
                </div> 
            </div>
        );
    }
}

export default connect(store=>store)(Tasks);