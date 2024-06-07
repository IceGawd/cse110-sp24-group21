---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
# nav_order: 100
title: Weekly Calendar Implementation Decision

# These are optional elements. Feel free to remove any of them.
# status: {proposed | rejected | accepted | deprecated | … | superseded by [ADR-0005](0005-example.md)}
date: {2024-05-31 Last Updated}
deciders: {Peter, Sierra, Luca}
# consulted: {list everyone whose opinions are sought (typically subject-matter experts); and with whom there is a two-way communication}
# informed: {list everyone who is kept up-to-date on progress; and with whom there is a one-way communication}
---
<!-- we need to disable MD025, because we use the different heading "ADR Template" in the homepage (see above) than it is foreseen in the template -->
<!-- markdownlint-disable-next-line MD025 -->
# The decision regarding Weekly Calendar Implementation

## Context and Problem Statement
With the final UI change, the daily calendar has changed into a weekly calendar. This means a week's tasks have to be loaded.
Below evaluates the different options of implementation and justification for choice.


<!-- {Describe the context and problem statement, e.g., in free form using two to three sentences or in the form of an illustrative story.
 You may want to articulate the problem in form of a question and add links to collaboration boards or issue management systems.} -->

<!-- This is an optional element. Feel free to remove. -->
<!-- ## Decision Drivers

* {decision driver 1, e.g., a force, facing concern, …}
* {decision driver 2, e.g., a force, facing concern, …} -->
<!-- * … numbers of drivers can vary -->

## Considered Options

* Option 1: Using a HTML table
* Option 2: Using a CSS grid system
* Option 3: Customizing an existing implementation
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

### Option 1: Using an HTML Table
* Good: Are naturally suited for displaying tabular data like a calendar, making it straightforward to structure the calendar grid
* Bad: Less flexible when it comes to responsive design and advanced styling compared to CSS Grid, which might limit the ability to create modern, responsive layouts

### Option 2: Using a CSS Grid
* Bad: implementing with CSS Grid can be more complex and may require a deeper understanding of CSS Grid properties and behaviors
* Good: CSS grid implementation can allow for more precise control over the positioning and responsiveness of weekly task elements

### Option 3: Customizing a third-party implementation
* Bad: Significantly reduce development time, as the core functionality and styling are already in place
* Good: May be difficult to customize to meet UI design and integrate into our existing codebase


## Decision Outcome

Chosen option: **Option 1: Using a HTML Table**
gi
Given the time available and scope of the project, using an HTML table was deemed the more appropriate way to implememt the weekly calendar. Experementing with the CSS grid brought difficulty when it came to overlapping tasks, and given the remaining time may be difficult to implement. Customizing a third party implementation would mean it is limited to suit our needs. Using an HTML table proved to be a solid solution and proved to work with overlapping tasks as well, hence was the chosen method.

In future iterations, it may be good to consider refactoring to utilize a CSS grid for responsiveness and robustness going forward.


<!-- Because -->
<!-- This is an optional element. Feel free to remove. -->
<!-- ## More Information

{You might want to provide additional evidence/confidence for the decision outcome here and/or
 document the team agreement on the decision and/or
 define when this decision when and how the decision should be realized and if/when it should be re-visited and/or
 how the decision is validated.
 Links to other decisions and resources might here appear as well.} -->
