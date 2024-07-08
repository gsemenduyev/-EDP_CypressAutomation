function WaitForElement(objectIdentifier, elementName, timeout) {
  let element = null;
  let startTime = new Date();

  while (element === null && (new Date() - startTime) < timeout) {
    try {
      element = Sys.Process("SBMSNET").find(objectIdentifier, elementName, 30);
      if (element.Exists && element.VisibleOnScreen) {
        // Element found and visible on screen, exit the loop
        break;
      }
      element = null; // Reset element if not visible
    } catch (e) {
      // Element not found yet, continue waiting
      Delay(500); // Adjust the delay as needed
    }
  }
  if (element === null) {
    Log.Error(`Timeout: Element '${elementName}' not found within the specified timeout or not visible on screen.`);
  }

  return element;
}