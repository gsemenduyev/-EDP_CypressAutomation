/* 
Reads Text file from Stores Files
 Accepts - parameter filename 
 Returns - text from file
**/ 
function readStoreTxtFile(fileName){
  try {
    var filePath = Project.Path + "\\Stores\\Files\\" + fileName;
    var fileText = aqFile.ReadWholeTextFile(filePath, aqFile.ctANSI);
    Log.Message(fileText + "-Environment set up by Cypress test.");
    return fileText;
  } catch (e) {
    Log.Error("An error occurred: " + e.message);
  }
}

/* 
Writes to Text file from Stores Files
 Accepts - parameter filename, content
 **/
function writeStoreTxtFile(fileName, content) {
  try {
    var filePath = Project.Path + "Stores\\Files\\" + fileName;
    var file = aqFile.OpenTextFile(filePath, aqFile.faWrite, aqFile.ctANSI);
    file.Write(content);
    file.Close();
    Log.Message(content + "-Estimate Number written to Store file: " + fileName);
  } catch (e) {
    Log.Error("An error occurred: " + e.message);
  }
}