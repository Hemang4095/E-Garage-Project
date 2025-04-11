import React from 'react'
import { FaCar, FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaTwitter, FaWrench } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import "../../assets/css/footer.css"

export const Footer = () => {
  return (
    // <footer class="bg-dark text-white text-center py-2" style={{position:"relative", bottom:"0", width:"100%"}}>
    //     <div class="">
    //       <p class="mb-1">&copy; 2025 E-Garage. All rights reserved.</p>
    //       <p class="mb-0" style={{color:"gray", fontSize:"0.8rem"}}>
    //         <Link to="#" class=" me-3" style={{color:"grey"}}>Privacy Policy</Link> |
    //         <Link to="#" class=" ms-3" style={{color:"gray"}}>Terms of Service</Link>
    //       </p>
    //     </div>
    //   </footer>

    <footer className="footer">
    <div className="footer-container">
      <div className="footer-grid">
        
        {/* Logo and About */}
        <div>
          <Link to="/" className="footer-logo">
            <FaCar className="footer-logo-icon" />
            <span>E-Garage</span>
          </Link>
          <p className="footer-text">
            Your trusted partner for all automotive repair and maintenance services. Quality service guaranteed.
          </p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook size={22} /></a>
            <a href="https://x.com/?lang=en" target="_blank" rel="noopener noreferrer"><FaTwitter size={22} /></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram size={22} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/user/garages">Book Appointment</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/contactus">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="footer-heading">Our Services</h3>
          <ul className="footer-links">
            <li><Link to="/services">Oil Change</Link></li>
            <li><Link to="/services">Brake Repair</Link></li>
            <li><Link to="/services">Engine Diagnostics</Link></li>
            <li><Link to="/services">Tire Services</Link></li>
            <li><Link to="/services">AC Repair</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="footer-heading">Contact Us</h3>
          <div className="footer-contact">
            <FaMapMarkerAlt className="footer-contact-icon" />
            <span>123 Garage Street, Auto City, AC 12345</span>
          </div>
          <div className="footer-contact">
            <FaPhone className="footer-contact-icon" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="footer-contact">
            <FaEnvelope className="footer-contact-icon" />
            <span>info@egarage.com</span>
          </div>
        </div>
        
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} E-Garage. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}
