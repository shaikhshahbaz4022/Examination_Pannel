## Users Routes

```
-Route:POST-/user/register---> register User

-Route:POST-/user/login   ---> Login user/instructor

-Route:GET /exam/userquestion --> user can see their questions

-Route : GET- /exam/recent  --> user can see their recent exams

-Route :GET -/exam/upcoming -->user can see their upcoming exams

--  Route: POST exam/exams/:examId/submit
 Submit an exam by the User and update clearedExams


```

## Instructor Routes

```

1. Route:POST-/exam/create --> instructor create exam

title,
questions,
assignedTo,
startTime,
endTime,
instructor

2. /exam/allusers --> instructor can see all users

3. Route: POST /exam/exams/:examId/assign/:studentId
   ->sign an exam to a specific user


```

## ADMIN

```

Route : POST --> /admin/create --> admin can create Instructor and user -"select tag"
Route : GET --> /admin/getalldata --> see all users/instructor

```
