import { combineReducers } from 'redux'
import {
  CREATE_POST,
  RECEIVE_LOCK_POSTS,
  DELETE_LOCK_POST,
  EDIT_LOCK_POST
} from '../actions'

const posts = (state = {
  createPhase:false,
  data:{},
  locks:[]
}, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        createPhase: action.json.status,
        data: action.json.data
      }
    case RECEIVE_LOCK_POSTS:
      return {
        ...state,
        phase: action.json.status,
        locks: action.json.data
      }
    case DELETE_LOCK_POST:
      return {
        ...state,
        phase: action.json.status,
      }
    case EDIT_LOCK_POST:
      return {
        ...state,
        phase: action.json.status,
      }
    default:
      return state
  }
}

const createPost = (state = { }, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        data: posts(state[action.json], action)
      }
    default:
      return state
  }
}

const fetchLockPosts = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_LOCK_POSTS:
      return {
        ...state,
        locks: posts(state[action.json], action)
      }
    default:
      return state
  }
}

const deleteLockPosts = (state = { }, action) => {
  switch (action.type) {
    case DELETE_LOCK_POST:
      return {
        ...state,
        data: posts(state[action.json], action)
      }
    default:
      return state
  }
}

const editLockPosts = (state = { }, action) => {
  switch (action.type) {
    case EDIT_LOCK_POST:
      return {
        ...state,
        data: posts(state[action.json], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  createPost,
  fetchLockPosts,
  deleteLockPosts,
  editLockPosts
})

export default rootReducer
