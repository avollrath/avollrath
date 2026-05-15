---
title: 'TalentAdore Mobile App'
seoTitle: 'TalentAdore UX Case Study: Reimagining an ATS for Mobile'
summary: 'Deciding what survives the transition to mobile. A UX prototype for a complex recruitment SaaS, focusing on the essential 10-second tasks.'
category: 'Design'
heroImage: './ta-mobile.jpg'
heroImageAlt: 'TalentAdore Mobile App UI'
techStackLogos: ['Adobe XD.svg']
order: 8
---

**TalentAdore Mobile App** was a deep dive into the "reduction vs. shrinkage" problem. The desktop version of TalentAdore is a powerful applicant tracking system (ATS) with immense complexity. My challenge wasn't just to "make it mobile," but to decide what parts of a recruiter's workflow actually survive being used on a phone.

## The Goal: The 10-Second Task

A recruiter away from their desk isn't performing deep pipeline audits; they’re checking candidate names, reading a quick message, or moving someone to the next stage. I focused the prototype on these high-frequency, low-duration interactions.

The mobile flow prioritized:
- **Candidate Review**: Quick, card-based views of essential applicant info.
- **Pipeline Status**: A high-level overview of where things stand.
- **Messaging**: Ensuring communication remains fluid even on the go.
- **Workflow Continuity**: Making sure actions taken on mobile felt like part of the larger desktop process.

## The Strategy: Product Thinking Over Implementation

This project was built as a high-fidelity **Adobe XD** prototype. This allowed us to iterate rapidly on the information hierarchy before committing to code. The real work was in the "no"—saying no to 90% of the desktop features to ensure the remaining 10% actually worked for a recruiter on the move.

The useful work was reduction. A shrunken desktop product would have looked complete and worked badly. The prototype needed to decide what a recruiter might need in the next ten seconds and what should wait until desktop.

## Technical highlights

This was an `Adobe XD` prototype, not a production frontend. That was the correct deliverable because the question was interaction direction, not implementation architecture.

The external design-selection archive references TalentAdore interface work, including applicant views and other brand/design material. That context matters because the prototype came from a real product environment, not an isolated redesign exercise.

The prototype also had to imply workflow continuity. A recruiter might check a candidate on mobile, but the deeper work probably continues later on desktop. That means the mobile view needs to make state understandable without pretending it owns the whole process.

The hierarchy problem was the most interesting part. Recruitment software makes almost every label feel important:

- Candidate name
- Role
- Stage
- Evaluation state
- Message state
- Ownership
- Deadline
- Next action

On mobile, the interface has to be more opinionated. Otherwise it becomes a tiny version of the desktop UI, which helps nobody.

## Status

If I did this now, I would design closer to a component system and document the state model more explicitly. Mobile prototypes can look clean while quietly avoiding empty states, long names, permissions, and message edge cases.

The project is useful in the portfolio because it shows product thinking rather than implementation weight. The hard part was saying no to most of the desktop product.
