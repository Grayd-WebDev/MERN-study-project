import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import RestaurantService from "../../services/RestaurantService";
import { isEmpty } from "../../helpers/helpers";

const SingleRestaurant = () => {
  const [restaurant, setRestaurant] = useState({});
  const { state } = useLocation();
  const { id } = useParams();

  const getRestaurant = (id) => {
    RestaurantService.get(id).then((res) => {
      setRestaurant(res.data.restaurant);
    });
  };

  const deleteReview = (reviewId, index) => {
    RestaurantService.deleteReview(reviewId, state.id).then((res) => {
      setRestaurant((prevState) => {
        console.log("prevState", prevState);
        prevState.reviews.splice(index, 1);
        return {
          ...prevState,
        };
      });
    });
  };

  useEffect(() => {
    getRestaurant(id);
  }, [id]);
  
  if (isEmpty(restaurant)) return <p>Loading...</p>;

  const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;  
  return (
    <div className="restaurant">
      <div>{restaurant.name}</div>
      <div>{address}</div>
      <div>
        <Link to={`/restaurants/${id}/review`} className="btn btn-primary">
          Add review
        </Link>
        {restaurant.reviews.length === 0 ? (
          <div>No reviews</div>
        ) : (
          restaurant.reviews.map((review, index) => {
            return (
              <div>
                <p>{review.text}</p>
                {state.id === review.user_id && (
                  <div className="user-buttons">
                    <button onClick={() => deleteReview(review._id, index)}>
                      Delete
                    </button>
                    <Link
                      to={`/restaurants/${id}/review`}
                      state={{ currentReview: review }}
                    >
                      Edit
                    </Link>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SingleRestaurant;
