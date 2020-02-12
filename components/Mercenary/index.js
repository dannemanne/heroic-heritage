const style = {
  backgroundColor: "blue",
  color: "white",
  width: "100%",
  height: "100px"
};

const disabledStyle = {
  backgroundColor: "gray",
  color: "black",
  width: "100%",
  height: "100px"
};

const Mercenary = ({
  merc,
  setMerc,
  gold,
  setGold,
}) => {
  const affordable = gold >= merc.nextCost;

  const handleClick = (evt) => {
     evt.stopPropagation();

     if (affordable) {
       setGold(gold - merc.nextCost);
       setMerc(Object.assign({}, merc, {
         level: merc.level + 1,
         nextCost: merc.baseCost * 2 ** (merc.level + 1),
         goldPerClick: merc.baseGoldPerClick * 1.5 ** merc.level,
       }))
     }
  }

  return (
    <div
      className="Mercenary"
      onClick={handleClick}
      style={affordable ? style: disabledStyle}
    >
      <h2>{merc.label} - Lvl. {merc.level}</h2>
      <p>Cost to buy: {merc.nextCost}g. Gold per Click: {merc.goldPerClick}g.</p>
    </div>
  );
};

export default Mercenary;
