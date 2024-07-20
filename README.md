# Assignment Completion Report

### Project Overview
The assignment has been completed according to the specified design and requirements. Below is a detailed description of the project, including the tools and methods used.

### Technologies Used
- **Framework**: Angular
- **Version**: 15

### Setup and Installation
To set up and run the project, follow these steps:
1. Clone the project repository.
2. Open the terminal and navigate to the project directory.
3. Install the necessary dependencies by running the command: `npm i`
4. Start the project by running: `npm start`
5. No additional packages need to be installed as the project solely relies on Angular from scratch.

### Features and Functionality
#### Components
- All components have been created from scratch to meet the design and requirements.

#### API Integration
- Utilized the SWAPI (Star Wars API) to fetch data for:
  - Films
  - People
  - Vehicles
  - Species
  - Starships

#### User Interface and User Experience
1. **Loader Implementation**
   - Initially, upon loading, a loader is displayed.
   - The table becomes visible once the data has been successfully loaded.

2. **Filtering Data**
   - Users can apply filters and click the "Search" button to view the filtered data.
   - If filters are applied and pagination buttons are clicked, the loader will be displayed followed by the filtered data.
   - If no data matches the filters, a "No data found" message will be displayed.

3. **Pagination**
   - The table supports pagination. When filters are present, clicking on pagination buttons will show the loader before displaying the filtered data.
   - If no data matches the current filters on the selected page, a "No data found" message will appear.

4. **Character Details Navigation**
   - Clicking on a row in the table routes to the character details page.
   - The character ID is passed as a route parameter in the URL.

5. **State Management**
   - The state is maintained using subjects. For example, if the user is on the 3rd page and clicks on a character, they will be routed to the character details page. Upon clicking the back button, the user will return to the 3rd page with the state preserved.

### Summary
The project has been successfully implemented as per the design and requirements. All functionalities, including data fetching, filtering, pagination, and state management, have been thoroughly tested and are working as expected. The user interface is intuitive, and the user experience is smooth, with appropriate feedback mechanisms such as loaders and messages.

This document serves as a professional overview of the completed assignment, detailing the setup, technologies used, and the features implemented in the project.
