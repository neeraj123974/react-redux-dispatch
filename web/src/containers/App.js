import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { 
  createPost,
  fetchLockPosts,
  deleteLockPosts,
  editLockPosts
} from '../actions'
import {Button , Modal} from 'antd';
import 'antd/dist/antd.css';
import _ from 'lodash'
import { DeleteFilled , EditFilled , ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    locks:PropTypes.array,
  }

  constructor(props) {
      super(props);
      this.state = {
        createModal:false,
        name:'',
        err:'',
        editModal:false,
        editData:'',
      }
    }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchLockPosts())
  }

  handleChange=(event)=>{
    this.setState({ [event.target.name]: event.target.value })
  }

  handleCancel = () => {
    const {editData} = this.props
    this.setState({
      createModal: false,
      name:_.get(editData , 'name' , ''),
      editModal: false
   });
  };

  createModal = () => {
      this.setState({
        createModal: true
      });
  };

  handleSubmit=()=> {
    const {name} = this.state  
    const {dispatch} = this.props    
    dispatch(createPost({name:name}))
    this.setState({
        createModal: false,
        name:''
    });
  }

  showDeleteConfirm=(data)=> {
    const {dispatch} = this.props
    confirm({
      title: 'Are you sure delete this?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(deleteLockPosts({id:data._id}))
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  showEditModal = (data) => {
    this.setState({
      editModal: true,
      editData:data,
      name:_.get(data,'name','')
    });
  };

  handleEdit=()=> {
    const {dispatch} = this.props
    const {name , editData} = this.state
    const obj = {
      name: name,
      id:_.get(editData,'_id',''),
    }
    dispatch(editLockPosts(obj))
    this.setState({
      editModal: false,
      name:''
    });
  }


  render() {
    const {locks} = this.props
    const {createModal, name, editModal} = this.state
    const showData = locks.length > 0 && locks.map((data , i)=>{
      return(
        <tr key = {i}>
          <td className='paddingLeft'>{_.get(data,'name' , '')}</td>
          <td className='paddingLeft'><EditFilled onClick={()=>this.showEditModal(data)}/></td>
          <td className='paddingLeft'><DeleteFilled onClick={()=>this.showDeleteConfirm(data)}/></td>
        </tr>
        )
    })
    return (
      <>
        <Button  className="btn btn-primary" onClick={()=>this.createModal()}>Create</Button>
          <table>
            <thead>
              <tr>
                <th className='paddingLeft'>{'Name'}</th>
                <th className='paddingLeft'>{'Edit'}</th>
                <th className='paddingLeft'>{'Delete'}</th>
              </tr>
            </thead>
            <tbody>
              {showData}
            </tbody>
          </table>
        <Modal
          title="Create"
          visible={createModal}
          onOk={()=>this.handleSubmit()}
          onCancel={()=>this.handleCancel()}
          >
          <form  onSubmit={this.handleSubmit}>
            <div className={'form-group'}>
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange.bind(this)} />  
            </div>   
          </form> 
        </Modal>
        <Modal
          title="Edit Ticket"
          visible={editModal}
          onOk={()=>this.handleEdit()}
          onCancel={()=>this.handleCancel()}
         >
         <form  onSubmit={this.handleSubmit}>
            <div className={'form-group'}>
              <label htmlFor="ticketName">Name</label>
              <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange.bind(this)} />  
            </div>  
        </form> 
      </Modal>
      </>
    )
  }
}

const mapStateToProps = state => {
  const {fetchLockPosts} = state
  const {locks} = fetchLockPosts
  return {
    locks:_.get(locks,'locks',[])
  }
}

export default connect(mapStateToProps)(App)
