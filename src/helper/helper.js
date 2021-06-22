import {db,realDB} from "../firebase/firebase";
import {useEvent} from "../contexts/eventsContext";


export const pushData = (path,data) =>{

  db.collection(path).add(data)
  realDB.ref(path).push(data)
  console.log('success')
}
export const getOptions = (collection) =>{
  let collectionList = []
  db.collection(collection).get().then(snapshot => {


    snapshot.forEach(doc =>{
          const data = doc.data()
      collectionList.push(data)

        })
    console.log(collectionList)


  })
  return collectionList
}
export const getRealtimeDoc = (path,id) =>{
  const eventDetails = realDB.ref(path+'/'+id).once("value")

  return eventDetails
}
export const getRealtimeChild = (path,child,id) =>{

  const childData = realDB.ref(path).orderByChild(child).equalTo(id)

  return childData
}
export const getDoc = (collection,field,value) =>{
  let collectionList = []
  db.collection(collection).where(field, "==", value).get()
      .then((snapshot) => {
    snapshot.forEach(doc =>{
      const data = doc.data()
      collectionList.push(data)

    })



  })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  console.log(collectionList)

  return collectionList
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

export function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' '  ;
  return time;
}