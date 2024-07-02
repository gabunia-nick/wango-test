import { useEffect, useRef, useState } from 'react'

type City = {
  id: number;
  name: string;
}

type Area = {
  id: number;
  name: string;
  cityId: number;
}

function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);

  const citySelectRef = useRef<HTMLSelectElement | null>(null);
  const areaSelectRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BE_ENDPOINT}/locations/cities`, { method: 'GET', mode: 'cors' }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Error fetching cities');
      }

      return response.json();
    }).then((cities: City[]) => {
      setCities(cities);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const handleCitySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = +event.target.value;

    if (cityId) {
      fetch(`${import.meta.env.VITE_BE_ENDPOINT}/locations/cities/${cityId}/areas`, { method: 'GET', mode: 'cors' }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Error fetching cities');
        }
  
        return response.json();
      }).then((areas: Area[]) => {
        setAreas(areas);
      }).catch((error) => {
        console.error(error);
      });
    }
  };

  const handleSubmit = () => {
    // TODO: Implement submit logic
  }

  return (
    <div className="container ">
      <div className="row">
        <div className="col-lg-7 col-md-8 mx-auto">
          <div className="detail-box">
            <h1>
              Park your car <br/>
            </h1>
            <p>
              After choosing the city please choose the parking are and hit "pay with Wango" button.
            </p>
          </div>
        </div>
      </div>
      <div className="find_container ">
        <div className="container">
          <div className="row">
            <div className="col">
              <form onSubmit={handleSubmit}>
                <div className="form-row ">
                  <div className="form-group col-lg-3">
                  </div>
                  <div className="form-group col-lg-3">
                    <select ref={citySelectRef} onChange={handleCitySelect} className="form-control wide" id="inputCities">
                      <option>Choose city</option>
                      {cities.map((city) => <option value={city.id}>{city.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group col-lg-3">
                    <select ref={areaSelectRef} name="" className="form-control wide" id="inputParkingAreas">
                      <option >Choose parking area</option>
                      {areas.map((area) => <option value={area.id}>{area.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group col-lg-3">
                    <div className="btn-box">
                      <button type="submit" className="btn ">pay with Wango</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default App
