# Phase 1 Pipeline Description

## Overview

In this phase of our CI/CD pipeline, we have experimented with various different ideas and frameworks to potentially implement in our CI/CD pipeline. Below is a synopsis of some current implementations as well as planned functionalities

## Current Implementation

**Github Actions**
- Created a GitHub Actions workflow file for automating push and pll requests in our pipeline

**Linting for Code Consistency**
- Implemented ESLint to enforce code style rules and maintain consistency in the source code

**Manual Human Review of Pull Requests**
- Devised a code review process with PRs on GitHub, with a minimum of two reviewers for each PR


## Planned Functionalities
**Unit Testing with Jest**
- Plan to implement unit tests with Jest to validate the functionality of our journal components
- Automate Jest configuration as part of the CI/CD pipeline

**Automated Code Documentation with JSDocs**
- Using JSDoc for automated code documentation generation
- Integrate into pipeline to automatically updat documentation

## Diagram
- (Phase 1 Pipeline Diagram)[admin/cipipeline/phase1.png]

## Conclusion
Our CI/CD pipeline will integrate tools like ESLint and Jest, apply them using Github Actions to enhance code quality and streamline development processes. We plan to do some further enchancement by adding unit testing with Jest and do automated documentation with JSDoc, which will further support our commitment to maintainability and efficient workflow management.
