import React, {useState, useEffect} from 'react';

const getLocalData = () => {
    const lists = localStorage.getItem("myToDoList");

    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
};

const ToDo = () => {
    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleBtn, setToggleBtn] = useState(false);


    const addItem = () => {
        if(!inputdata){
            alert("Please Fill The Data First !!!");
        }
        else if(inputdata && toggleBtn){
            setItems(
                items.map( (curElem) =>{
                    if(curElem.id === isEditItem){
                        return { ...curElem, name: inputdata };
                    }
                    return curElem;
                })
            );
            setInputData("");
            setIsEditItem(null);
            setToggleBtn(false);
        }
        else{
            const myNewInputData = {
                id:new Date().getTime().toString(),
                name:inputdata,
            }
            setItems([... items, myNewInputData]);
            setInputData("");
        }
    };


    const editItem = (index) => {
        const item_edited = items.find((curElem) =>{
            return curElem.id === index;
        });
        setInputData(item_edited.name);
        setIsEditItem(index);
        setToggleBtn(true);
    }

    const deletItem = (index) => {
        const updatedItem = items.filter( (curElem) => {
            return curElem.id !==index;
        } );
        setItems(updatedItem);
    };


    const removeAll = () =>{
        setItems([]);
    };

    useEffect(() => {
        localStorage.setItem("myToDoList", JSON.stringify(items))
    }, [items]);



    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="TODO Logo" />
                        <figcaption>Add Your List Here 📃</figcaption>
                    </figure>
                    <div className="addItems">
                        <div className="addItems">
                            <input type="text" placeholder="✍ Add Items" value={inputdata} onChange={(event) => setInputData(event.target.value) } className="form-control" />
                            {
                                toggleBtn ? <i className="fa fa-edit add-btn" onClick={addItem}></i> : <i className="fa fa-plus add-btn" onClick={addItem}></i>
                            }
                            
                        </div>
                        <div className="showItems">
                            {items.map(
                                (curElem) =>{
                                    return(
                                        <div className="eachItem" key={curElem.id}>
                                            <h3>{curElem.name}</h3>
                                            <div className="todo-btn">
                                                <i className="far fa-edit add-btn" onClick={ () => editItem(curElem.id)}></i>
                                                <i className="far fa-trash-alt add-btn" onClick={ () => {deletItem(curElem.id)}}></i>
                                            </div>
                                        </div>
                                    );
                                }
                            )};
                            
                        </div>
                        <div className="showItems">
                            <button className="btn effect04" data-sm-link-text="Remove All" onClick={ removeAll }>
                                <span>Check List</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ToDo;
