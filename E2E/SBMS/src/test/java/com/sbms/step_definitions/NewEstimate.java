package com.sbms.step_definitions;

import com.sbms.pages.EstimatePage;
import com.sbms.pages.LoginWindow;
import com.sbms.pages.MainPage;
import com.sbms.utils.WinDriverUtils;
import io.appium.java_client.windows.WindowsElement;
import io.cucumber.java.en.Given;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class NewEstimate {

    WebDriver driver = WinDriverUtils.getWinDriver();
    LoginWindow loginWindow = new LoginWindow();
    MainPage mainPage = new MainPage();
    EstimatePage estimatePage = new EstimatePage();
    WebDriverWait wait = new WebDriverWait(driver, 10);

    String estimateName;

    @Given("Launch SBMS")
    public void launch_SBMS() throws InterruptedException, IOException {

        wait.until(ExpectedConditions.elementToBeClickable(loginWindow.getUserNameTextBox())).sendKeys("admins");
        assertEquals("Verify login window title", " SBMS Log In", driver.getTitle());
        String loginWindowHandle = driver.getWindowHandle();
        Thread.sleep(5000);
        wait.until(ExpectedConditions.elementToBeClickable(loginWindow.getOkButton())).click();

        for (int i = 0; i < 60; i++) {
            Set<String> windowHandles = driver.getWindowHandles();
            if (!windowHandles.isEmpty()) {
                for (String window : windowHandles) {
                    if (!window.equals(loginWindowHandle)) {
                        driver.switchTo().window(window);
                    }
                }
                break;
            } else {
                Thread.sleep(1000);
            }
        }
        assertTrue("Verify SBMS main page title - '" +  driver.getTitle() + "' should contain 'SBMS for ", driver.getTitle().contains("SBMS for"));
    }

    @Given("Navigate to Estimate Information page")
    public void navigate_to_estimate_information_page() {
        wait.until(ExpectedConditions.elementToBeClickable(mainPage.getSpotButton())).click();
        wait.until(ExpectedConditions.elementToBeClickable(mainPage.getBuyButton())).click();
        Actions act = new Actions(driver);
        WebElement ele = wait.until(ExpectedConditions.elementToBeClickable(mainPage.getEstimatesAndGoalsButton()));
        act.doubleClick(ele).perform();
        assertEquals(" SBMS for Spot", driver.getTitle());
    }

    @Given("Create Estimate header")
    public void create_estimate_header() throws InterruptedException {
        wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getAgencyNameTextBox())).sendKeys("ABC Agency");
        wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getOfficeNameTextBox())).sendKeys("ABC Agency Office");
        wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getClientNameTextBox())).sendKeys("ABC Client");
        wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getNewButton())).click();
        wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getEstimateDescriptionTextBox())).sendKeys("GS Automation Description");
        wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getMediaNameTextBox())).sendKeys("Radio");
        wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getProductNameTextBox())).sendKeys("ABC Product");
        wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getEstimateGroupTextBox())).sendKeys("General");
        wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getDaypartGroupTextBox())).sendKeys("Radio");
        wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getPrimaryDemoTextBox())).sendKeys("Adults 18-54");
        wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getStartDateTextBox())).sendKeys("10/16/2023");
        wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getEndDateTextBox())).sendKeys("10/29/2023");
        wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getSaveButton())).click();

        // wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//Pane[@Name='Estimate #:'][@AutomationId='cmbEstimate']/Edit[starts-with(@ClassName,'WindowsForms10')]")))).sendKeys("8895", Keys.ENTER);

    //    wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.name("Goals...")))).click();
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//Edit[@Name='Estimate #:'][@AutomationId='txtEstimate']"))));
        estimateName = wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//Edit[@Name='Estimate #:'][@AutomationId='txtEstimate']")))).getText();
        assertEquals("Verify SBMS Estimate Goals page title", " SBMS for Spot - [Estimate Information - Estimate Goals]", driver.getTitle());
        wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getAddMarketsButton())).click();

        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.name("Akron")))).click();


        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.name("Select >>")))).click();
        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.name("OK")))).click();
        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.name("Save")))).click();
        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//Button[@Name='Close'][@AutomationId='btnClose']")))).click();
        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//Button[@Name='Close'][@AutomationId='btnClose']")))).click();

    }

    @Given("Navigate to Scheduling page")
    public void navigate_to_scheduling_page() throws InterruptedException {
        wait.until(ExpectedConditions.elementToBeClickable(mainPage.getSpotButton())).click();
        wait.until(ExpectedConditions.elementToBeClickable(mainPage.getBuyButton())).click();
        Actions actions = new Actions(driver);
        WebElement element = wait.until(ExpectedConditions.elementToBeClickable(mainPage.getSchedulingButton()));
        actions.doubleClick(element).perform();System.out.println(driver.getTitle());
        System.out.println("-"+estimateName.substring(1, 5)+"-");
        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath(
                "//Pane[@AutomationId='cmbEstimate']/Edit[starts-with(@ClassName,'WindowsForms10')]"))))
                .sendKeys(estimateName.substring(1, 5), Keys.ENTER);


        // Add Station
        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.name("New")))).click();
        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.name("Station/System:")))).sendKeys("WTMX-FM");
        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.name("Add")))).click();
        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.name("Close")))).click();



        wait.until(ExpectedConditions.visibilityOf(driver.findElement(
                By.xpath("//Edit[@AutomationId='ddcStation']")))).sendKeys("WTMX-FM", Keys.ENTER);

