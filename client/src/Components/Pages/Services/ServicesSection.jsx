import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Services.css';

function ServicesSection() {
    const [servicesData, setServicesData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/services');
                setServicesData(response.data);
            } catch (err) {
                console.error('Error fetching services:', err);
                setError('Failed to fetch services');
            }
        };

        fetchServices();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!Array.isArray(servicesData)) {
        return <div>Data is not in expected format</div>;
    }

    return (
        <>
            <div className="container services">
                <div className="row">
                    {
                        servicesData.map((service, index) => (
                            <div className="col-lg-4" key={index}>
                                <div className="service-card">
                                    <img src={service.img} alt="Service" />
                                    <p>{service.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default ServicesSection;
