import React from "react";

const Form = ({updateList}) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const data = Object.fromEntries(
        new FormData(e.target).entries()
      );

      updateList({id: Date.now(), ...data});
    };

    // {x:1, y:2} => [['x', 1], ['y', 2]]
    return <form onSubmit={handleSubmit}>
            <input type="text" name="title" />
            <button type="submit">Valider</button>
    </form>;
}

export default Form;