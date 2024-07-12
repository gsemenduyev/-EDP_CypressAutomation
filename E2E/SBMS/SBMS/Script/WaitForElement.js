function WaitForElement(objectIdentifier, elementName, timeout) {
  let element = null;
  let startTime = new Date();

  while (element === null && (new Date() - startTime) < timeout) {
    try {
      element = Sys.Process("SBMSNET").find(objectIdentifier, elementName, 30);
      if (element.Exists && element.VisibleOnScreen) {
        break;
      }
      element = null;
    } catch (e) {
      Delay(500);
    }
  }
  if (element === null) {
    Log.Error(`Timeout: Element '${elementName}' not found within the specified timeout or not visible on screen.`);
  }

  return element;
}