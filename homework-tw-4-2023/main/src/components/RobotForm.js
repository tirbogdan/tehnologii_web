import { useState } from "react";

function RobotForm({ onAdd }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [mass, setMass] = useState("");

  const handleChange = (event) => {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "type":
        setType(event.target.value);
        break;
      case "mass":
        setMass(event.target.value);
        break;
      default:
        return;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAdd({
          name,
          type,
          mass: parseFloat(mass) > 500 ? mass : "",
        });
      }}
    >
      <label>
        name:
        <input
          name="name"
          type="text"
          placeholder="name"
          value={name}
          onChange={handleChange}
        />
      </label>
      <label>
        type:
        <input
          name="type"
          type="text"
          placeholder="type"
          value={type}
          onChange={handleChange}
        />
      </label>
      <label>
        mass:
        <input
          name="mass"
          type="numeric"
          placeholder="mass"
          value={mass}
          onChange={handleChange}
        />
      </label>
      <button type="submit" value="add">
        add
      </button>
    </form>
  );
}

export default RobotForm;
