import "./style.css";

const ShadowButton = (props) => {
  return (
    <button className="shadow-button" type={props.type}>
      <span className="button-content">{props.text}</span>
    </button>
  );
};
export default ShadowButton;
