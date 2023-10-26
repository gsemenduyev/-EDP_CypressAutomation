package com.sbms.pages;

import com.sbms.utils.WinDriverUtils;
import io.appium.java_client.windows.WindowsDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.junit.Assert.assertEquals;

public class ScheduleStatusPage {
    WindowsDriver driver = WinDriverUtils.getWinDriver();
    public ScheduleStatusPage() {PageFactory.initElements(driver, this);}

    @FindBy(name = "Agency:")
    private WebElement agencyFilterTextBox;
    public WebElement getAgencyFilterTextBox() { return agencyFilterTextBox; }

    @FindBy(name = "Office:")
    private WebElement officeFilterTextBox;
    public WebElement getOfficeFilterTextBox() { return officeFilterTextBox; }

    @FindBy(name = "Estimate:")
    private WebElement estimateFilterTextBox;
    public WebElement getEstimateFilterTextBox() { return estimateFilterTextBox; }

    @FindBy(name = "Client:")
    private WebElement clientFilterTextBox;
    public WebElement getClientFilterTextBox() { return clientFilterTextBox; }

    @FindBy(name = "Search")
    private WebElement searchButton;
    public WebElement getSearchButton() { return searchButton; }


    public void sendText(WebElement element, String text) {
        WebDriverWait wait = new WebDriverWait(driver, 20);
        for(int i = 0; i < text.length(); i++){
            element.sendKeys(text.charAt(i)+"");
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            if (!driver.findElements(By.name(text)).isEmpty()){
                break;
            }
        }
       wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.name(text))));
        if(!driver.findElements(By.name(" Schedule Status")).isEmpty()){
           wait.until(ExpectedConditions.numberOfElementsToBeLessThan(By.name(" Schedule Status"), 1));
        }
    }

}


