import {db,realDB} from "../firebase/firebase";
import {useEvent} from "../contexts/eventsContext";


export const submitForm = (formData) =>{

  db.collection('Events').add(formData)
  realDB.ref('/Events').push(formData)
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