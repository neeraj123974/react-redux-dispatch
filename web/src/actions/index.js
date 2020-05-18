export const CREATE_POST = 'CREATE_POST'
export const RECEIVE_LOCK_POSTS = 'RECEIVE_LOCK_POSTS'
export const DELETE_LOCK_POST = 'DELETE_LOCK_POST'
export const EDIT_LOCK_POST = 'EDIT_LOCK_POST'

//****//
export const createPostResponse = (data, json) => (
  {
    type: CREATE_POST,
    json
  }
)

export const receiveLockPost = (data, json) => ({
  type: RECEIVE_LOCK_POSTS,
  json
})

export const deleteLockPost = (data, json) => ({
  type: RECEIVE_LOCK_POSTS,
  json
})

export const editPostResponse = (data, json) => (
  {
    type: EDIT_LOCK_POST,
    json
  }
)

//****//
const HOSTNAME = process.env.REACT_APP_API_HOSTNAME

const fetchLock = data => dispatch => {
   return fetch(`${HOSTNAME}/api/v1/auth/getLock`,{
    method: 'GET'
  })
  .then(response => response.json())
  .then(json => dispatch(receiveLockPost(data, json)))
}

const create = data => dispatch => {
 return fetch(`${HOSTNAME}/api/v1/auth/createLock`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(json => {
    dispatch(createPostResponse(data, json))
    if(json.status){
      dispatch(fetchLockPosts())
    }
  })
}

const deleteLock = data => dispatch => {
 return fetch(`${HOSTNAME}/api/v1/auth/deleteLock`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(json => {
    dispatch(deleteLockPost(data, json))
    if(json.status){
      dispatch(fetchLockPosts())
    }
  })
}

const edit = data => dispatch => {
 return fetch(`${HOSTNAME}/api/v1/auth/editLock`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(json => {
    dispatch(editPostResponse(data, json))
    if(json.status){
      dispatch(fetchLockPosts())
    }
  })
}

//****//
export const createPost = data => (dispatch, getState) => {
  return dispatch(create(data))
}

export const fetchLockPosts = data => (dispatch, getState) => {
  return dispatch(fetchLock(data))
}

export const deleteLockPosts = data => (dispatch, getState) => {
  return dispatch(deleteLock(data))
}

export const editLockPosts = data => (dispatch, getState) => {
  return dispatch(edit(data))
}
