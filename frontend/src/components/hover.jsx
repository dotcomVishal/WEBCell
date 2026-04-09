function HoverLetters({ text }) {
  return (
    <div className="HoverLetters">
      {text.split("").map((char, i) => (
        <span key={i}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

export default HoverLetters;