import React, {useState} from 'react';
import './App.css';
import GoalList from './component/GoalList/GoalList';
import NewGoal from './component/NewGoal/NewGoal';
function App() {
  const [courseGoals, setCourseGoals] = useState([
    { id: 'cg1', text: 'Finish the course.'},
    { id: 'cg2', text: 'Learn All about this course.'},
    { id: 'cg3', text: 'Help Other stuents in the Q&A'},
  ]);

  const addNewGoalHandler = newGoal => {
    // setCourseGoals(courseGoals.concat(newGoal));
    setCourseGoals((prevCourseGoals) => {
      return prevCourseGoals.concat(newGoal);
    });
  };
  return (
    <div className="course-goal">
      <h2> Course Goals</h2>
      <NewGoal onAddGoal={addNewGoalHandler} />
      <GoalList goals={courseGoals} />

    </div>
  );
}

export default App;
