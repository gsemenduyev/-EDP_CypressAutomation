package com.sbms.step_definitions;

import com.sbms.pages.*;
import com.sbms.utils.WinDriverUtils;
import io.appium.java_client.windows.WindowsDriver;
import io.cucumber.java.en.Given;
import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.FileWriter;
import java.io.IOException;
import java.util.Set;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class NewEstimateSteps {

        WindowsDriver driver = WinDriverUtils.getWinDriver();
        WebDriverWait wait = new WebDriverWait(driver, 30);
        LoginWindow loginWindow = new LoginWindow();
        MainPage mainPage = new MainPage();
        EstimatePage estimatePage = new EstimatePage();

        EstimateGoalsPage estimateGoalsPage = new EstimateGoalsPage();
        SchedulingPage schedulingPage = new SchedulingPage();
        ScheduleStatusPage scheduleStatusPage = new ScheduleStatusPage();
        String estimateName;

        @Given("Launch SBMS")
        public void launch_SBMS() throws InterruptedException, IOException {

                wait.until(ExpectedConditions.elementToBeClickable(loginWindow.getUserNameTextBox()))
                                .sendKeys("admins");
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
                assertTrue("Verify SBMS main page title - '" + driver.getTitle() + "' should contain 'SBMS for ",
                                driver.getTitle().contains("SBMS for"));
        }

        @Given("Navigate to Estimate Information page")
        public void navigate_to_estimate_information_page() {
                wait.until(ExpectedConditions.elementToBeClickable(mainPage.getSpotButton())).click();
                wait.until(ExpectedConditions.elementToBeClickable(mainPage.getBuyButton())).click();
                Actions act = new Actions(driver);
                WebElement ele = wait
                                .until(ExpectedConditions.elementToBeClickable(mainPage.getEstimatesAndGoalsButton()));
                act.doubleClick(ele).perform();
                assertEquals(" SBMS for Spot", driver.getTitle());
        }

        @Given("Create Estimate header")
        public void create_estimate_header() {
                wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getAgencyNameTextBox()))
                                .sendKeys("ABC Agency");
                wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getOfficeNameTextBox()))
                                .sendKeys("ABC Agency Office");
                wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getClientNameTextBox()))
                                .sendKeys("ABC Client");
                wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getNewButton())).click();
                wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getEstimateDescriptionTextBox()))
                                .sendKeys("GS Automation Description");
                wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getMediaNameTextBox()))
                                .sendKeys("Radio");
                wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getProductNameTextBox()))
                                .sendKeys("ABC Product");
                wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getEstimateGroupTextBox()))
                                .sendKeys("General");
                wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getDaypartGroupTextBox()))
                                .sendKeys("Radio");
                wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getPrimaryDemoTextBox()))
                                .sendKeys("Adults 18-54");
                wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getStartDateTextBox()))
                                .sendKeys(Keys.chord(Keys.CONTROL, "a", Keys.DELETE), "11/6/2023");
                wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getEndDateTextBox()))
                                .sendKeys(Keys.chord(Keys.CONTROL, "a", Keys.DELETE), "11/26/2023");
                wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getSaveButton())).click();

        }

        @Given("Select Estimate market")
        public void select_estimate_market() throws IOException {

                estimateName = wait.until(ExpectedConditions.visibilityOf(estimateGoalsPage.getEstimateNameTextBox()))
                                .getText();

                FileWriter fw = new FileWriter("src\\test\\resources\\test_parameters\\new_estimate.txt");
                fw.write(estimateName);
                fw.close();

                assertEquals("Verify SBMS Estimate Goals page title",
                                " SBMS for Spot - [Estimate Information - Estimate Goals]", driver.getTitle());
                wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getAddMarketsButton())).click();
                wait.until(ExpectedConditions.elementToBeClickable(estimateGoalsPage.getMarket("Akron"))).click();
                wait.until(ExpectedConditions.elementToBeClickable(estimateGoalsPage.getAddMarketsWindowSelectButton()))
                                .click();
                wait.until(ExpectedConditions.elementToBeClickable(estimateGoalsPage.getAddMarketsWindowOkButton()))
                                .click();
                wait.until(ExpectedConditions.elementToBeClickable(estimateGoalsPage.getAddMarketsWindowSaveButton()))
                                .click();
                wait.until(ExpectedConditions.elementToBeClickable(estimateGoalsPage.getCloseButton())).click();
                wait.until(ExpectedConditions.visibilityOf(estimatePage.getNewButton()));
                assertEquals("Verify SBMS Estimate Information page title", " SBMS for Spot - [Estimate Information]",
                                driver.getTitle());
                wait.until(ExpectedConditions.elementToBeClickable(estimatePage.getCloseButton())).click();

        }

        @Given("Navigate to Scheduling page")
        public void navigate_to_scheduling_page() throws InterruptedException {
                assertTrue("Verify SBMS main page title - '" + driver.getTitle() + "' should contain 'SBMS for ",
                                driver.getTitle().contains("SBMS for"));
                wait.until(ExpectedConditions.elementToBeClickable(mainPage.getSpotButton())).click();
                assertEquals("Verify SBMS for Spot page title", " SBMS for Spot", driver.getTitle());
                wait.until(ExpectedConditions.elementToBeClickable(mainPage.getBuyButton())).click();

                Actions actions = new Actions(driver);
                WebElement element = wait
                                .until(ExpectedConditions.elementToBeClickable(mainPage.getSchedulingButton()));
                actions.doubleClick(element).perform();
        }

        @Given("Create Estimate Schedule")
        public void create_estimate_schedule() throws InterruptedException {
                assertEquals("Verify SBMS for Spot Scheduling page title", " SBMS for Spot - [Scheduling]",
                                driver.getTitle());
                wait.until(ExpectedConditions.elementToBeClickable(schedulingPage.getEstimateTextBox()))
                                .sendKeys(estimateName.substring(1, 5), Keys.ENTER);
                wait.until(ExpectedConditions.textToBePresentInElement(schedulingPage.getDescriptionTextBox(),
                                "GS Automation Description"));
                // Add Station
                wait.until(ExpectedConditions.elementToBeClickable(schedulingPage.getNewStationButton())).click();
                wait.until(ExpectedConditions.elementToBeClickable(schedulingPage.getNewStationWindowStationTextBox()))
                                .sendKeys("WTMX-FM");
                wait.until(ExpectedConditions.elementToBeClickable(schedulingPage.getNewStationWindowAddButton()))
                                .click();
                wait.until(ExpectedConditions.elementToBeClickable(schedulingPage.getNewStationWindowCloseButton()))
                                .click();

                wait.until(ExpectedConditions.elementToBeClickable(schedulingPage.getStationTextBox()))
                                .sendKeys("WTMX-FM");
                wait.until(ExpectedConditions.elementToBeClickable(schedulingPage.getStationTextBox()));

                // Dimension newDimension = new Dimension(1920, 1040);
                // driver.manage().window().setSize(newDimension);

                schedulingPage.sendKeysScheduleDaysCell("M");
                schedulingPage.sendKeysScheduleStartTimeCell("10:00AM");
                schedulingPage.sendKeysScheduleEndTimeCell("11:00AM");
                schedulingPage.sendKeysScheduleDPCell("AM");
                schedulingPage.sendKeysScheduleGrossRateCell("1000");
                schedulingPage.sendKeysScheduleFirstWeekCell("8");
                schedulingPage.sendKeysScheduleSecondWeekCell("10");

                wait.until(ExpectedConditions.elementToBeClickable(schedulingPage.getCloseButton())).click();
        }

        @Given("Navigate to Schedule Status page")
        public void navigate_to_schedule_status_page() {
                assertTrue("Verify SBMS main page title - '" + driver.getTitle() + "' should contain 'SBMS for ",
                                driver.getTitle().contains("SBMS for"));
                wait.until(ExpectedConditions.elementToBeClickable(mainPage.getSpotButton())).click();
                assertEquals("Verify SBMS for Spot page title", " SBMS for Spot", driver.getTitle());
                wait.until(ExpectedConditions.elementToBeClickable(mainPage.getBuyButton())).click();

                Actions actions = new Actions(driver);
                WebElement element = wait
                                .until(ExpectedConditions.elementToBeClickable(mainPage.getScheduleStatusButton()));
                actions.doubleClick(element).perform();

                assertEquals("Verify SBMS Schedule Status page title", " SBMS for Spot - [Schedule Status]",
                                driver.getTitle());
                System.out.println(driver.getTitle());
        }

        @Given("Search for estimate in Schedule Status page")
        public void search_for_estimate_in_schedule_status_page() throws InterruptedException {
                scheduleStatusPage.sendText(scheduleStatusPage.getAgencyFilterTextBox(), "ABC Agency");
                scheduleStatusPage.sendText(scheduleStatusPage.getOfficeFilterTextBox(), "ABC Agency Office");
                wait.until(ExpectedConditions.elementToBeClickable(scheduleStatusPage.getEstimateFilterTextBox()))
                                .sendKeys(estimateName.substring(1, 5));
                wait.until(
                                ExpectedConditions.textToBePresentInElement(scheduleStatusPage.getClientFilterTextBox(),
                                                "ABC Client"));
                scheduleStatusPage.getSearchButton().click();

        }

        @Given("Send new Estimate to Eleven buyer")
        public void send_new_estimate_to_eleven_buyer() {
                scheduleStatusPage.clickBuyerNameCell();
                wait.until(ExpectedConditions.visibilityOf(scheduleStatusPage.getAddEditBuyerNameWindow()));
                scheduleStatusPage.getSelectBuyerFirstName().sendKeys(Keys.chord(Keys.CONTROL, "a", Keys.DELETE),
                                "QATest");
                scheduleStatusPage.getSelectBuyerLastName().sendKeys(Keys.chord(Keys.CONTROL, "a", Keys.DELETE),
                                "User");
                wait.until(ExpectedConditions
                                .elementToBeClickable(scheduleStatusPage.getAddEditBuyerNameWindowOkButton()))
                                .click();
                scheduleStatusPage.selectFirstRowCheckbox();
                scheduleStatusPage.getSendTosTrafficButton().click();
                wait.until(ExpectedConditions.elementToBeClickable(scheduleStatusPage.getSendTosTrafficButton()));
                // wait.until(ExpectedConditions.invisibilityOf(scheduleStatusPage.getScheduleStatusWindow()));

        }

        @Given("Test")
        public void test() throws InterruptedException {
                scheduleStatusPage.getSendTosTrafficButton().click();
                Thread.sleep(5000);
                System.out.println("Hello - " + driver.getWindowHandles().size());
                System.out.println("Hello - " + driver.findElements(By.name(" Schedule Status")).size());
                wait.until(ExpectedConditions.invisibilityOf(scheduleStatusPage.getScheduleStatusWindow()));

        }
}
