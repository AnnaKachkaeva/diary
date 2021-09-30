function foo(){//chande width and height of app
    let b = document.getElementById('main-field').height;
    document.getElementById('folders').style.height = (b - 30) +'px';
    document.getElementById('notes').style.height = (b - 30) +'px';
    document.getElementById('notetext').style.height = (b - 30) +'px';

    draw();
}

// function Rclick(event){//catches right button clicks
//     if(event.button == 2){
//         console.log(event.target)
//     }
// }
function draw(){
    // console.log('drawing')
    document.getElementById('folder-cases').innerHTML = ''
    for(let i of MyDiary.folders){
        drawFolder(i)
    }
};

function drawFolder(folderObject){
    let newfolder = document.createElement('div');
    newfolder.className = 'folder-case';
    newfolder.name = folderObject.name;
    newfolder.id = folderObject.id;
    newfolder.textContent = folderObject.name;
    document.getElementById('folder-cases').appendChild(newfolder);
}
function addnotes(folder){
    for(let i = 0; i<folder.notes.length; i++){
        let newnote = document.createElement('div');
        newnote.className = 'note-case';
        newnote.textContent = folder.notes[i];
        document.getElementById('notes').appendChild(newnote);
    }
}

var clickedNote;
var clickedNoteBackground;
function showText(){//track clicks on notes & shows text of clicked note
    document.addEventListener('click', function (e) {
        if(e.target.className=='note-case'){
            if(clickedNote){
                clickedNote.style.background = 'white';
            }
            e.target.style.background = 'rgb(219, 218, 218)';
            clickedNote = e.target;
            clickedNoteBackground = clickedNote.style.background;
            document.getElementById('notetext').innerHTML = '';
            
            
            for (let i of MyDiary.folders){
                if(clicked.textContent == i.name){
                    for(let n of i.notes){
                        if(n.name == clickedNote.textContent){
                            let text = document.createElement('div');
                            text.className = 'notetext';
                            text.innerHTML = n.text;
                            document.getElementById('notetext').appendChild(text);
                        }
                    }

                }

            }

            clicked.style.background = 'rgb(219, 219, 218)';
        }
    });
}


function addFolder(){//+adding folder
    let addfolder = document.getElementById('addfolder');
    addfolder.addEventListener('click', function(){
        let folderObject = MyDiary.createFolder();//creating folder object
        
        drawFolder(folderObject);

    });

}

function drawNotes(foldername){
    document.getElementById('notes').innerHTML = ''
    for (let i of MyDiary.folders){
        if(i.name == foldername){
            for (let n of i.notes){
                let newnote = document.createElement('div');
                newnote.className = 'note-case';
                newnote.textContent = n.name;
                document.getElementById('notes').appendChild(newnote);
            }
        }
    }
}


var clicked;
var clickedBackground;
function foo3(){//track clicks on folders & shows its notes
    document.addEventListener('click', function (e) {
        if(e.target.className=='folder-case'){
            if(clicked){
                clicked.style.background = 'white';
            }
            e.target.style.background = 'rgb(219, 218, 218)';
            clicked = e.target;
            clickedBackground = clicked.style.background;
            document.getElementById('notes').innerHTML = '';
            let foldername = e.target.textContent;

            drawNotes(foldername)
        }
    });
}

function del(){//delete element whitch was clicked
    if(clickedNote){
        let notename = clickedNote.textContent;
        let foldername = clicked.textContent;

        if(clickedNote.style.background == clickedNoteBackground){
                for(let i of MyDiary.folders){
                    if(i.name == foldername){
                        //console.log(i)
                        for(let n of i.notes){
                            if(n.name == notename){

                                MyDiary.delete("note", i.name, n.name)
                                //console.log(i)
                            }
                        }
                    }
                }
        }
        drawNotes(foldername)

    }
    if(clicked.style.background == clickedBackground){
        document.getElementById('notes').innerHTML = '';
        document.getElementById('notetext').innerHTML = '';

        let foldername = clicked.textContent;
        for(let i of MyDiary.folders){
            if(i.name == foldername){
                MyDiary.delete("folder", i.name)
            }
        }
        draw();
    }

    
}


