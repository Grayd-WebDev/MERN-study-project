import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { isEmpty } from "../helpers/helpers";
import RestaurantService from "../services/RestaurantService";

const AddReview = ({ user }) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reviewText, setReviewText] = useState("");

  const { id } = useParams();
  const onChangeReviewText = (e) => {
    setReviewText(e.target.value);
  };

  if (!isEmpty(state)) {
    setEditing(true);
  }

  const onSubmit = () => {
    let data = {
      text: reviewText,
      name: user.name,
      user_id: user.id,
      restaurantId: id,
    };

    RestaurantService.createOrUpdateReview(data, editing)
      .then((res) => {
        setSubmitted(true);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div>
      {!isEmpty(user) ? (
        <div className="form">
          {!submitted ? (
            <>
              <input
                type="text"
                className="form-control"
                value={reviewText}
                onChange={onChangeReviewText}
              />
              <button className="btn btn-success" onClick={onSubmit}>
                Submit
              </button>
            </>
          ) : (
            <p>Submitted successfully</p>
          )}
        </div>
      ) : (
        <p>You are not logged in </p>
      )}
    </div>
  );
};

export default AddReview;
