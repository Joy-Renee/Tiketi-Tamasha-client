import React from "react";
import "../Assets/PaymentPage.css";

const PaymentPage = () => {
return (
    <div>
        <h1>Payment Page</h1>
        <form>
            <input type="text" placeholder="Phone Number" />
            <input type="text" placeholder="Amount" />
            <button type="submit" className="submit">Submit</button>
        </form>
    </div>
)
}

export default PaymentPage;