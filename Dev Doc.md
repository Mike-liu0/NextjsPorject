## Course pages

### Features

Course part includes three parts, including All Courses, Add Course, Edit Course.

- All Course

The All Courses Page is to demonstrate all course information with flexible list.

Each course card has 'Read more' Button to access the detail information

The course detail page ([id] page) is to show more detail information such as chapter, schedule etc.

- Add Course

Add course page has three component including course detail, course schedule, and submit status.

The course detail component is made from specific input box and call Post API to create a new course .

The course schedule component consists chapters and class times data. It should use Put API to add new information to the course.

The submit status component is to show success add message to user and provide two options for further operations.

- Edit Course

Search function to select course by the course name and display the specific course detail data and schedule data of course on input box, and users can change them then save them by Put API.


## Work Items

# All course index page
1. Dashboard layout
  a. input the dashboard component from dashboard.ts
  b. alter the link to "all course", "add course", "edit course"
2. Breadcrumb tag
  a. alter the tag name of each page
3. Infiite Scroll component
  a. import InfiniteScroll package
  b. set up the config of InfiniteScroll, 
  c. complete read course data function. When readMore function is called, the course current page + 1, and save new course data to the state. ----CourseInfo Api
  d. link the course data to List renderItem data. 
  e. read and display all the course info (i.e. name, starttime, etc)
  f. add "read more" button and link to [id] page
 
  
  
  
# Course [id] page 
1.Card list in [id] page
  a. use Row and Col component to set up the course card, each Row has 2 Card. 
  
2. Course Card 
  a. Call getCourse Api to read the [id] course information and save them tp course state.
  b. For the left card,
    b1. the content is similar to the index page componennt.
    b2. Plus, price, batch, student, earnings component to the actions config of the card( Show these data in the bottom of card.
  c. For the right card
    c1. Display the detail data (i.e. start-time, Course code, etc)
    c2. use the current chapter to indicate the process of the chapters, and use Step show all chapters
    c3. use the description component to show the class time in the grid
    c4. use the Collapse to display all chapter content.


# Course Add page 
1. Create Course part.
  a. use Step component to divide the three parts. 
  b. set up the Form. useFrom, onFinish function to call create a new course api. 
  c. set up all formItem with the correct format, such as Number, string, etc. 
  d. call getTeacher Api to store all teacher Name & id data, and show them in the Selector
  e. call getCourseTypes Api to store all course types data, and show them in the Type Selector
  f. set up the restriction for all input( length, type, etc) and Parse all the data  to correct type
  g. Add css and layout to set up the suitable page
  h. when click the submit button, call api and create new course on the backend. 
  j. hide the first part and show the schedule part.  
  i. Show the error if something going wrong with the api and input
2. Set up schedule part
  a. set up two extensible input table. 
  b. when click add new button , to display more input box
  c. set the input type. DatePicker to select the class time.
  d. call api with the schedule data and course id to complete the course props. 
  e. Hide this part when the api response is 201 and move the third part. 

3. success submit part.
  a. When create courese & alter schedule api works, show the success information
  b. show two options to create a new course or back to index page. 


# Course Edit page 
