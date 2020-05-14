let db =firebase.firestore();

export default {
    create(data) {
    //data in not common JS Object, it needed to be handled before use as data source, this means to do:{...data}
        // now is handled on rows started with "const data = {" in ./controllers/cause.js
        return db.collection("causes").add(data);
    },
    getAll(){
        return db.collection("causes").get();
    },
    get(id){
        return db.collection("causes").doc(id).get();
    },
    close(id){
        return db.collection("causes").doc(id).delete();
    },
    donate(id,data){
        return db.collection("causes").doc(id).update(data);
    },


};