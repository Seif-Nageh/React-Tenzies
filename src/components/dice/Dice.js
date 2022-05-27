export default function Dice(props) {
  return (
    <div
      className={
        props.isSellected ? "dice-item dice-item-sellected" : "dice-item"
      }
      onClick={props.onClick}
    >
      {props.number}
    </div>
  );
}
