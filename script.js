function foo(){
    let b = document.getElementById('main-field').height;
    document.getElementById('folders').style.height = (b - 30) +'px';
    document.getElementById('notes').style.height = (b - 30) +'px';
    document.getElementById('notetext').style.height = (b - 30) +'px';


    for(let i =0; i< folders.length; i++ ){
        addFolder(folders[i].name);
    }
}

function addFolder(foldername){
    let newfolder = document.createElement('div');
    newfolder.className = 'folder-case';
    newfolder.textContent = foldername;
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
function showText(){//track clicks on notes
    document.addEventListener('dblclick', function (e) {
        if(e.target.className=='note-case'){
            if(clickedNote){
                clickedNote.style.background = 'white';
            }
            e.target.style.background = 'rgb(219, 218, 218)';
            clickedNote = e.target;
            document.getElementById('notetext').innerHTML = '';

            for(let i =0; i< folders.length; i++ ){
                if(clicked.textContent == folders[i].name){
                    let selectedFolder = folders[i];
                    for (const property in folders[i].notes) {
                        if(selectedFolder.notes[property].name == clickedNote.textContent){
                            let text = document.createElement('div');
                            text.className = 'notetext';
                            text.innerHTML = selectedFolder.notes[property].text;
                            document.getElementById('notetext').appendChild(text);
                        }
                        
                    }
                }
            }

            clicked.style.background = 'rgb(219, 219, 218)';
        }
    });
}

function foo2(){//adding folder
    
    let addfolder = document.getElementById('addfolder');
    addfolder.addEventListener('click', function(){
        console.log(folders);
        let newfold = new Object();
        newfold.name = 'folder' + folders.length;
        newfold.notes = {};
        newfold.addNote  = function(noteName, noteText){
            this.notes[Object.keys(this.notes).length + 1] = {
                name: noteName,
                text: noteText
            }
        }
        folders.push(newfold);




        
        let newfolder = document.createElement('div');
        newfolder.className = 'folder-case';
        newfolder.textContent = 'folder' + (folders.length - 1);
        document.getElementById('folder-cases').appendChild(newfolder);
        
        folders[folders.length-1].name = newfolder.textContent;
    });
}


var clicked;
function foo3(){//track clicks on folders
    document.addEventListener('dblclick', function (e) {
        if(e.target.className=='folder-case'){
            if(clicked){
                clicked.style.background = 'white';
            }
            e.target.style.background = 'rgb(219, 218, 218)';
            clicked = e.target;
            document.getElementById('notes').innerHTML = '';
            let foldername = e.target.textContent;
            for(let i =0; i< folders.length; i++ ){
                if(foldername==folders[i].name){
                    for (const property in folders[i].notes) {
                        let newnote = document.createElement('div');
                        newnote.className = 'note-case';
                        newnote.textContent = folders[i].notes[property].name;
                        document.getElementById('notes').appendChild(newnote);
                    }
                }
            }
        }
    });
}

function del(){
    if(clickedNote){
        let notename = clickedNote.textContent;
        let foldername = clicked.textContent;

        if(clickedNote.style.background == 'rgb(219, 218, 218) none repeat scroll 0% 0%'){
                for(let i =0; i< folders.length; i++ ){
                    if(foldername==folders[i].name){
                        for (const property in folders[i].notes) {
                            if(notename==folders[i].notes[property].name){
                                clickedNote.remove();
                                delete folders[i].notes[property];
                                document.getElementById('notetext').innerHTML = '';
                            }
                           
                        }
                    }
            }
        }
        

    }   
    if(clicked.style.background == 'rgb(219, 218, 218) none repeat scroll 0% 0%'){
        clicked.remove();
        document.getElementById('notes').innerHTML = '';
        document.getElementById('notetext').innerHTML = '';

        let foldername = clicked.textContent;
        for(let i =0; i< folders.length; i++ ){
            if(foldername==folders[i].name){
                folders.splice(i, 1);
            }
        }
    }
    
}


function writeNote(){
    
    for(let i = 0; i<folders.length; i++){
        
        if(clicked.textContent == folders[i].name){
            console.log(folders[i]);
            
            let notename = `f${i}-note${Object.keys(folders[i].notes).length}`;
            folders[i].addNote(notename,'note text');
            
            let newnote = document.createElement('div');
            newnote.className = 'note-case';
            newnote.textContent = notename;
            document.getElementById('notes').appendChild(newnote);
           
        }
    }
}









const folders = [];

/*
const folder = {
    name : 'folder',
    notes: {
        1: {
            name: 'f-note0',
            text: 'f-text0'
        },
        2: {
            name: 'f-note1',
            text: 'f-text1'
        },
        3: {
            name: 'f-note2',
            text: 'f-text2'
        },
        4: {
            name: 'f-note3',
            text: 'f-text3'
        },
        5: {
            name: 'f-note4',
            text: 'f-text4'
        },
        6: {
            name: 'f-note5',
            text: 'f-text5'
        }
    },

    addNote : function(noteName, noteText){
        this.notes[Object.keys(this.notes).length + 1] = {
            name: noteName,
            text: noteText
        }
    }
};

const folder1 = {
    name : 'folder1',
    notes: {
        1: {
            name: 'f1-note0',
            text: 'f1-text0'
        },
        2: {
            name: 'f1-note1',
            text: 'f1-text1'
        },
        3: {
            name: 'f1-note2',
            text: 'f1-text2'
        },
        4: {
            name: 'f1-note3',
            text: 'f1-text3'
        }
    },
    addNote : function(noteName, noteText){
        this.notes[Object.keys(this.notes).length + 1] = {
            name: noteName,
            text: noteText
        }
    }
};

const folder2 = {
    name : 'folder2',
    notes: {
        1: {
            name: 'f2-note0',
            text: 'f2-text0'
        },
        2: {
            name: 'f2-note1',
            text: 'f2-text1'
        }
    },
    addNote : function(noteName, noteText){
        this.notes[Object.keys(this.notes).length + 1] = {
            name: noteName,
            text: noteText
        }
    }
};*/


/*const reportWindowSize = function(){
    let body = document.getElementById('body');
    body.style.scale = body.clientWidth/724;
}

window.onresize = reportWindowSize;*/
