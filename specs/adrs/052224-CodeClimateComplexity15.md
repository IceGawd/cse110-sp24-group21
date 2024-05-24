---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
# nav_order: 100
title: Change Code Climate Complexity to 15

# These are optional elements. Feel free to remove any of them.
# status: {proposed | rejected | accepted | deprecated | … | superseded by [ADR-0005](0005-example.md)}
date: {2024-05-23 when the decision was last updated}
deciders: {Avighna}
# consulted: {list everyone whose opinions are sought (typically subject-matter experts); and with whom there is a two-way communication}
# informed: {list everyone who is kept up-to-date on progress; and with whom there is a one-way communication}
---
<!-- we need to disable MD025, because we use the different heading "ADR Template" in the homepage (see above) than it is foreseen in the template -->
<!-- markdownlint-disable-next-line MD025 -->
# The decision regarding the what to set the Code Climate Complexity

## Context and Problem Statement

CodeClimate checks to make sure that the code is easy to read. There is a statistic for each method called code complexity which is used to detect the readability of a function. 

<!-- {Describe the context and problem statement, e.g., in free form using two to three sentences or in the form of an illustrative story.
 You may want to articulate the problem in form of a question and add links to collaboration boards or issue management systems.} -->

<!-- This is an optional element. Feel free to remove. -->
<!-- ## Decision Drivers

* {decision driver 1, e.g., a force, facing concern, …}
* {decision driver 2, e.g., a force, facing concern, …} -->
<!-- * … numbers of drivers can vary -->

## Considered Options

* Option 1: Leave the CodeClimate complexity at 5
* Option 2: Change the CodeClimate complexity to a larger number
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

### Option 1: Code Complexity at 5
* Good, Leaving the CodeClimate at 5 would force developers to keep each function very brief and readable. 
* Neutral, It is the default option
* Bad, sometimes code is very hard to divide nicely and it will cause developers to make some unorthodox decisions making the code unreadable 

### Option 2: Code Complexity at 15
* Good, Setting the CodeClimate at 15 would allow for some more complex methods that are hard to divide.
* Good, it was recommended by [this stack overflow post](https://stackoverflow.com/questions/45083653/sonarqube-qualify-cognitive-complexity)
* Good, the following code has a code complexity of 9 and it isn't clean to divide. Code Complexity of 15 would allow this function to stay normal

```
	let firstDay = new Date(year, month, 1).getDay();
	tbl = document.getElementById("calendar-body");
	tbl.innerHTML = "";
	monthAndYear.innerHTML = months[month] + " " + year;
	selectYear.value = year;
	selectMonth.value = month;

	let date = 1;
	for (let i = 0; i < 6; i++) {
		let row = document.createElement("tr");
		for (let j = 0; j < 7; j++) {
			if (i === 0 && j < firstDay) {
				cell = document.createElement("td");
				cellText = document.createTextNode("");
				cell.appendChild(cellText);
				row.appendChild(cell);
			} else if (date > daysInMonth(month, year)) {
				break;
			} else {
				addFilledCell(j, row, year, month);
				date++;
			}
		}
		tbl.appendChild(row);
	}
	datesIntoButtons();
```

* Neutral, the other code climate features will still enforce good method writing
* Bad, This might make developers be lazy with linearizing their code. 
* Bad, this sets a precedent of changing code climate to make it easier / more irrelevant

## Decision Outcome

Chosen option: **Option 2: Code Complexity at 15**
<!-- Because -->
<!-- This is an optional element. Feel free to remove. -->
<!-- ## More Information

{You might want to provide additional evidence/confidence for the decision outcome here and/or
 document the team agreement on the decision and/or
 define when this decision when and how the decision should be realized and if/when it should be re-visited and/or
 how the decision is validated.
 Links to other decisions and resources might here appear as well.} -->

