package com.sbms.pages;

import com.sbms.utils.WinDriverUtils;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class EstimatePage {
    public EstimatePage() { PageFactory.initElements(WinDriverUtils.getWinDriver(), this); }
    @FindBy(xpath = "//Pane[@Name='Agency Name:'][@AutomationId='cmbCompany']/Edit[starts-with(@ClassName,'WindowsForms10')]")
    private WebElement agencyNameTextBox;
    public WebElement getAgencyNameTextBox() {
        return agencyNameTextBox;
    }

    @FindBy(xpath = "//Pane[@Name='Office Name:'][@AutomationId='cmbOffice']/Edit[starts-with(@ClassName,'WindowsForms10')]")
    private WebElement officeNameTextBox;
    public WebElement getOfficeNameTextBox() {
        return officeNameTextBox;
    }

    @FindBy(xpath = "//Pane[@Name='Client Name:'][@AutomationId='cmbClient']/Edit[starts-with(@ClassName,'WindowsForms10')]")
    private WebElement clientNameTextBox;
    public WebElement getClientNameTextBox() {
        return clientNameTextBox;
    }

    @FindBy(name = "New")
    private WebElement newButton;
    public WebElement getNewButton() {
        return newButton;
    }

    @FindBy(xpath = "//Edit[@Name='Estimate Description:'][@AutomationId='txtDescription']")
    private WebElement estimateDescriptionTextBox;
    public WebElement getEstimateDescriptionTextBox() {
        return estimateDescriptionTextBox;
    }

    @FindBy(xpath = "//Pane[@Name='Media Name:'][@AutomationId='cmbMedia']/Edit[starts-with(@ClassName,'WindowsForms10')]")
    private WebElement mediaNameTextBox;
    public WebElement getMediaNameTextBox() {
        return mediaNameTextBox;
    }

    @FindBy(xpath = "//Pane[@Name='Product Name:'][@AutomationId='cmbProduct']/Edit[starts-with(@ClassName,'WindowsForms10')]")
    private WebElement productNameTextBox;
    public WebElement getProductNameTextBox() {
        return productNameTextBox;
    }

    @FindBy(xpath = "//Pane[@Name='Estimate Group:'][@AutomationId='cmbEstimateGroup']/Edit[starts-with(@ClassName,'WindowsForms10')]")
    private WebElement estimateGroupTextBox;
    public WebElement getEstimateGroupTextBox() {
        return estimateGroupTextBox;
    }

    @FindBy(xpath = "//Pane[@Name='Daypart Group:'][@AutomationId='cmbDaypartGroup']/Edit[starts-with(@ClassName,'WindowsForms10')]")
    private WebElement daypartGroupTextBox;
    public WebElement getDaypartGroupTextBox() {
        return daypartGroupTextBox;
    }

    @FindBy(xpath = "//Pane[@Name='Primary Demo:'][@AutomationId='cmbPrimaryDemo']/Edit[starts-with(@ClassName,'WindowsForms10')]")
    private WebElement primaryDemoTextBox;
    public WebElement getPrimaryDemoTextBox() {
        return primaryDemoTextBox;
    }

    @FindBy(xpath = "//Edit[@Name='Start Date:'][@AutomationId='txtFlightStartDate']")
    private WebElement startDateTextBox;
    public WebElement getStartDateTextBox() {
        return startDateTextBox;
    }

    @FindBy(xpath = "//Edit[@Name='End Date:'][@AutomationId='txtFlightEndDate']")
    private WebElement endDateTextBox;
    public WebElement getEndDateTextBox() {
        return endDateTextBox;
    }

    @FindBy(name = "Save")
    private WebElement saveButton;
    public WebElement getSaveButton() {
        return saveButton;
    }

    @FindBy(name = "Add Markets")
    private WebElement addMarketsButton;
    public WebElement getAddMarketsButton() {
        return addMarketsButton;
    }

    @FindBy(xpath = "//Button[@Name='Close'][@AutomationId='btnClose']")
    private WebElement closeButton;
    public WebElement getCloseButton() {
        return closeButton;
    }




}
