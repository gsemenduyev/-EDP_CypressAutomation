package com.sbms.step_definitions;

import com.sbms.utils.WinDriverUtils;
import io.cucumber.java.en.Given;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;

import java.io.IOException;
import java.util.Set;

public class NewEstimate {

    WebDriver driver = WinDriverUtils.getWinDriver();

    @Given("Launch SBMS")
    public void launch_view() throws InterruptedException, IOException {
        System.out.println(driver.findElement(By.xpath("//Edit[@AutomationId='txtUserName']"))
                .isDisplayed());
        driver.findElement(By.xpath("//Edit[@AutomationId='txtUserName']")).sendKeys("admins");
        System.out.println(driver.getTitle());
        String originalWindow = driver.getWindowHandle();

        driver.findElement(By.name("OK")).click();
        for (int i = 0; i < 60; i++) {
            Set<String> wind = driver.getWindowHandles();
            if (wind.size() > 0) {
                for (String a : wind) {
                    if (!a.equals(originalWindow)) {
                        driver.switchTo().window(a);
                    }
                }
                break;
            } else {
                Thread.sleep(1000);
            }
        }
    }

    @Given("Click on Buy button")
    public void click_on_buy_button() {
        driver.findElement(By.name("Buy")).click();
    }

    @Given("Click on Estimates and Goals button")
    public void click_on_estimates_and_goals_button() {
        Actions act = new Actions(driver);
        WebElement ele = driver.findElement(By.name("Estimates and Goals"));
        act.doubleClick(ele).perform();
        Assert.assertEquals(" SBMS for Spot", driver.getTitle());
        System.out.println(driver.getTitle());
    }

    @Given("Close SBMS")
    public void close_SBMS() throws InterruptedException {
        // Thread.sleep(5000);
        System.out.println("Close SBMS");
        // WinDriverUtils.getWinDriver().findElement(By.name("File")).click();
        // WinDriverUtils.getWinDriver().findElement(By.name("Exit SBMS")).click();
    }

}
