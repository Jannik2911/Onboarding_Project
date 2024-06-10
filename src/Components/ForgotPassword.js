import {Link} from "react-router-dom";
import Footer from "./Footer";

const ForgotPassword = () => {
  return (
    <div className="Forgot">
      <h2>Wende dich an deinen Administrator</h2>
      <Link to="/">Zurück</Link>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
