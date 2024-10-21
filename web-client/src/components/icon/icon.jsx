import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Icon({ css, icon }) {
  return <FontAwesomeIcon className={css} icon={icon} />;
}

export default Icon;
