# TheBreweryProblem

This project is meant to be the solution for the requirements described in the code challenge "The Brewery Problem".

## Getting Started
Follow the steps:
1. Clone this repository.
2. Install dependencies by running `npm install`
3. Start the app by running `npm start`
4. Navigate to `http://localhost:4200/`
5. Simulate a mobile view by opening Dev Tools and selecting Mobile View.
## UI Design

Given the fact that no specific design was provided I've made my own using Figma. Check it out in [this link](https://www.figma.com/file/qw53KZCXfD1wdw3U7vf0C4/the-brewery-problem?node-id=0%3A1).

#### Scale Page
Specifically for the Scale page where "creativity will be really appreciated" I decided to give it a more close-to-reality look by including an animated scale - instead of following the proposed design.
Just for the sake of showing a more natural movement, the animation takes 250ms to complete but it can be changed freely accordingly to the designers' proposal.

## Keep it simple
I've made a few decisions in order to keep the solution as simple as possible, without loosing the important aspects of it.
- Only mobile view is considered. I understand the main use case for this web app would be users accessing through their phones. If necessary, tablet or desktop views could be designed or, in case it's not intended to support such views, we could show a warning to the users trying to access from a non-mobile device.
- The list of beers has no pagination as the provided API has less than 50 beers listed. If necessary, pagination could be added using infinite scrolling.
- There is no error handling for API requests. This is mainly to avoid the design and implementation of error pages/messages. If necessary, error handling could be easily added in each of services that generate requests to the API.

## Dependencies
No external dependencies were needed - other than the required by the framework itself.

## Build

Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` to execute the unit tests.
Run `npm run test-code-coverage` to execute the unit test and generate the code coverage report. You can find the report in the `coverage/` directory.
