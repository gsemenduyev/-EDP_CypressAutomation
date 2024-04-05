/// <reference types="Cypress" />

import { Given } from "@badeball/cypress-cucumber-preprocessor";
import EnvUtils from "../../../support/utils/EnvUtils";


const envUtils = new EnvUtils;
let qaParam;

before(function () {
    cy.fixture('/environment/qa-param.json').then(function (data) {
        qaParam = data;
    })
})

Given('Login to Traffic as {string} user', user => {
    cy.visit(envUtils.getTrafficUrl())

});