package com.sbms.utils;

import io.appium.java_client.windows.WindowsDriver;
import io.appium.java_client.windows.WindowsElement;

import org.apache.poi.ss.formula.functions.T;
import org.openqa.selenium.remote.DesiredCapabilities;
import java.awt.*;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static java.lang.Integer.parseInt;

public class WinDriverUtils {

    private static WindowsDriver<WindowsElement> winDriver;

    public static WindowsDriver getWinDriver() {
        if (winDriver == null) {

            try {
                Thread.sleep(500);
                DesiredCapabilities capabilities = new DesiredCapabilities();
                capabilities.setCapability("app", ConfigsReaderUtils.getProperty("SBMS_Path"));
                winDriver = new WindowsDriver<>(new URL("http://127.0.0.1:4723"), capabilities);
                winDriver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);

            } catch (Exception e) {
                try {
                    DesiredCapabilities capability = new DesiredCapabilities();

                    capability.setCapability("ms:experimental-webdriver", true);
                    capability.setCapability("app", "Root");
                    capability.setCapability("platformName", "Windows");
                    capability.setCapability("deviceName", "Windows10Machine");
                    winDriver = new WindowsDriver<>(new URL("http://127.0.0.1:4723"), capability);

                    WindowsElement windowsElement = null;
                    for (int i = 0; i < 300; i++) {
                        List<WindowsElement> elements = winDriver
                                .findElementsByName(ConfigsReaderUtils.getProperty("SBMS_Page"));
                        // List<WindowsElement> elements =
                        // winDriver.findElementsByXPath("//*[contains(@Name,'" +
                        // ConfigsReaderUtils.getProperty("SBMS_Page") + "')]");

                        if (elements.isEmpty()) {
                            Thread.sleep(1000);
                        } else {
                            System.out.println("Connecting to open Desktop app");
                            windowsElement = elements.get(0);
                            break;
                        }
                    }

                    assert windowsElement != null;
                    String tempWindowHandle = windowsElement.getAttribute("NativeWindowHandle");
                    int num = parseInt(tempWindowHandle);
                    String topLevelWindowHandle1 = Integer.toHexString(num);
                    System.out.println("topLevelWindowHandle1 ----- " + topLevelWindowHandle1);
                    DesiredCapabilities capability1 = new DesiredCapabilities();

                    capability1.setCapability("deviceName", "WindowsPC");
                    capability1.setCapability("appTopLevelWindow", topLevelWindowHandle1);
                    winDriver = new WindowsDriver<>(new URL("http://127.0.0.1:4723"), capability1);
                    winDriver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);

                } catch (MalformedURLException | InterruptedException malformedURLException) {
                    throw new RuntimeException(malformedURLException);
                }
            }
        }
        return winDriver;
    }

    public static void closeWinDriver() {
        if (winDriver != null) {
            winDriver.quit();
            winDriver = null;
        }
    }

    public static void start() {
        try {
            Desktop desktop = Desktop.getDesktop();
            File file = new File(ConfigsReaderUtils.getProperty("WinAppDriver_Path"));
            /* Check if there is support for Desktop or not */
            if (!Desktop.isDesktopSupported()) {
                System.out.println("not supported");
                return;
            }

            if (file.exists()) {
                System.out.println("Open WinAppDriver.exe\n");
                desktop.open(file);
            }
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Encountered Exception\n");
            throw new RuntimeException(e);
        }
    }

    public static void stop() {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("taskkill ", "/f", "/IM", "WinAppDriver.exe");
            processBuilder.start();
            winDriver = null;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    private static WindowsDriver<WindowsElement> openWinDriver;

    public static WindowsDriver<WindowsElement> getOpenAppWinDriver() {

        if (openWinDriver == null) {
            try {
                DesiredCapabilities capability = new DesiredCapabilities();

                capability.setCapability("ms:experimental-webdriver", true);
                capability.setCapability("app", "Root");
                capability.setCapability("platformName", "Windows");
                capability.setCapability("deviceName", "Windows10Machine");
                openWinDriver = new WindowsDriver<>(new URL("http://127.0.0.1:4723"), capability);

                WindowsElement windowsElement = openWinDriver
                        .findElementByXPath("//*[starts-with(@Name,' SBMS for Spot')]");
                String tempWindowHandle = windowsElement.getAttribute("NativeWindowHandle");
                int num = parseInt(tempWindowHandle);
                String topLevelWindowHandle1 = Integer.toHexString(num);

                DesiredCapabilities capability1 = new DesiredCapabilities();

                capability1.setCapability("deviceName", "WindowsPC");
                capability1.setCapability("appTopLevelWindow", topLevelWindowHandle1);
                openWinDriver = new WindowsDriver<>(new URL("http://127.0.0.1:4723"), capability1);
                openWinDriver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
                openWinDriver.manage().window().maximize();
            } catch (MalformedURLException e) {
                throw new RuntimeException(e);
            }
        }

        return openWinDriver;
    }

    // public static void main(String[] args) throws IOException {
    //     FileWriter fw = new FileWriter("src\\test\\resources\\test_parameters\\new_estimate.txt");
    //     fw.write("Hello, world!");
    //     fw.close();
    // }
}
