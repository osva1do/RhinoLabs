import Icon from "../icon/icon";
import "./style.css";

const Input = (props) => {
  return (
    <div className="group">
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        autoComplete="off"
        required
        value={props.value}
        onChange={props.onChange}
      />
      <label htmlFor={props.name}>{props.label}</label>
      <Icon css="icon" icon={props.icon} />
    </div>
  );
};
export default Input;
