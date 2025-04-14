function TicketPage() {
  return (
    <>
        <div id="ticket-page">
            <h1>Buy Ticket</h1>
            <p>Here you can buy tickets for the theme park.</p>
            <form>
                <div>
                <label htmlFor="ticketType">Ticket Type:</label>
                <select id="ticketType" name="ticketType">
                    <option value="adult">Adult</option>
                    <option value="child">Child</option>
                    <option value="senior">Senior</option>
                </select>
                </div>
                <div>
                <label htmlFor="quantity">Quantity:</label>
                <input type="number" id="quantity" name="quantity" min="1" max="10" />
                </div>
                <button type="submit">Pay</button>
            </form>
        </div>
    </>
  );
}
export default TicketPage;