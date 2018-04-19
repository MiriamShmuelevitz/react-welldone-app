export default function CategoryReducer(state = { modal_cat_visible: false, modal_loc_visible: false }, action) {
  switch (action.type) {
    case 'SET_MODAL_LOC':
      return Object.assign({}, state, {
        modal_loc_visible: action.payload
      })
    case 'SET_MODAL_CAT':
      return Object.assign({}, state, {
        modal_cat_visible: action.payload
      })
    default:
      return state
  }
}

export const setModal = (modal, visible) => {
  console.log(modal)
  return {
    type: modal === 'loc' ? 'SET_MODAL_LOC' : 'SET_MODAL_CAT',
    payload: visible
  }
}