---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
# nav_order: 100
title: 

# These are optional elements. Feel free to remove any of them.
# status: {proposed | rejected | accepted | deprecated | … | superseded by [ADR-0005](0005-example.md)}
date: {2024-06-04 Last Updated}
deciders: {Peter, Avingha, Kane, Sierra}
# consulted: {list everyone whose opinions are sought (typically subject-matter experts); and with whom there is a two-way communication}
# informed: {list everyone who is kept up-to-date on progress; and with whom there is a one-way communication}
---
<!-- we need to disable MD025, because we use the different heading "ADR Template" in the homepage (see above) than it is foreseen in the template -->
<!-- markdownlint-disable-next-line MD025 -->
# Modifying CodeClimate Argument Count 

## Context and Problem Statement
Currently in the CI pipeline, CodeClimate is implemented to automate code analysis to enhance the quality of our code. For our calendar feature, its display is dynamically populated using a series of Javascript functions (written right before CodeClimate Implementation) which have 5 arguments. However, this design is being caught as the default codeclimate configurations limit function parameter counts to 4.


<!-- {Describe the context and problem statement, e.g., in free form using two to three sentences or in the form of an illustrative story.
 You may want to articulate the problem in form of a question and add links to collaboration boards or issue management systems.} -->

<!-- This is an optional element. Feel free to remove. -->
<!-- ## Decision Drivers

* {decision driver 1, e.g., a force, facing concern, …}
* {decision driver 2, e.g., a force, facing concern, …} -->
<!-- * … numbers of drivers can vary -->

## Considered Options

* Option 1: Restructure calendar population function design by creating a custom object to group two of the parameters into one
* Option 2: Modify codeclimate function parameter limit from 4 to 5 
<!-- * … numbers of options can vary -->


<!-- {justification. e.g., only option, which meets k.o. criterion decision driver | which resolves force {force} | … | comes out best (see below)}. -->

<!-- This is an optional element. Feel free to remove. -->
<!-- ### Consequences

* Good, because {positive consequence, e.g., improvement of one or more desired qualities, …}
* Bad, because {negative consequence, e.g., compromising one or more desired qualities, …}
* … numbers of consequences can vary -->

<!-- This is an optional element. Feel free to remove. -->
<!-- ## Validation

{describe how the implementation of/compliance with the ADR is validated. E.g., by a review or an ArchUnit test} -->

<!-- This is an optional element. Feel free to remove. -->
## Pros and Cons of the Options

### Option 1: Restructure calendar population function
* Good, reduces the number of parameters passed into the function to pass codeclimate analysis and adhere to "less is more"
* Bad, would require redesigning segments of multiple functions that are used to dynamically populate the calendar, and could potentially increase code complexity by grouping certain variables into a data object when unnecessary

### Option 2: Modify codeclimate function parameter limit
* Bad, having more than 4 parameters to the function may not be ideal as per the codecliamte analysis
* Good, much more efficient as it does not require modifying the current function designs, and keeps with the current variable declarations which does not call for additional data object creations to group required variables to pass in as a parameter

## Decision Outcome

Chosen option: **Option 2: Option 2: Modify codeclimate function parameter limit**


After careful review, it has been decided that Option 2 would be more ideal. This means that the codeclimate function argcount limit will be increased from 4 to 5. This is because redesigng several function segments to reduce parameter count by 1 (from 5 to 4) could potentially increase code complexity by unnecessarily abstracting currently declared variables into a data object to pass into the function parameters for the calendar to function. Also, it was believed that a small increase in parameter count would not affect the current implementation or future code complexity by a large degree given the scope of this project.
<!-- Because -->
<!-- This is an optional element. Feel free to remove. -->
<!-- ## More Information

{You might want to provide additional evidence/confidence for the decision outcome here and/or
 document the team agreement on the decision and/or
 define when this decision when and how the decision should be realized and if/when it should be re-visited and/or
 how the decision is validated.
 Links to other decisions and resources might here appear as well.} -->
