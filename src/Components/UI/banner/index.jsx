import qr from "assets/images/icons/qr-code-white.svg";
import "./style.css";
const Banner = (props) => {
  return (
    <div className="banner">
      <img src={qr} alt="" />
      <h1 className="banner-title">
        {props.title} <span>{props.titleSpan}</span> {props.title2}
      </h1>
    </div>
  );
};
export { Banner };
