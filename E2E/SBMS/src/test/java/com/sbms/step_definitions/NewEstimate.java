package com.sbms.step_definitions;

import com.sbms.utils.WinDriverUtils;
import io.cucumber.java.en.Given;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;

import java.io.IOException;
import java.util.Set;

public class NewEstimate {

   // private static final WebDriver driver = WinDriverUtils.getWinDriver();

    @Given("Launch SBMS")
    public void launch_view() throws InterruptedException, IOException {
        Thread.sleep(10000);
        WinDriverUtils.getWinDriver().findElement(By.xpath("//Edit[@AutomationId='txtUserName']")).sendKeys("admins");
        System.out.println(WinDriverUtils.getWinDriver().getTitle());
        String originalWindow = WinDriverUtils.getWinDriver().getWindowHandle();


        WinDriverUtils.getWinDriver().findElement(By.name("OK")).click();
        Thread.sleep(10000);
        Set<String> wind = WinDriverUtils.getWinDriver().getWindowHandles();
        for (String a : wind) {
            if (!a.equals(originalWindow)) {
                WinDriverUtils.getWinDriver().switchTo().window(a);
            }
        }

    }

    @Given("Click on Buy button")
    public void click_on_buy_button(){
        WinDriverUtils.getWinDriver().findElement(By.name("Buy")).click();
    }

    @Given("Click on Estimates and Goals button")
    public void click_on_estimates_and_goals_button(){
        Actions act = new Actions(WinDriverUtils.getWinDriver());
        WebElement ele = WinDriverUtils.getWinDriver().findElement(By.name("Estimates and Goals"));
        act.doubleClick(ele).perform();
        System.out.println(WinDriverUtils.getWinDriver().getTitle());
    }
    @Given("Close SBMS")
    public void close_SBMS() throws InterruptedException {
//        Thread.sleep(5000);
        System.out.println("Close SBMS");
//        WinDriverUtils.getWinDriver().findElement(By.name("File")).click();
//        WinDriverUtils.getWinDriver().findElement(By.name("Exit SBMS")).click();
    }










}
