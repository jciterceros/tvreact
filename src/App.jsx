import React,{useState, useEffect} from 'react';
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "../node_modules/video-react/dist/video-react.css"; // import css
import ReactPlayer from 'react-player'

import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask, { lista } from './components/AddTask';
import TaskDetails from './components/TaskDetails';

import './App.css';
import Button from './components/Button';
var listaMain = "Lista Main";

const App = () => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const fetchTasks = async () => {
			const { data } = await axios.get(
				"https://jsonplaceholder.cypress.io/todos?_limit=10"
			);

			setTasks(data);
		};

		fetchTasks();
	}, []);
  
	const handleTaskClick = (taskId) => {
		const newTasks = tasks.map((task) => {
			if (task.id === taskId) 
        return { ...task, completed: !task.completed};
      else
			  return task;
		});
		setTasks(newTasks);
	};

	const handleTaskAddition = (taskTitle) => {
		const newTasks = [
			...tasks,
			{
				title: taskTitle,
				id: uuidv4(),
				completed: false,
			},
		];

		setTasks(newTasks);
	};

	const handleTaskDeletion = (taskId) => {
		const newTasks = tasks.filter((task) => task.id !== taskId);

		setTasks(newTasks);
	};


  const [selectedFile, setSelectedFile] = useState(null)
  const onChangeHandler = event => {
      const { files } = event.target
      let reader = new FileReader()
      reader.readAsDataURL(files[0])

      reader.onload = (e) => {
          setSelectedFile(e.target.result)
      }
  }

  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Route
            path = "/" 
            exact
            render={()=>(
              <>
                <ReactPlayer
                    width='98%' height='70%' url={selectedFile} controls
                    volume={10/100}
                />
                <AddTask handleTaskAddition={handleTaskAddition} />
                <Tasks
                  tasks={tasks}
                  handleTaskClick={handleTaskClick}
                  handleTaskDeletion={handleTaskDeletion}
                />
              </>
            )}
          />
          <Route path = "/:takTitle" exact component={TaskDetails}/>
        </div>     
      </Router>
              {
                /*
                <div className="videos">
                  <ReactPlayer
                    //width='100%' height='100%' 
                    playing
                    loop
                    url={selectedFile} controls
                    volume={10/100}
                  />
                </div>
                <div>    
                  <input type="file" name="file" onChange={onChangeHandler} />
                </div>



                <ReactPlayer width='100%' height='50%' url='https://www.youtube.com/watch?v=nYTrIcn4rjg&ab_channel=ClipsHay' volume={0.5} />
                
                */
              }
    </>
  )
}
export default App;
