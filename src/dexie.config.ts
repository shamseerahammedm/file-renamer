import Dexie from 'dexie';

export class dataBase extends Dexie
{

  file: Dexie.Table<file, number>;
  // fileMetaDetails: Dexie.Table<fileMetaDetails, number>;

  constructor(databaseName : string)
  {
    super(databaseName);

    //
    // Define tables and indexes
    // (Here's where the implicit table props are dynamically created)
    //
    this.version(1).stores({
      file: '++fileId, name, size, extension',
      // fileMetaDetails: '++fileMetaDetailsId, imageSrcUrl'
    });

    // The following lines are needed for it to work across typescipt using babel-preset-typescript:
    this.file = this.table('file'); 
    // this.fileMetaDetails = this.table('fileMetaDetails'); 

  }
}

// By defining the interface of table records,
// you get better type safety and code completion
export interface file
{
  fileId?: number; // Primary key. Optional (autoincremented)
  name: string; 
  size: number; 
  extension: string; 
  fileBlob: Blob; 
  lastModified : number;
  lastModifiedDate : Date;
  type : string;
}
