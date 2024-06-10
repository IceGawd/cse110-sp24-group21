---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
# nav_order: 100
title: PWA Implementation

# These are optional elements. Feel free to remove any of them.
# status: {proposed | rejected | accepted | deprecated | … | superseded by [ADR-0005](0005-example.md)}
date: {2024-06-09 Last Updated}
deciders: {Peter, Dhruv}
# consulted: {list everyone whose opinions are sought (typically subject-matter experts); and with whom there is a two-way communication}
# informed: {list everyone who is kept up-to-date on progress; and with whom there is a one-way communication}
---
<!-- we need to disable MD025, because we use the different heading "ADR Template" in the homepage (see above) than it is foreseen in the template -->
<!-- markdownlint-disable-next-line MD025 -->
# The decision regarding adopting PWA

## Context and Problem Statement
As our current implementation of the app is via a webpage, it could potentially limit users who do not have network access. Therefore, we could expand our potential user base by adopting Progressive Web Applications (PWA).

<!-- {Describe the context and problem statement, e.g., in free form using two to three sentences or in the form of an illustrative story.
 You may want to articulate the problem in form of a question and add links to collaboration boards or issue management systems.} -->

<!-- This is an optional element. Feel free to remove. -->
<!-- ## Decision Drivers

* {decision driver 1, e.g., a force, facing concern, …}
* {decision driver 2, e.g., a force, facing concern, …} -->
<!-- * … numbers of drivers can vary -->

## Considered Options

* Option 1: Don't adopt PWA
* Option 2: Adapt PWA
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

### Option 1: Not adapting PWA
* Good, adopting PWA means user experience could differ based on the browser since not all features might be supported
* Bad, could restrict from reaching out to user base, also not necessarily adhering to "local first" principle

### Option 2: Adopting PWA
* Bad, user experience could differ based on the browser since not all features might be supported
* Good, could further expand user base reach and adhere "local first" principle

## Decision Outcome

Chosen option: **Option 2: Adopting PWA**
In addition to expanding the user base reach and adhering to the "local first" principle, adopting a Progressive Web Application (PWA) can also offer benefits such as improved user engagement and cross-platform compatibility. This aligns with the goal of providing a "barrier-less" user experience while maximizing development efficiency.


<!-- Because -->
<!-- This is an optional element. Feel free to remove. -->
<!-- ## More Information

{You might want to provide additional evidence/confidence for the decision outcome here and/or
 document the team agreement on the decision and/or
 define when this decision when and how the decision should be realized and if/when it should be re-visited and/or
 how the decision is validated.
 Links to other decisions and resources might here appear as well.} -->
