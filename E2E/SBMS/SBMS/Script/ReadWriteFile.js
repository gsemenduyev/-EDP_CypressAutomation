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
  clearFileContent(fileName);
  try {
    var filePath = Project.Path + "\\Stores\\Files\\" + fileName;
    var file = aqFile.OpenTextFile(filePath, aqFile.faWrite, aqFile.ctANSI);
    file.Write(content);
    file.Close();
    Log.Message(content + "-Estimate Number written to Store file: " + fileName);
  } catch (e) {
    Log.Error("An error occurred: " + e.message);
  }
}


/* 
Writes to Text file from Stores Files
 Accepts - parameter filename, content
 **/
function clearFileContent(fileName) {
  var filePath = Project.Path + "\\Stores\\Files\\" + fileName;
  // Check if the file exists
  if (aqFile.Exists(filePath)) {
    try {
      // Delete the file
      aqFile.Delete(filePath);
      // Create a new empty file
      aqFile.Create(filePath);
    } catch (e) {
      Log.Error("Failed to clear file content by recreating the file: " + e.message);
    }

    // Verify the content is cleared
    var readFile = aqFile.OpenTextFile(filePath, aqFile.faRead, aqFile.ctANSI);
    var content = readFile.ReadAll();
    readFile.Close();
    if (content === "") {
      Log.Message("The file " + fileName + " content is cleared.");
    } else {
      Log.Error("The file " + fileName + " content is not cleared.");
    }
  } else {
    Log.Error("File not found: " + filePath);
  }
}


