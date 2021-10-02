import React, { useState } from "react";

import Button from "./Button";

import "./AddTask.css";

const AddTask = ({ handleTaskAddition }) => {
	const [inputData, setInputData] = useState("");

	const handleInputChange = (e) => {
		setInputData(e.target.value);
	};

	const handleAddTaskClick = () => {
		handleTaskAddition(inputData);
		setInputData("");
	};
	
	const [selectedFile, setSelectedFile] = useState(null)
	/*
	const onChangeHandler = event => {
		const { files } = event.target
		let reader = new FileReader()
		reader.readAsDataURL(files[0])
  
		reader.onload = (e) => {
			setSelectedFile(e.target.result)
			console.log(files[0].type)
			console.log(files[0])
			console.log(files[0].name)
			setInputData(escape(files[0].name))
		}
	}
	*/
	function onChangeHandler (event){
		const { files } = event.target
		let reader = new FileReader()
		reader.readAsDataURL(files[0])
  
		reader.onload = (e) => {
			setSelectedFile(e.target.result)
			console.log(files[0].type)
			console.log(files[0])
			console.log(files[0].name)
			setInputData(escape(files[0].name))
		}
	}

	return (
		<div className="add-task-container">
			<input
				onChange={handleInputChange}
				value={inputData}
				className="add-task-input"
				type="text"
			/>
			<div className="add-task-button-container">
				{/*<input type="file" name="file" onChange={onChangeHandler}/>*/}
				<Button>Procurar<input type="file" name="file" onChange={onChangeHandler} /></Button>
				{/*<Button onClick={handleAddTaskClick}>Procurar</Button>*/}
			</div>
			<div className="add-task-button-container">
				<Button onClick={handleAddTaskClick}>Adicionar</Button>
			</div>
		</div>
	);
};

export default AddTask;