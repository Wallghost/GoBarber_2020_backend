export default interface IStorageProvider {
  saveFile(filePath: string): Promise<string>;
  deleteFile(filePath: string): Promise<void>;
}
