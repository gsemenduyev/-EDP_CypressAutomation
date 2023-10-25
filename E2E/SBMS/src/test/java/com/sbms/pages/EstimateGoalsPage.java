package com.sbms.pages;

import com.sbms.utils.WinDriverUtils;
import io.appium.java_client.pagefactory.WindowsFindBy;
import io.appium.java_client.windows.WindowsDriver;
import io.appium.java_client.windows.WindowsElement;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class EstimateGoalsPage {
    public EstimateGoalsPage() { PageFactory.initElements(WinDriverUtils.getWinDriver(), this); }

    WindowsDriver driver = WinDriverUtils.getWinDriver();
    @FindBy(xpath = "//Edit[@Name='Estimate #:'][@AutomationId='txtEstimate']")
    private WebElement estimateNameTextBox;
    public WebElement getEstimateNameTextBox() {
        return estimateNameTextBox;
    }

    @FindBy(name = "Select >>")
    private WebElement addMarketsWindowSelectButton;
    public WebElement getAddMarketsWindowSelectButton() {
        return addMarketsWindowSelectButton;
    }

    @FindBy(name = "OK")
    private WebElement addMarketsWindowOkButton;
    public WebElement getAddMarketsWindowOkButton() {
        return addMarketsWindowOkButton;
    }

    @FindBy(name = "Save")
    private WebElement addMarketsWindowSaveButton;
    public WebElement getAddMarketsWindowSaveButton() {
        return addMarketsWindowSaveButton;
    }

    @FindBy(xpath = "//Button[@Name='Close'][@AutomationId='btnClose']")
    private WebElement closeButton;
    public WebElement getCloseButton() {
        return closeButton;
    }

    public WebElement getMarket(String market) { return driver.findElement(By.name(market)); }
}