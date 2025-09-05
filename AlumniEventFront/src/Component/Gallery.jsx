import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Single array of image + title
const eventGallery = [
    ['src/assets/390734.jpg', 'Annual Meetup 2023'],
    ['src/assets/396388.jpg', 'Tech Talk Session'],
    ['src/assets/download (10).jpg', 'Cultural Fest'],
    ['src/assets/imagalumni.jpj.jpg', 'Alumni Awards Night'],
    ['src/assets/images (6).jpg', 'Sports Day Reunion'],
    ['src/assets/images (7).jpg', 'Webinar on Careers'],
  ];
  

const Gallery = () => {
  return (
    <div className="container-fluid " id="gallery">
      <h2 className="text-center  text-dark mb-4">Alumni Event Gallery</h2>
      <div className="row">
        {eventGallery.map(([image, title], index) => (
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              <img
                src={image}
                alt={title}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h6 className="text-center">{title}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
