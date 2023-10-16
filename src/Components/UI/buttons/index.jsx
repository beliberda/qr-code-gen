import { Link } from "react-router-dom";
import "./style.css";

const ButtonEnter = () => {
  return (
    <button className="button-enter">
      <Link to="/products">Войти</Link>
    </button>
  );
};
const ButtonCreateQr = (props) => {
  return (
    <button className="button-create-qr">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill="none"
      >
        <path
          d="M0 8.5H8V0.5H0V8.5ZM2 2.5H6V6.5H2V2.5ZM0 18.5H8V10.5H0V18.5ZM2 12.5H6V16.5H2V12.5ZM10 0.5V8.5H18V0.5H10ZM16 6.5H12V2.5H16V6.5ZM16 16.5H18V18.5H16V16.5ZM10 10.5H12V12.5H10V10.5ZM12 12.5H14V14.5H12V12.5ZM10 14.5H12V16.5H10V14.5ZM12 16.5H14V18.5H12V16.5ZM14 14.5H16V16.5H14V14.5ZM14 10.5H16V12.5H14V10.5ZM16 12.5H18V14.5H16V12.5Z"
          fill="#13141C"
        />
      </svg>
      {props.text}
    </button>
  );
};
const ButtonDisableQr = (props) => {
  return (
    <button className="button-disable-qr">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 22C17.5229 22 22 17.5228 22 12C22 6.47715 17.5229 2 12 2C6.4772 2 2.00005 6.47715 2.00005 12C2.00005 17.5228 6.4772 22 12 22ZM7.70722 7.29283C8.09774 6.9023 8.73459 6.90599 9.12967 7.30106L11.95 10.1214L14.7706 7.30077C15.1657 6.9057 15.8025 6.90201 16.193 7.29254C16.5836 7.68306 16.5799 8.31991 16.1848 8.71498L13.3642 11.5356L16.1843 14.3557C16.5793 14.7507 16.583 15.3876 16.1925 15.7781C15.802 16.1686 15.1651 16.1649 14.7701 15.7699L11.95 12.9498L9.13019 15.7696C8.73512 16.1647 8.09827 16.1683 7.70775 15.7778C7.31722 15.3873 7.32091 14.7504 7.71598 14.3554L10.5358 11.5356L7.71545 8.71527C7.32038 8.3202 7.3167 7.68335 7.70722 7.29283Z"
          fill="#13141C"
        />
      </svg>
      {props.text}
    </button>
  );
};
const ButtonDefault = (props) => {
  return <button className="button-enter">{props.text}</button>;
};
export { ButtonEnter, ButtonCreateQr, ButtonDisableQr, ButtonDefault };
