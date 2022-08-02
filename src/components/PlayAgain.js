export const PlayAgain = (props) => {
  return (
    <div className="game-done">
      <div
        className="message"
        style={{ color: props.gameStatus === "lost" ? "red" : "green" }}
      >
        {props.gameStatus === "lost" ? "Game Over" : "Good Job"}
      </div>

      <button onClick={props.onClick}>Play Again</button>
    </div>
  );
};
