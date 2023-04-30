
import React from 'react';
import { Row, Col, Progress, Table, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faAddressCard, faLocation } from '@fortawesome/free-solid-svg-icons';

export default function DashboardFooter() {
  return (

<Row style={{color:"#12142B"}}>
<Col lg={12}>
<div className="text-center text-white" style={{backgroundColor: "#f1f1f1"}}>
  <div className="container pt-4">
    <section className="mb-4">
    <h2 className='font-bold mb-4'>Contact
</h2>
<div>
<div className="">      <a
        className="btn btn-link btn-floating btn-lg text-dark mx-2"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        >
            <FontAwesomeIcon icon={faMessage} />
        </a>
rsa@itu.edu.pk </div> <br/>
<div className=''>      <a
        className="btn btn-link btn-floating btn-lg text-dark mx-2"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        >
                        <FontAwesomeIcon icon={faAddressCard} />
        </a> 346-B, Ferozepur Road, Lahore, Punjab 54700</div><br/>
<div className=''>
<a
        className="btn btn-link btn-floating btn-lg text-dark mx-2"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        >
            <FontAwesomeIcon icon={faLocation} />
        </a> 
Enter Arfa Karim Software Technology Park (ASTP) and arrive at the 4th Floor.
</div>
      
</div>
    </section>
  </div>

  <div className="text-center text-dark p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
    © 2020 Copyright:
    <a className="text-dark" href="https://mdbootstrap.com/">Remote Sensing</a>
  </div> </div>
</Col>
</Row>
    )
}