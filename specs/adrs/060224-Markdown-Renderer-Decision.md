---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
# nav_order: 100
title: Creating an in-house markdown renderer vs. using an external repo

# These are optional elements. Feel free to remove any of them.
# status: {proposed | rejected | accepted | deprecated | … | superseded by [ADR-0005](0005-example.md)}
date: {2024-06-02 when the decision was last updated}
deciders: {Yuehua}
# consulted: {list everyone whose opinions are sought (typically subject-matter experts); and with whom there is a two-way communication}
# informed: {list everyone who is kept up-to-date on progress; and with whom there is a one-way communication}
---
<!-- we need to disable MD025, because we use the different heading "ADR Template" in the homepage (see above) than it is foreseen in the template -->
<!-- markdownlint-disable-next-line MD025 -->
# The decision regarding the what to set the Code Climate Complexity

## Context and Problem Statement

Having markdown rendering would allow the potential user an easy way to add rich text, and allows us to provide rich text editing in an easy to implement way.

<!-- {Describe the context and problem statement, e.g., in free form using two to three sentences or in the form of an illustrative story.
 You may want to articulate the problem in form of a question and add links to collaboration boards or issue management systems.} -->

<!-- This is an optional element. Feel free to remove. -->
<!-- ## Decision Drivers

* {decision driver 1, e.g., a force, facing concern, …}
* {decision driver 2, e.g., a force, facing concern, …} -->
<!-- * … numbers of drivers can vary -->

## Considered Options

* Option 1: Create an in-house markdown renderer
* Option 2: Find an external repo to handle it for us
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

### Option 1: Create an in-house markdown renderer
* Good, we have total control over the code and can tailor to exactly our input and desired output
* Bad, it takes more time than we have to write a robust markdown renderer.

### Option 2: Find an external repo to handle it for us
* Bad, we would need to regularly check the external repo for updates/dependencies are best avoided
* Good, this option is quick and most likely higher quality/more comprehensive than anything we can make within the next week (or over the course of the entire quarter, even).

## Decision Outcome

Chosen option: **Option 2: Find an external repo to handle it for us**

(specifically, [marked](https://github.com/markedjs/marked))
<!-- Because -->
<!-- This is an optional element. Feel free to remove. -->
<!-- ## More Information

{You might want to provide additional evidence/confidence for the decision outcome here and/or
 document the team agreement on the decision and/or
 define when this decision when and how the decision should be realized and if/when it should be re-visited and/or
 how the decision is validated.
 Links to other decisions and resources might here appear as well.} -->
