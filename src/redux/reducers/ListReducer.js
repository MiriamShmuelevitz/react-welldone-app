const createReducer = (handlersConfig, initialState) => {
  return (state = initialState, action) => {
    if (handlersConfig[action.type]) {
      return handlersConfig[action.type](state, action)
    } else {
      return state;
    }
  }
}

function ListReducer(listName) {
  const list = createReducer({
    'GET': (state, action) => {
      if (listName === action.payload.listName) {
        const list = JSON.parse(localStorage.getItem(action.payload.listName)) || [];
        return list;
      }
      return state;
    },
    'ADD': (state, action) => {
      if (listName === action.payload.listName) {
        const tmp = state;
        const tmpIndex = state[state.length - 1];
        tmp.push({ ...action.payload.data, id: tmpIndex ? tmpIndex.id + 1 : 0 })
        localStorage.setItem(action.payload.listName, JSON.stringify(tmp));
        return tmp;
      }
      return state;
    },
    'EDIT': (state, action) => {
      if (listName === action.payload.listName) {
        const tmp = state;
        tmp[action.payload.data.id] = { ...action.payload.data };
        localStorage.setItem(action.payload.listName, JSON.stringify(tmp));
        return tmp
      }
      return state;
    },
    'REMOVE': (state, action) => {
      if (listName === action.payload.listName) {
        const tmp = state.filter(item => item.id !== action.payload.id);
        localStorage.setItem(action.payload.listName, JSON.stringify(tmp));
        return tmp
      }
      return state;
    }
  }, []);
  return list
}

export const listItem = collectionName => ListReducer(collectionName);

export const getList = (listName) => {
  return {
    type: 'GET',
    payload: { listName }
  }
}

export const removeItem = (listName, id) => {
  return {
    type: 'REMOVE',
    payload: { id, listName }
  }
}

export const addItem = (listName, data) => {
  return {
    type: 'ADD',
    payload: { data, listName }
  }
}

export const editItem = (listName, data) => {
  return {
    type: 'EDIT',
    payload: { data, listName }
  }
}

export default listItem