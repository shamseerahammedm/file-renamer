import Dexie from 'dexie';

export class dataBase extends Dexie
{

  file: Dexie.Table<file, number>;
  folder: Dexie.Table<folder, number>;

  constructor(databaseName : string)
  {
    super(databaseName);

    this.version(1).stores({
      file: '++fileId, extension, fileBlob',
      folder: '++folderId, folderName, numberOfFiles, files, folderType',
      // fileMetaDetails: '++fileMetaDetailsId, imageSrcUrl'
    });

    // The following lines are needed for it to work across typescipt using babel-preset-typescript:
    this.file = this.table('file'); 
    this.folder = this.table('folder'); 

  }
}

export interface file
{
  fileId?: number; // Primary key. Optional (autoincremented)
  extension: string; 
  fileBlob: Blob; 
  imageSrcUrl : string; 
  isImage : Boolean;
}

export interface folder
{
  folderId?: number; // Primary key. Optional (autoincremented)
  numberOfFiles: number; 
  files: Array<Blob>;
  folderName : string
  folderType : string
}
