package com.sbms.pages;

import com.sbms.utils.WinDriverUtils;
import io.appium.java_client.windows.WindowsDriver;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class SchedulingPage {
    WindowsDriver<?> driver = WinDriverUtils.getWinDriver();
    Actions actions = new Actions(driver);

    public SchedulingPage() {
        PageFactory.initElements(driver, this);
    }

    @FindBy(xpath = "//Pane[@AutomationId='cmbEstimate']/Edit[starts-with(@ClassName,'WindowsForms10')]")
    private WebElement estimateTextBox;

    public WebElement getEstimateTextBox() {
        return estimateTextBox;
    }

    @FindBy(name = "Description:")
    private WebElement descriptionTextBox;

    public WebElement getDescriptionTextBox() {
        return descriptionTextBox;
    }

    @FindBy(name = "New")
    private WebElement newStationButton;

    public WebElement getNewStationButton() {
        return newStationButton;
    }

    @FindBy(name = "Station/System:")
    private WebElement newStationWindowStationTextBox;

    public WebElement getNewStationWindowStationTextBox() {
        return newStationWindowStationTextBox;
    }

    @FindBy(name = "Add")
    private WebElement newStationWindowAddButton;

    public WebElement getNewStationWindowAddButton() {
        return newStationWindowAddButton;
    }

    @FindBy(name = "Close")
    private WebElement newStationWindowCloseButton;

    public WebElement getNewStationWindowCloseButton() {
        return newStationWindowCloseButton;
    }

    @FindBy(xpath = "//Edit[@AutomationId='ddcStation']")
    private WebElement stationTextBox;

    public WebElement getStationTextBox() {
        return stationTextBox;
    }

    @FindBy(name = "Search")
    private WebElement searchButton;

    public WebElement getSearchButton() {
        return searchButton;
    }

    public void sendKeysScheduleDaysCell(String text) {
        actions.moveToElement(getNewStationButton(), -200, 80).doubleClick().sendKeys(text).build().perform();
    }

    public void sendKeysScheduleStartTimeCell(String text) {
        actions.moveToElement(getNewStationButton(), -100, 80).doubleClick().sendKeys(text).build().perform();
    }

    public void sendKeysScheduleEndTimeCell(String text) {
        actions.moveToElement(getNewStationButton(), -50, 80).doubleClick().sendKeys(text).build().perform();
    }

    public void sendKeysScheduleDPCell(String text) {
        actions.moveToElement(getNewStationButton(), 50, 80).doubleClick().sendKeys(text).build().perform();
    }

    public void sendKeysScheduleGrossRateCell(String text) {
        actions.moveToElement(getNewStationButton(), 100, 80).doubleClick()
                .sendKeys(Keys.chord(Keys.CONTROL, "a", Keys.DELETE), text).build().perform();
    }

    public void sendKeysScheduleFirstWeekCell(String text) {
        actions.moveToElement(getNewStationButton(), 520, 80).doubleClick()
                .sendKeys(Keys.chord(Keys.CONTROL, "a", Keys.DELETE), text).build().perform();
    }

    public void sendKeysScheduleSecondWeekCell(String text) {
        actions.moveToElement(getNewStationButton(), 550, 80).doubleClick()
                .sendKeys(Keys.chord(Keys.CONTROL, "a", Keys.DELETE), text).build().perform();
    }

    public WebElement getCloseButton() {
        return driver.findElementByAccessibilityId("btnClose");
    }

}
