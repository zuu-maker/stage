// import ForgotPassword from "../utility/resetPassword";

export const initialState = {
    //states

    user:null,
    userData:null,
    otherUser:null,
    hasJoined:false,
    hasFollowed:false,
    joinedEvents:[], 
    createdEvents:[],
    selectedParticipants:[],
   }
//    window.localStorage.setItem(user ForgotPassword, 12345);
//    window.localStorage.johndoe
//    win
   const reducer = (state, action) =>{
     switch(action.type){
         case "SET_USER":
            //  console.log(action.user);
             return{
                 ...state,
                 user: action.user
             }
         case "SET_USER_DATA":
            //   console.log(action.userData);
              return{
                  ...state,
                  userData: action.userData
              }
         case "SET_HAS_JOINED":
            //  console.log(action.hasJoined);
             return{
                 ...state,
                 hasJoined:action.hasJoined
             }
         case "SET_CREATED_EVENTS":
            //  console.log(action.createdEvents);
             return{
                 ...state,
                 createdEvents:[...state.createdEvents,action.createdEvents]
             }
         case "SET_OTHER_USER":
            //  console.log(action.otherUser);
             return{
                 ...state,
                 otherUser:action.otherUser
             }
         case "SET_JOINED_EVENTS":
            //  console.log(action.joinedEvents)
             return{
                 ...state,
                 joinedEvents:[...state.joinedEvents,action.joinedEvents ]
             }
         case "SET_SELECTED_PARTICIPANTS":
            //  console.log(action.joinedEvents)
             return{
                 ...state,
                 selectedParticipants:[...state.selectedParticipants,action.selectedParticipants ]
             }
         case "SET_HAS_FOLLWED":
            //  console.log(action.hasFollowed);
             return{
                 ...state,
                 hasFollowed: action.hasFollowed
             }
       default:
          return state;
          
     }
   } 
   
   export default reducer;