const DataNotFound = ( { message }) => {
    return (
        <div className="event-details-main-container addEvent-main-container container">            
            <h2 className="page-main-title" style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '400' }}>{message}</h2>  
        </div>
    );
};

export default DataNotFound;