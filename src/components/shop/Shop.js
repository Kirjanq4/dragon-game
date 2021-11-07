import React, { useState, useEffect } from "react";

import ReactModal from "react-modal";

import "./shop.css";

const Shop = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(
      `https://dragonsofmugloar.com/api/v2/${localStorage.getItem(
        "gameId"
      )}/shop`
    )
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.log(err));
  }, []);

  console.log(props.itemPurchased.shoppingSuccess);

  return (
    <div>
      <button className="back-btn" onClick={props.back}>
        Go back
      </button>

      <div className="shop-container">
        {items.map((item) => (
          <div className="shop-item" key={item.id}>
            <div className="item-name">{item.name}</div>
            <div className="item-cost ">
              Price: <span className="gold">{item.cost}</span>
            </div>
            <button
              className="buy-btn start"
              onClick={() => {
                props.purchase(item);
              }}
            >
              Buy
            </button>
          </div>
        ))}
      </div>
      <ReactModal
        isOpen={props.showBuyModal}
        contentLabel="onRequestClose"
        onRequestClose={props.closeBuyModal}
        shouldCloseOnOverlayClick={true}
        className="Modal"
      >
        {props.itemPurchased.shoppingSuccess ? (
          <div className="success-modal">
            <h1>You successfully bought {props.itemPurchased.name}</h1>
          </div>
        ) : (
          <div className="fail-modal">
            <h1>
              You don't have enough gold to buy {props.itemPurchased.name}
            </h1>
          </div>
        )}
      </ReactModal>
    </div>
  );
};

export default Shop;
