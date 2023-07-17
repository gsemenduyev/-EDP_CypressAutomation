/// <reference types="Cypress" />
/// <reference types="cypress-data-session" />
import 'cypress-data-session'
import {  Given } from "@badeball/cypress-cucumber-preprocessor";
import EnvUtils from "../../support/utils/EnvUtils";
//E2E\Eleven\cypress\support\utils\EnvUtils11.js
const envUtils = new EnvUtils;

Given('Launch 11 url login into 11', string => {
    //cy.visit("https://www.11orders.com");
    cy.visit(envUtils.getelevenUrl());
    cy.screenshot();
})