import React, { useEffect, useState } from "react";
import axios from "axios";

function Cities() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:5000/images");
        const cityData = response.data;

        // Process the city data to extract the necessary fields
        const processedCities = cityData.map(city => ({
          name: city.city,
          propertiesCount: city.propertyNo,
          imageUrl: city.img ? `http://localhost:5000/${city.img.path}` : "https://placehold.co/373x367",
          altText: city.city,
        }));

        setCities(processedCities);
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching cities");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="find-properties">
      <div className="container my-5">
        <div className="cities-title mb-4">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="text-center">Find Properties in These Cities</h1>
              <p className="text-center text-muted">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>

        <div className="cities-images">
          <div className="row">
            {cities.slice(0, 2).map((city, index) => (
              <div className={`col-lg-${index === 0 ? 4 : 8} mb-4`} key={city.name}>
                <a href="#">
                  <div className="city-card">
                    <img src={city.imageUrl} alt={city.altText} />
                    <div className="city-card-overlay">
                      <h3>{city.name}</h3>
                      <p>{city.propertiesCount} Properties</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>

          <div className="row">
            {cities.slice(2).map((city, index) => (
              <div className={`col-lg-${index === 0 ? 8 : 4} mb-4`} key={city.name}>
                <a href="#">
                  <div className="city-card">
                    <img src={city.imageUrl} alt={city.altText} />
                    <div className="city-card-overlay">
                      <h3>{city.name}</h3>
                      <p>{city.propertiesCount} Properties</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cities;
