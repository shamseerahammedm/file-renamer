
export const handleActionStart = (type, payload) => {
  if (payload)
  {
    return {
      type: type,
      payload: payload
    };
  }
  else
  {
    return {
      type: type,
    };
  }
};

export const handleNonAPIActionFailure = (type, payload) => ({
  type: type,
  payload: payload
});

export const handleNonAPIActionSuccess = (type, payload) => ({
  type: type,
  payload: payload
});

export const readURL = (file) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => res(e.target.result);
    reader.onerror = e => rej(e);
    reader.readAsDataURL(file);
  });
};

/* 
  Utility function for getting formatted file size in MB,GB etc..
*/
export const getFileSizeToShow = (fileSize) => {
  const fileTypeArrays = ['Bytes', 'KB', 'MB', 'GB'];
  let i = 0; while (fileSize > 900) { fileSize /= 1024; i++; }
  const exactSize = (Math.round(fileSize * 100) / 100) + ' ' + fileTypeArrays[i];
  return exactSize;
};

/* 
  Utility function for grabbing file extension from file name
*/
export const getExtensionFromFileName = (fileName) => fileName.substring(fileName.lastIndexOf('.') + 1);

/* 
  Utility function to get blob of a url
*/
export const getBlob = (url) => {
  return new Promise(function (resolve, reject) {
    try
    {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.onerror = function () { reject('Network error.'); };
      xhr.onload = function () {
        if (xhr.status === 200) { resolve(xhr.response); }
        else { reject('Loading error:' + xhr.statusText); }
      };
      xhr.send();
    }
    catch (err) { reject(err.message); }
  });
};

// (function () {
//   // IndexedDB
//   let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
//     IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
//     dbVersion = 1.0;

//   // Create/open database
//   let request = indexedDB.open('elephantFiles', dbVersion),
//     db,
//     createObjectStore = function (dataBase) {
//       // Create an objectStore
//       console.log('Creating objectStore');
//       dataBase.createObjectStore('elephants');
//     },

//     getImageFile = function () {
//       // Create XHR
//       let xhr = new XMLHttpRequest(),
//         blob;

//       xhr.open('GET', 'elephant.png', true);
//       // Set the responseType to blob
//       xhr.responseType = 'blob';

//       xhr.addEventListener('load', function () {
//         if (xhr.status === 200) {
//           console.log('Image retrieved');

//           // Blob as response
//           blob = xhr.response;
//           console.log('Blob:' + blob);

//           // Put the received blob into IndexedDB
//           putElephantInDb(blob);
//         }
//       }, false);
//       // Send XHR
//       xhr.send();
//     },

//     putElephantInDb = function (blob) {
//       console.log('Putting elephants in IndexedDB');

//       // Open a transaction to the database
//       let transaction = db.transaction(['elephants'], IDBTransaction.READ_WRITE);

//       console.log('blob', blob);

//       // Put the blob into the dabase
//       let put = transaction.objectStore('elephants').put(blob, 'image');

//       // Retrieve the file that was just stored
//       transaction.objectStore('elephants').get('image').onsuccess = function (event) {
//         let imgFile = event.target.result;
//         console.log('Got elephant!' + imgFile);

//         // Get window.URL object
//         let URL = window.URL || window.webkitURL;

//         // Create and revoke ObjectURL
//         let imgURL = URL.createObjectURL(imgFile);

//         // Set img src to ObjectURL
//         let imgElephant = document.getElementById('elephant');
//         imgElephant.setAttribute('src', imgURL);

//         // Revoking ObjectURL
//         URL.revokeObjectURL(imgURL);
//       };
//     };

//   request.onerror = function (event) {
//     console.log('Error creating/accessing IndexedDB database');
//   };

//   request.onsuccess = function (event) {
//     console.log('Success creating/accessing IndexedDB database');
//     db = request.result;

//     db.onerror = function (event) {
//       console.log('Error creating/accessing IndexedDB database');
//     };

//     // Interim solution for Google Chrome to create an objectStore. Will be deprecated
//     if (db.setVersion) {
//       if (db.version != dbVersion) {
//         let setVersion = db.setVersion(dbVersion);
//         setVersion.onsuccess = function () {
//           createObjectStore(db);
//           getImageFile();
//         };
//       }
//       else {
//         getImageFile();
//       }
//     }
//     else {
//       getImageFile();
//     }
//   };

//   // For future use. Currently only in latest Firefox versions
//   request.onupgradeneeded = function (event) {
//     createObjectStore(event.target.result);
//   };
// })();

