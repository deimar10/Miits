Miits API - [NodeJs Express server](https://github.com/deimar10/Miits-api)
## Table of Contents
* <strong>Overview</strong>
    * <strong>Introduction</strong>
    * <strong>Project Management</strong>
    * <strong>Stack</strong>
    * <strong>Team</strong>
    * <strong>App. Functionalities
    * <strong>Screenshots</strong>

## Introduction
The aim was to create a web application (as a <strong>final</strong> project) that collects entertainment offers from different companies to help young students participate in social events in a more <strong>affordable</strong> way.

The main functionality of the application is to allow companies to create new offers and display them to the user. Users can bookmark offers, give feedback to companies and receive a notification when a bookmarked offer expires.
## Project Management
<div style="display: flex; justify-content: start;">
  <img src="https://img.shields.io/badge/toggl-white?style=for-the-badge&logo=toggl&logoColor=purple" alt="Toggl Badge"/>
  <img style="margin-left: 0.5rem;" src="https://img.shields.io/badge/jira-white?style=for-the-badge&logo=jira&logoColor=blue" alt="Jira Badge"/>
  <img style="margin-left: 0.5rem;" src="https://img.shields.io/badge/figma-white?style=for-the-badge&logo=figma&logoColor=red" alt="Figma Badge"/>
</div>

## Stack
<div id="badges" style="display: flex; justify-content: start;">
        <img src="https://img.shields.io/badge/React-white?style=for-the-badge&logo=react&logoColor=blue" alt="React Badge"/>
        <img style="margin-left: 0.5rem;" src="https://img.shields.io/badge/NodeJs-white?style=for-the-badge&logo=express&logoColor=gray" alt="Express Badge"/>
        <img style="margin-left: 0.5rem;" src="https://img.shields.io/badge/TypeScript-white?style=for-the-badge&logo=typescript&logoColor=blue" alt="Ts Badge"/>
        <img style="margin-left: 0.5rem;" src="https://img.shields.io/badge/Cypress-white?style=for-the-badge&logo=cypress&logoColor=blue" alt="Cypress Badge"/>
        <img style="margin-left: 0.5rem;" src="https://img.shields.io/badge/MySQL-white?style=for-the-badge&logo=mysql&logoColor=black" alt="MySQL Badge"/>
        <img style="margin-left: 0.5rem;" src="https://img.shields.io/badge/Firebase-white?style=for-the-badge&logo=firebase&logoColor=orange" alt="MySQL Badge"/>
        <img style="margin-left: 0.5rem;" src="https://img.shields.io/badge/Chai-white?style=for-the-badge&logo=chai&logoColor=yellow" alt="MySQL Badge"/>
        <img style="margin-left: 0.5rem;" src="https://img.shields.io/badge/MUI-white?style=for-the-badge&logo=mui&logoColor=blue" alt="MySQL Badge"/>
    </div>

## Team
| Name        |                       Role                        |                         Github Profile |
|-------------|:-------------------------------------------------:|---------------------------------------:|
| Jurgen Mikk | Project Manager, Developer, Documentation, Design | [Jurgen](https://github.com/JurgenMik) |
| Deimar Pärn |     Testing, Developer, Documentation, Design     |  [Deimar](https://github.com/deimar10) |

## App. Functionalities
* User
  * See offers on different events, drinks
  * Filter offers based on category & location
    * see selected active process
    * all locations come dynamically from the BE
  * Sort offers by date or price
  * Search for offers by title & location
  * See hover effects on all interactive elements
  * Responsive
  * Mark an offer as favorite
    * see all offers marked as favorite (handled in LocalStorage)
    * remove offer from favorites
  * Get a notification when a favorite offer is about to expire
  * See a detailed view of a selected offer
    * comment or give feedback on offers
      * receive validation errors when handling feedback
      * receive a notification when successfully commenting on an offer
  * Switch between dark/light theme
  * Differentiate between upcoming & past offers
* Enterprise
  * Desktop Responsive
  * Register an account
    * receive validation errors during registration
  * Login
    * receive validation errors during login
    * logout
  * See hover effects on all interactive elements
  * See all offers belonging to the account
    * see offer count in the enterprise sidebar
    * filter enterprise offers by status: upcoming?
    * see user feedback on an individual offer in a pop-up feedback modal
  * Create new offers
    * notification when a new offer has been created
    * input-mask to enter the correct date format
    * upload image to a firebase bucket & see upload status with mui loader
  * Delete an offer
    * warning/confirmation modal before deleting an offer
    * notification when an offer has been deleted
  * Edit an offer
    * notification when an offer has been edited
    * input-mask to enter the correct date format
  * Switch between dark/light theme
## Screenshots
![image](https://user-images.githubusercontent.com/89903354/230744284-9fb29d47-3e7b-4e89-a3d0-4c323d35741f.png)
![image](https://user-images.githubusercontent.com/89903354/230744598-45df7852-f74b-4a5c-90ba-828dab8f4c37.png)
![image](https://user-images.githubusercontent.com/89903354/230744304-cd31a6fb-fe87-4d4d-aa35-47b40126e46c.png)
![image](https://user-images.githubusercontent.com/89903354/230744630-1a91af24-fd39-4c6d-b0a0-01b7095e8081.png)
![image](https://user-images.githubusercontent.com/89903354/230744657-59677d38-c56a-4d95-955c-70e8149116f6.png)
![image](https://user-images.githubusercontent.com/89903354/230744679-3d81e74f-d5bc-45bf-aca6-315888e0e615.png)
![image](https://user-images.githubusercontent.com/89903354/230744776-3694aea3-c7ec-463b-95d7-371d3520911f.png)
![image](https://user-images.githubusercontent.com/89903354/230744705-2313286f-748c-4dd7-ade1-c189e13e226d.png)
![image](https://user-images.githubusercontent.com/89903354/230744798-5cf25aef-a3c1-41bb-82ee-8a564430ad89.png)
![image](https://user-images.githubusercontent.com/89903354/230745036-68afb541-f325-4195-a1a8-96c00fd7908a.png)
![image](https://user-images.githubusercontent.com/89903354/230744819-07149426-d3a5-414b-9dae-0e960310cb74.png)
![image](https://user-images.githubusercontent.com/89903354/230744850-46703569-ef88-4ae8-aaae-360164951edf.png)
![image](https://user-images.githubusercontent.com/89903354/230744858-77ea3161-90b6-4aaa-a154-ee8b91d2b977.png)
![image](https://user-images.githubusercontent.com/89903354/230744869-2e744936-92df-4bf4-ab29-7a5976b2e1e9.png)
![image](https://user-images.githubusercontent.com/89903354/230744881-d38cf767-9f5e-4366-b3bd-4bed1f08f8bf.png)
![image](https://user-images.githubusercontent.com/89903354/230744923-3128eb7d-f2a7-4655-8d0f-7482425fc04b.png)
![image](https://user-images.githubusercontent.com/89903354/230744944-635aa052-bae6-4c34-ae4c-c1463bc76430.png)
![image](https://user-images.githubusercontent.com/89903354/230744977-e9d8287a-127a-45fc-80cf-521ea30e894c.png)
![image](https://user-images.githubusercontent.com/89903354/230745075-07395c60-2d5f-4734-8ed2-873cfe8cc8aa.png)