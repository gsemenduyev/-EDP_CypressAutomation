package com.sbms.pages;

import com.sbms.utils.WinDriverUtils;
import io.appium.java_client.windows.WindowsDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindAll;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ScheduleStatusPage {
    WindowsDriver driver = WinDriverUtils.getWinDriver();
    Actions actions = new Actions(driver);

    public ScheduleStatusPage() {
        PageFactory.initElements(driver, this);
    }

    @FindBy(name = "Agency:")
    private WebElement agencyFilterTextBox;

    public WebElement getAgencyFilterTextBox() {
        return agencyFilterTextBox;
    }

    @FindBy(name = "Office:")
    private WebElement officeFilterTextBox;

    public WebElement getOfficeFilterTextBox() {
        return officeFilterTextBox;
    }

    @FindBy(name = "Estimate:")
    private WebElement estimateFilterTextBox;

    public WebElement getEstimateFilterTextBox() {
        return estimateFilterTextBox;
    }

    @FindBy(name = "Client:")
    private WebElement clientFilterTextBox;

    public WebElement getClientFilterTextBox() {
        return clientFilterTextBox;
    }

    @FindBy(name = "Search")
    private WebElement searchButton;

    public WebElement getSearchButton() {
        return searchButton;
    }

    public void clickBuyerNameCell() {
        actions.moveToElement(getSearchButton(), -100, 60).click().contextClick().perform();
    }

    public void selectFirstRowCheckbox() {
        actions.moveToElement(getSearchButton(), -860, 60).click().perform();
    }

    @FindBy(name = " Add/Edit Buyer Name")
    private WebElement addEditBuyerNameWindow;

    public WebElement getAddEditBuyerNameWindow() {
        return addEditBuyerNameWindow;
    }

    @FindBy(name = "Select Buyer")
    private WebElement selectBuyerFirstName;

    public WebElement getSelectBuyerFirstName() {
        return selectBuyerFirstName;
    }

    @FindBy(name = "Buyer Last Name:")
    private WebElement selectBuyerLastName;

    public WebElement getSelectBuyerLastName() {
        return selectBuyerLastName;
    }

    @FindBy(name = "OK")
    private WebElement addEditBuyerNameWindowOkButton;

    public WebElement getAddEditBuyerNameWindowOkButton() {
        return addEditBuyerNameWindowOkButton;
    }

    @FindBy(name = "Send to sTraffic")
    private WebElement sendTosTrafficButton;

    public WebElement getSendTosTrafficButton() {
        return sendTosTrafficButton;
    }

    @FindBy(name = " Schedule Status")
    private WebElement scheduleStatusWindow;
//Name	 Schedule Status


    public WebElement getScheduleStatusWindow() {
        return scheduleStatusWindow;
    }

    public void sendText(WebElement element, String text) {
        WebDriverWait wait = new WebDriverWait(driver, 20);
        for (int i = 0; i < text.length(); i++) {
            element.sendKeys(text.charAt(i) + "");
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            if (!driver.findElements(By.name(text)).isEmpty()) {
                break;
            }
        }
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.name(text))));
        if (!driver.findElements(By.name(" Schedule Status")).isEmpty()) {
            wait.until(ExpectedConditions.numberOfElementsToBeLessThan(By.name(" Schedule Status"), 1));
        }
        
    }

}