function writeNote(){

    let noteObject = MyDiary.createNote(clicked.textContent);

    //-------  adding folder to interface  ------
    let newNote = document.createElement('div');
    newNote.className = 'note-case'
    newNote.name = noteObject.name;
    newNote.id = noteObject.id;
    newNote.textContent = noteObject.name;
    document.getElementById('notes').appendChild(newNote);
    //---------------------------------------------    
}

function changeText(){
    document.addEventListener('click', function (e) {
        if(e.target.className=='notetext'){
            
            //console.log(e.target.childNodes)

            let text = e.target.textContent;
            if(e.target.parentElement.childNodes.length==1){
                //console.log(e.target)
                toTextArea(e.target, text)
            }
        }
    })    
}
function toTextArea(e, text){
    e.innerHTML = '';

    let parent = e.parentElement;
    e.remove();
    let texarea = document.createElement("TEXTAREA");
    texarea.classList.add("text");
    texarea.id = "textarea";
    texarea.cols = "50";
    texarea.rows = '17';
    texarea.textContent = text;
    parent.appendChild(texarea);
       
}
function toTextDiv(){
       let textarea = document.getElementById('textarea');
       let text = textarea.value;

       
       let parent = textarea.parentElement;
       textarea.remove();
       let div = document.createElement("div");
       div.classList.add("notetext");
       div.textContent = text;

       parent.appendChild(div);

       MyDiary.changeText(clicked.textContent, clickedNote.textContent, text);
}



let MyDiary = {//add unique name check
    counter : 5,
    folders:[
        {
            'name' : "folder0",
            'id' : 0,
            'notes' : [{
                'name' : "note0",
                'id' : 2,
                'text' : 'my text of note0 from folder0'
            }]
        },
        {
            'name' : "folder1",
            'id' : 1,
            'notes' : []
        },
        {
            'name' : "folder2",
            'id' : 3,
            'notes' : [{
                'name' : "note0",
                'id' : 4,
                'text' : 'my text of note0 from folder2'
            }]
        }
    ],

    findObject: function(obj, arr){//finds obj in arr
        for(let i of arr){
            if (i.name == obj){
                return i
            } 
        }
    },

    createFolder: function(folferName){
        let newfold = new Object()
        newfold.name = this.setName("folder")
        newfold.id = this.counter++
        newfold.notes = []
        this.folders.push(newfold)

        // console.log("folder created")
        // console.log(this.folders)

        return newfold
    },

    createNote: function(folderName){
        let newNote = new Object();
        let folder = this.findObject(folderName, this.folders)

        newNote.name = this.setName("note", folder.notes);
        newNote.id = this.counter++
        newNote.text = `text`; 

        
        folder.notes.push(newNote)

        return newNote
    },

    deleteFolder: function(folferName){
        for(let i =0; i< folders.length; i++ ){
            if (this.folders[i].name = folderName){
                this.folders[i].remove()
                console.log(this.folders)
            }
        }
    },

    delete: function(instance, folderName, noteName){
        switch (instance) {
            case "note":
                for(let i in this.folders){
                    if(this.folders[i].name == folderName){
                        for(let n in this.folders[i].notes){
                            if(this.folders[i].notes[n].name == noteName){
                                console.log(this.folders[i].notes.splice(n,1))
                            }
                        }
                    }
                }
                break;

            case "folder":
                for(let i in this.folders){
                    if(this.folders[i].name == folderName){
                        console.log(this.folders.splice(i,1))
                    }
                }
                break;
            default:
                return console.log("something went wrong in 'delete' function")
        }
        
    },

    setName: function(instance, folder){

        switch (instance) {
            case "folder":
                do{
                    var name = prompt("Please enter unique name of your folder", "folder-name")
                }while(!this.isUnique(this.folders, name))
                return name
            case "note":
                do{
                    var name = prompt("Please enter unique name of your folder", "note-name")
                }while(!this.isUnique(folder, name))
                return name
            default:
                return console.log("something went wrong in 'setName' function")
        }
        
    },

    isUnique: function(arr, name){
        let isUnique = true
        for(let i of arr){
            if (i.name == name){
                isUnique = false
            }
        }
        return isUnique
    },

    changeText: function(folderName, noteName, text){
        
        let folder = this.findObject(folderName, this.folders);
       
        let note = this.findObject( noteName, folder.notes);
        note.text = text;
    }
}


