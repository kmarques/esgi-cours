import React,{useState} from 'react';

const Form = ({onSubmit}) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        debugger;
        const newList = {id: Date.now(), title: value};
        onSubmit(newList);
    };

    //const handleSubmit = (e) => {
    //    e.preventDefault();
    //    let data = new FormData(e.currentTarget);
    //    data = data.entries();   // [['name', 'newList'], ['size', 3]]
    //    data = Object.fromEntries(data); // {name: 'newList', size: 3}
    //    onSubmit({id: Date.now(), ...data});
    //};

    return (
        <form onSubmit={handleSubmit}>
            <input name="new-list" placeholder="New list" value={value} onChange={(event) => setValue(event.target.value)}/>
            <button type="submit">Envoyer</button>
        </form>
    );
};

export default Form;