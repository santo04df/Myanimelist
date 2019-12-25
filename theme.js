
function S(el){
    return document.querySelectorAll(el)
}
const generi = ["arti marziali", "avventura", "azione", "bambini", "cars", "commedia", "demenziale", "demoni", "dramma", "ecchi", "fantasy", "gioco", "harem", "hentai", "horror","isekai", "josei", "magia", "mecha", "militari", "mistero", "musicale", "parodia", "polizia", "psicologico", "romantico", "samurai", "sci-fi", "scolastico", "seinen", "sentimentale", "shoujo", "shoujo ai", "shounen", "shounen ai", "slice of life", "soprannaturale", "spazio", "splatter", "sport", "storico", "superpoteri", "thriller", "vampiri", "yaoi", "yuri"]
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.animeclick.it/immagini/anime/Code_Geass_Hangyaku_no_Lelouch/cover/Code_Geass_Hangyaku_no_Lelouch-cover.jpg', true);

xhr.responseType = 'blob';

xhr.onload = function (e) {
    if (this.status == 200) {
        var blob = this.response;
        document.getElementById("myImage").src = window.URL.createObjectURL(blob);
    }
};

xhr.onerror = function (e) {
    alert("Error " + e.target.status + " occurred while receiving the document.");
};

//xhr.send();

    
    
    
    let db = firebase.firestore();

/*        db.collection('chat').onSnapshot(function (querySnapshot) {
            chat = { message: [] };

            querySnapshot.forEach(function (doc) {
                if (doc.id == token) {
                    chat = doc.data();
                    doce = 1;
                }
            });
            if (doce == 0) {
                db.collection('chat').doc(token).set({
                    message: [],
                });
                doce = 1;
                chat = { message: [] };
            }
            self.postMessage(chat);
        });

        */
// rand generator
// set the length of the string
var stringLength = 15;

// list containing characters for the random string
var stringArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '?'];

function tokenrand() {

    var rndString = "";

    // build a string with random characters
    for (var i = 1; i < stringLength; i++) {
        var rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
        rndString = rndString + stringArray[rndNum];
    };
    return rndString;

}
var app = new Vue({
    el: "#app",
    data: { animelist: [],input:{name:"",img:"",status:""} ,},
    methods: {
        submit: () => {
            //app.messages.push({message:app.messaged, persona:"persona"});
            //app.animelist.push({ name: app.input.name, category:[],img:app.input.img})
            db.collection("animelist").add({ name: app.input.name, category: [], img: app.input.img ,status:app.input.status})

            app.input = {name:"",img:"",status:""};
            document.getElementById("upload").value=""

        },
        nope: () => { },
        delete_anime:(id)=>{
            db.collection('animelist').doc(id).delete().then(function () {
                //console.log("Document successfully deleted!");
            }).catch(function (error) {
                //console.error("Error removing document: ", error);
            });
        }
    },




})
db.collection('animelist').onSnapshot(function (querySnapshot) {
app.animelist=[];
    querySnapshot.forEach(function (doc) {
        //if (doc.id == token) {
        app.animelist.push({ data: doc.data(),id:doc.id})
            //anime = doc.data();
        //}
    });
});



document.getElementById("upload").addEventListener("change",function(){
    if (this.files && this.files[0]) {
        var reader = new FileReader();

        reader.onload = (e)=> {
            app.input.img = e.target.result
        }
        reader.readAsDataURL(this.files[0]);
    }

})

function see(id){
    if(id==0)
    S(".status").forEach(element =>{
        element.style.display="flex";
    })
    else if(id==1){
        S(".status").forEach(element => {
            element.style.display = "none";
        })
        S(".status.visto").forEach(element => {
            element.style.display = "flex";
        })
    }
    else if (id == 2) {
        S(".status").forEach(element => {
            element.style.display = "none";
        })
        S(".status.watching").forEach(element => {
            element.style.display = "flex";
        })
    }
    else if (id == 3) {
        S(".status").forEach(element => {
            element.style.display = "none";
        })
        S(".status.plain").forEach(element => {
            element.style.display = "flex";
        })
    }
}