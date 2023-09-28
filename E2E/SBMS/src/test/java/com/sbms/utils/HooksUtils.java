package com.sbms.utils;
import io.cucumber.java.After;
import io.cucumber.java.Scenario;
import org.openqa.selenium.By;
import io.cucumber.java.Before;
public class HooksUtils {
    private static boolean isFeatureStarted = false;

    @After
    public void runScriptAfterFeature(Scenario scenario) throws InterruptedException {
        if (isFeatureStarted && scenario.isFailed()) {
            // Your script execution code goes here
            System.out.println("Running script after the feature file...");

            // Your script execution code goes here
            Thread.sleep(5000);
            WinDriverUtils.getWinDriver().findElement(By.name("File")).click();
            WinDriverUtils.getWinDriver().findElement(By.name("Exit SBMS")).click();
            System.out.println("Closing app should be after feature");
            System.out.println("Running script after the feature file...");
            WinDriverUtils.closeWinDriver();
            // You can execute any Java code or external scripts here
        }
    }

    public static void beforeFeature() {
        isFeatureStarted = true;
    }

    public static void afterFeature() {
        isFeatureStarted = true;
    }



}