//        actions.moveToElement(wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.name("Station/System:")))));
//        actions.moveByOffset(50, 15).click().build().perform();
//        actions.moveToElement(wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.name("Station/System:")))));
//        actions.moveByOffset(0, -30).click().build().perform();
//        Thread.sleep(1000);


        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.name("Search")))).click();

//        Thread.sleep(1500);
//        if (driver.findElement(By.xpath("//Button[@ClassName='Button'][@Name='OK']")).isDisplayed()) {
//            driver.findElement(By.xpath("//Button[@ClassName='Button'][@Name='OK']")).click();
//        }

//        wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//Pane[@AutomationId='fgSchedule']")))).click();
        Thread.sleep(1000);
        actions.moveToElement(wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//Pane[@AutomationId='fgSchedule']")))));
        actions.moveByOffset(-950, -300).doubleClick().build().perform();
        actions.moveToElement(wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.xpath("//Pane[@AutomationId='fgSchedule']")))));

        actions.moveByOffset(-750, -300).doubleClick().build().perform();


//        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//Pane[@AutomationId='SplitContainerMain']/Pane[starts-with(@ClassName,'WindowsForms10')]/Pane[@AutomationId='fgSchedule']/Edit[starts-with(@ClassName,'WindowsForms10')]"))))
//                .sendKeys(Keys.chord("M-F"), Keys.ENTER, Keys.chord("8:00AM"), Keys.ENTER, Keys.chord("10:00am"), Keys.ENTER, Keys.chord("AM"));

//        actions.moveByOffset(200, 0).click().build().perform();
//
//        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//Pane[@AutomationId='fgSchedule']"))))
//                .sendKeys(Keys.chord("2000"), Keys.TAB, Keys.TAB, Keys.TAB,Keys.TAB,Keys.TAB,Keys.TAB,Keys.chord("1"), Keys.TAB, Keys.chord("1"), Keys.ENTER);
//


        //Pane[@AutomationId='fgSchedule']/ComboBox[starts-with(@ClassName,'WindowsForms10')]
//        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//Pane[@AutomationId='SplitContainerMain']/Pane[starts-with(@ClassName,'WindowsForms10')]/Pane[@AutomationId='fgSchedule']/Edit[starts-with(@ClassName,'WindowsForms10')]"))))
//                .sendKeys(Keys.ENTER,Keys.chord("1000"), Keys.ENTER, Keys.ENTER, Keys.ENTER,Keys.ENTER,Keys.ENTER,Keys.ENTER,Keys.chord("1"), Keys.ENTER, Keys.chord("1"), Keys.ENTER);
////                Keys.chord("1"), Keys.ENTER, Keys.chord("1"), Keys.ENTER););
//                ,Keys.chord("AM"), Keys.ARROW_RIGHT, Keys.chord("1000"), Keys.ENTER, Keys.ENTER, Keys.ENTER,Keys.ENTER,Keys.ENTER,Keys.ENTER,
//                Keys.chord("1"), Keys.ENTER, Keys.chord("1"), Keys.ENTER);

        //Pane[@AutomationId='SplitContainerMain']/Pane[starts-with(@ClassName,'WindowsForms10')]/Pane[@AutomationId='fgSchedule']/Edit[starts-with(@ClassName,'WindowsForms10')]
