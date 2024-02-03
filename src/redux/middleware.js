import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { firebase } from "../firebase.config";

const middleware = (store) => (next) => (action) => {
  if (action.type.toUpperCase() === "APICALL") {
    const reference = collection(firebase, action.payload.url);
    if (action.payload.method.toUpperCase() === "GET") {
      getDocs(reference).then((res) => {
        const videos = res.docs.map((itm) => {
          return { ...itm.data(), id: itm.id };
        });
        store.dispatch(action.payload.onSuccess(videos));
      });
    }else if(action.payload.method.toUpperCase() === "POST"){
      console.log(action.payload.data);
      // store.dispatch({type: 'video/changeLoading'})
      addDoc(reference, action.payload.data).then(res=>{
        console.log(action.payload.onSuccess.get());
        store.dispatch(action.payload.onSuccess.get())
        store.dispatch(action.payload.onSuccess.load())
        // store.dispatch({type: 'video/changeLoading'})
      })
    }else if(action.payload.method.toUpperCase() === "DELETE"){
      console.log('sss');
      const x = doc(reference, action.payload.data)
      deleteDoc(x).then(res=>{
        store.dispatch(action.payload.onSuccess.get())
      })
    }
  } else {
    next(action);
  }
};
export default middleware;
