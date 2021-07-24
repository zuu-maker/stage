import {db,realDB} from "../firebase/firebase";
import {useEvent} from "../contexts/eventsContext";

export const getReceiverUid = (members, currentUser) => (
  members?.filter(filteredUser => filteredUser !== currentUser?.uid)[0]
)
export const getReceiverEmail = (users, currentUser) => (
     users?.filter(filteredUser => filteredUser !== currentUser?.email)[0]
)

export const pushData = async (path,data,id) =>{

  await db.collection(path).doc(id).set(data).catch(e => console.log(e))
  await realDB.ref(path+'/'+id).set(data).catch(e => console.log(e))
}
export const pushFireStoreData = (path,data) =>{

  db.collection(path).add(data).then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
}
export const pushSubCollection = (collection,doc,subcollection, data) =>{

  { data &&
    db.collection(collection).doc(doc).collection(subcollection).add(data)
        .then(() => {
          console.log("Document has added")
        }).catch((err) => {
      console.log(err)
    })
  }
}
export const pushRealData = (path,data) => {
  return realDB.ref(path).push(data)


}
export const getOptions = async (collection,order) =>{
  let collectionList = []
  await db.collection(collection).orderBy(order).get().then(snapshot => {


    snapshot.forEach(doc =>{
          const data = doc.data()
      collectionList.push(data)

        })


  })
  return collectionList
}
export const getSubCollection =  async (collection,doc,subcollection,order) =>{
  let collectionList = []
   await db.collection(collection).doc(doc).collection(subcollection).orderBy(order).get().then(snapshot => {


      snapshot.forEach(doc =>{
        const data = doc.data()
        collectionList.push(data)

      })
      console.log(collectionList)


  })
  return collectionList
}
export const getRealtimeSubCollection = async (collection,doc,subcollection,order) =>{
  let collectionList = []
   await db.collection(collection).doc(doc).collection(subcollection).orderBy(order).onSnapshot(snapshot => {


      snapshot.forEach(doc =>{
        const data = doc.data()
        collectionList.push(data)

      })
      console.log(collectionList)


  })
  return collectionList
}
export const updateFirestoreSubCollection = async (collection,doc,subcollection,subId,data) =>{

  return await db.collection(collection).doc(doc).collection(subcollection).doc(subId).update(data)
}
export const getRealtimeCollection =  (collection) =>{
  let collectionList = []
    db.collection(collection).onSnapshot(snapshot => {


      snapshot.forEach(doc =>{
        const data = doc.data()
        collectionList.push(data)

      })
      console.log(collectionList)


  })
  return collectionList
}

export const updateDocument =  (collection,id,data) =>{
    db.collection(collection).doc(id).update(data)
  realDB.ref(collection+'/'+id).update(data)


}
export const updateFirebaseDocument =  (collection,id,data) =>{
 return  realDB.ref(collection+'/'+id).update(data)


}
export const updateFirestoreDocument =  (collection,id,data) =>{
    return db.collection(collection).doc(id).update(data)


}
export const updateFirestoreArray =  (collection,id,data) =>{
    return db.collection(collection).doc(id).update(data)


}

export const getRealtimeDoc = (path,id) =>{


  return realDB.ref(path+'/'+id).once("value")
}

export const  getRealtimeChild =  (path,child,id) =>{
console.log(id);


  return  realDB.ref(path).orderByChild(child).equalTo(id)
}

export const getDoc = (collection,field,value) =>{
  let collectionList = []
  db.collection(collection).where(field, "==", field).get()
      .then((snapshot) => {
    snapshot.forEach(doc =>{
      const data = doc.data()
      collectionList.push(data)

    })



  })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  // console.log(collectionList)

  return collectionList
}

//Fetch Firestore Document that returns a promise
export const  getFirestoreDocument = async (collection,field,value) =>{
  await db.collection(collection).where(field, "==", value).get()

}

// {id: doc.id, data:doc.data()})
export const eventFilter = (filterBy,value) =>{
  let eventsRef;

  { value === 'All' ?  eventsRef = realDB.ref('Events')

  :   eventsRef = realDB.ref('Events').orderByChild(filterBy).equalTo(value);
  }

    let eventList = []

    eventsRef.on('value',(snapshot) => {

    snapshot.forEach(function(events) {
      eventList.push({


        EventName: events.val().EventName,
        EventEntryFee: events.val().EventEntryFee,
        eventGame: events.val().EventGame,
        eventCurrentParticipants: events.val().EventCurrentParticipants,
        EventMaximumParticipants: events.val().EventMaximumParticipants,
        EventTotalPrizes: events.val().EventTotalPrizes,
        EventDifficulty: events.val().EventDifficulty


      });
    });


    console.log(eventList);

  });
  return eventList
}

export function timeConverter(UNIX_timestamp,type){
  var a = new Date(UNIX_timestamp );
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var monthNum = a.getUTCMonth();
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds()
  var time;
  {type === 'H-M'?
     time = hour + ':' + min
    :
    type === 'D-M-Y'
        ?
    time = date + ' ' + month + ' ' + year + ' '
    :
        type === 'D/M/Y'
            ?
            time = date + '/' + monthNum + '/' + year
            :
    time = date + ' ' + month + ' ' + year + ' '

  }

  return time;
}

export function checkDate(UNIX_timestamp){
  var a = new Date(UNIX_timestamp );
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time;

    time = date + ' ' + month + ' ' + year + ' '


  return time;
}
// export function sentToday(UNIX_timestamp){
//
//   if(UNIX_timestamp > UNIX_timestamp + 86400)
//     return true
//   else
//     return false
//
//
// }

// Object.assign({ uid: doc.id }, doc.data())

