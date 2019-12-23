import fs from "fs";
import path from "path";

export default class FileHandler {
  filepath: string;

  constructor(filepath: string) {
    this.filepath = filepath;
    this.createFile(this.filepath);
  }

  private createFile(filename: string) {
    fs.open(filename, "r", function(err, fd) {
      if (err) {
        fs.writeFile(filename, "", function(err) {
          if (err) {
            console.log(err);
          }
          console.log("The file was saved!");
        });
      } else {
        console.log("The file exists!");
      }
    });
  }

  readFile = function() {
    var rawFileData = require(path.join("../", this.filepath));
    return rawFileData;
  };

  writeFile=function(content){
    fs.writeFile(this.filepath, JSON.stringify(content, null, 4), (err) => {
      if (err) {
          console.error(err);
          return;
      };
      console.log("File has been created");
  });
  }
}
