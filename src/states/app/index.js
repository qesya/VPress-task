const initialState = {
   search: "",
   lightbox: {
      show: false,
      data: null,
   },
   tags: [],
   list: [],
}

const app = (state = initialState, action) => {
   switch (action.type) {
      case "APP_SET_SEARCH":
         return {
            ...state,
            search: action.payload,
            tags: [],
         }
      case "APP_ADD_TAGS":
         return {
            ...state,
            search: '',
            tags: state.tags.indexOf(action.payload) !== -1 ? state.tags.filter(x => x !== action.payload) : [...state.tags, action.payload],
         }
      case "APP_SET_LIST":
         return {
            ...state,
            list: action.payload,
         }
      case "APP_SET_LIGHTBOX":
         return {
            ...state,
            lightbox: action.payload ? action.payload : {show: false, data: null},
         }
      default:
         return state
   }
}

export default app