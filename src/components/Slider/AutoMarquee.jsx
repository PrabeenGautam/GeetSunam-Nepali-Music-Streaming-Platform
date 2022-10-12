function AutoMarquee({ value, className }) {
  return (
    <div
      className="bounce"
      onMouseEnter={(e) => {
        e.target.classList.remove("innerText");
      }}
      onMouseLeave={(e) => {
        e.target.classList.add("innerText");
      }}>
      <div className={`${className} innerText`} title={value}>
        {value}
      </div>
    </div>
  );
}

export default AutoMarquee;