//        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//Pane[@AutomationId='SplitContainerMain']/Pane[starts-with(@ClassName,'WindowsForms10')]/Pane[@AutomationId='fgSchedule']/Edit[starts-with(@ClassName,'WindowsForms10')]")))).sendKeys("8:00AM", Keys.TAB);
//        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//Pane[@AutomationId='SplitContainerMain']/Pane[starts-with(@ClassName,'WindowsForms10')]/Pane[@AutomationId='fgSchedule']/Edit[starts-with(@ClassName,'WindowsForms10')]")))).sendKeys("10:00am", Keys.TAB);
//        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//Pane[@AutomationId='SplitContainerMain']/Pane[starts-with(@ClassName,'WindowsForms10')]/Pane[@AutomationId='fgSchedule']/Edit[starts-with(@ClassName,'WindowsForms10')]")))).sendKeys("AM", Keys.TAB);
//        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//Pane[@AutomationId='SplitContainerMain']/Pane[starts-with(@ClassName,'WindowsForms10')]/Pane[@AutomationId='fgSchedule']/Edit[starts-with(@ClassName,'WindowsForms10')]")))).sendKeys("1000", Keys.TAB);
//        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//Pane[@AutomationId='SplitContainerMain']/Pane[starts-with(@ClassName,'WindowsForms10')]/Pane[@AutomationId='fgSchedule']/Edit[starts-with(@ClassName,'WindowsForms10')]")))).sendKeys( Keys.TAB);
//        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//Pane[@AutomationId='SplitContainerMain']/Pane[starts-with(@ClassName,'WindowsForms10')]/Pane[@AutomationId='fgSchedule']/Edit[starts-with(@ClassName,'WindowsForms10')]")))).sendKeys( Keys.TAB);
//        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//Pane[@AutomationId='SplitContainerMain']/Pane[starts-with(@ClassName,'WindowsForms10')]/Pane[@AutomationId='fgSchedule']/Edit[starts-with(@ClassName,'WindowsForms10')]")))).sendKeys( Keys.TAB);
//        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//Pane[@AutomationId='SplitContainerMain']/Pane[starts-with(@ClassName,'WindowsForms10')]/Pane[@AutomationId='fgSchedule']/Edit[starts-with(@ClassName,'WindowsForms10')]")))).sendKeys( Keys.TAB);
//        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//Pane[@AutomationId='SplitContainerMain']/Pane[starts-with(@ClassName,'WindowsForms10')]/Pane[@AutomationId='fgSchedule']/Edit[starts-with(@ClassName,'WindowsForms10')]")))).sendKeys( Keys.TAB);
//        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//Pane[@AutomationId='SplitContainerMain']/Pane[starts-with(@ClassName,'WindowsForms10')]/Pane[@AutomationId='fgSchedule']/Edit[starts-with(@ClassName,'WindowsForms10')]")))).sendKeys( "1", Keys.TAB);
//        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//Pane[@AutomationId='SplitContainerMain']/Pane[starts-with(@ClassName,'WindowsForms10')]/Pane[@AutomationId='fgSchedule']/Edit[starts-with(@ClassName,'WindowsForms10')]")))).sendKeys( "1", Keys.TAB);


    }

    @Given("Test")
    public void test() throws InterruptedException {
        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath(
                        "//Pane[@AutomationId='cmbEstimate']/Edit[starts-with(@ClassName,'WindowsForms10')]"))))
                .sendKeys("8909", Keys.ENTER);
        Thread.sleep(15000);
    }
}
