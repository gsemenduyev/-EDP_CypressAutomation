package com.sbms.pages;

import com.sbms.utils.WinDriverUtils;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class MainPage {
    public MainPage() { PageFactory.initElements(WinDriverUtils.getWinDriver(), this); }

    @FindBy(name = "Spot")
    private WebElement spotButton;
    public WebElement getSpotButton() {
        return spotButton;
    }

    @FindBy(name = "Estimates and Goals")
    private WebElement estimatesAndGoalsButton;
    public WebElement getEstimatesAndGoalsButton() {
        return estimatesAndGoalsButton;
    }

    @FindBy(name = "Buy")
    private WebElement buyButton;
    public WebElement getBuyButton() { return buyButton; }

    @FindBy(name = "Scheduling")
    private WebElement schedulingButton;
    public WebElement getSchedulingButton() { return schedulingButton; }
}
