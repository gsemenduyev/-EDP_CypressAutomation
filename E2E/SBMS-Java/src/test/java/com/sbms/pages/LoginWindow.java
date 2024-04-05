package com.sbms.pages;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import com.sbms.utils.WinDriverUtils;

public class LoginWindow {
    public LoginWindow() {
        PageFactory.initElements(WinDriverUtils.getWinDriver(), this);
    }

    @FindBy(xpath = "//Edit[@AutomationId='txtUserName']")
    private WebElement userNameTextBox;

    public WebElement getUserNameTextBox() {
        return userNameTextBox;
    }

    @FindBy(name = "OK")
    private WebElement okButton;

    public WebElement getOkButton() {
        return okButton;
    }

}
