Update20: (9-2-2022)
Q:

1. some error in edit page, such as options in Autocomplete
2. edit schedule part has a bug, the updated data is not displayed immediately. It may show mistake data after second click.



Update19: (5-2-2022)
Q:

1. the uuid is not shown
2. the onsearch options are not shown, how to pick the correct course name/id




Update17: (29-1-2022)
Q:

1. The return response is null, how to solve the problem, to record the course ID.



Update17: (19-1-2022)
Q:

1. The teacher input box is requrired id, how to get the whole teacher list
2. the course type is require as {} type, or just string type?

Update16: (15-1-2022)
Q:

1. The panel in [id] course page is not shown.
2. how to cope with the class time data.

Update15: (12-1-2022)
Q:

1. something going wrong with the React.useState.. Red line but it works.
2. I have some problems about the save skill data to usestate.
3. next function for the course card

# Homework notes:

Dev Doc For Teacher page

Teacher Mangement Page

features:
-Dashboard Layout
-Teacher Info Table
-Teacher specific info
...

Works Items
1 Dashboard Layout
dashboard componenet
2 Teacher Table
a) set up the table
b)set up the const to store the teacher list/ current page/ current page size
c)access api/teacher to read teacher info with page & page size
d)set up the columns and data for teacher (skill array concat with comma, link for [id] page
e)add/edit/delete button. call api to mange the information in the backend
f) sort on name/ filter by the name/country 3. Teacher page
a)read the teacher info by id
b)card/ table/ tag component

Update14: (1-1-2022)
update the add, edit [id] functions
Q : how to cope with the new skills

Update13: (29-12-2021)
Q : sort.name is undefined but it works.
How to fix the key warning
Visible of madel box in teacher page

Update12: (22-12-2021)
Completed:

1. complete the student [id] page

questions:

1. the layout of the card. One is responsive and the other is not.

Update11: (18-12-2021)
Completed:

1. complete the search student function

Update10: (15-12-2021)
Completed:

1. complete the edit function
2. link to the student page with id

Not-completed & questions

1. Do not start the teacher page
2. some demostration of student elements in the [id] page
3. cut some reported part and I will organize the code better in a few days.
4. A error about [id] page, the useeffect read the inital id value is undefined and return api error.

Update9: (11-12-2021)
Completed:

1. complete the unfinished function( add , edit)

Not-completed & questions
1.Still got some bug with the edit, the record just show the last one of the student list. 2. Planning to finish the specific student page.

Update8: (08-12-2021)
Completed:

1. complete the add edit delete function

Not-completed & questions
1.Cannot refresh the page automatically, window.location.reload(); redirect to first page without pageValue.
2.call api format is not identical, params/without params/add id after url
3.the value of input is not changed after click edit a new student.

Update7: (04-12-2021)
Completed:

1. complete clean code and add config file
2. add the button for the add, edit, remove function

Not-completed & questions

1. A small bug about cannot show defaultchecked for user role in login page
2. cannot call remove user function
3. not add add/edit form for add/edit functions

Update6: (01-12-2021)
Completed:

1. complete the pagination function

Not-completed & questions

1. cannot use the totalStudent state to params of pagination, I just use the hard code(300) .

Update5: (27-11-2021)
Completed:

1. complete children function
2. show all info of students

Not-completed & questions

1. seperate the api call from the student page (the list will be noting after async function)
2. a warning about "Each child in a list should have a unique "key" prop"

Update4: (24-11-2021)
Completed:

1. complete the dashboard & student function
2. create some interface for api

Not-completed & questions

1. the student table is not shown
2. I do not know thow to connect paclkages

Update3: (20-11-2021)
Completed:

1. create project based on ts and move login and dashboard layout page to new folder
2. complete the logout function(call api, clear token)
3. create students page and call getStudents api
4. create a table to store the students info

Not-completed & questions

1. the structure of dashboard (how to use children in nextjs or take the header and navbar as module for subpages
2. show data of students json (I dont know how to show the list in the json properly)
3.
