package com.sbms.step_definitions;

import com.sbms.utils.WinDriverUtils;
import io.cucumber.java.After;
import io.cucumber.java.AfterStep;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;

import java.util.ArrayList;
import java.util.List;

public class Hooks {
    List<byte[]> screenshotsList = new ArrayList<byte[]>();
    // Launching WinAppDriver.exe"
    @Before
    public void setUp() throws InterruptedException {
        Thread.sleep(1000);
        System.out.println("Launching WinAppDriver.exe");
        WinDriverUtils.start();
    }

    @After
    public void failScenarioScreenshot(Scenario scenario) {
        if (scenario.isFailed()) {
            System.out.println("Takes Screenshot");
            byte[] screenshot = ((TakesScreenshot) WinDriverUtils.getWinDriver()).getScreenshotAs(OutputType.BYTES);
            scenario.attach(screenshot, "image/png", scenario.getName());
            WinDriverUtils.closeWinDriver();
            WinDriverUtils.stop();
        }
        for (byte[] screenshot :screenshotsList) {
            scenario.attach(screenshot, "image/png", scenario.getName());
        }
        screenshotsList.clear();
        WinDriverUtils.closeWinDriver();
        WinDriverUtils.stop();
    }

    @AfterStep
    public void afterStepScreenshot(Scenario scenario) {
        System.out.println("Takes Screenshot");
        byte[] screenshot = ((TakesScreenshot) WinDriverUtils.getWinDriver()).getScreenshotAs(OutputType.BYTES);
        screenshotsList.add(screenshot);
        scenario.attach(screenshot, "image/png", scenario.getName());
    }

//    @After(order = 1)
//    public void tearDown() {
//        WinDriverUtils.closeWinDriver();
//        WinDriverUtils.stop();
//    }
}
