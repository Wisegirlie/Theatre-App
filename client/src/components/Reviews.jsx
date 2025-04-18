import userIcon from '../assets/shows/icon-user-for-reviews.png'
import star from '../assets/shows/icon-star.png'
import '../css/eventsDetail.css'

const Reviews = () => {
  return (
    <>
      <div className='css-flex  css-reviews-div css-margin-bottom-30px'>
        <div>
          <img height={35} width={35} src={userIcon} />
        </div>
        <div className='css-reviews-text-div'>
          <p className='css-remove-styling css-margin-bottom-0px' style={{ color: "black", 'fontWeight': "bold", "marginTop": 0 }}>Username</p>
          <p className='css-remove-styling css-margin-top-0px' style={{ 'marginBottom': 5 }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, deleniti? Perspiciatis veniam doloremque velit officia odit unde a illum voluptatum similique eum nobis, optio voluptatibus! Beatae assumenda ea rerum hic.</p>
          <div style={{textAlign: 'left'}}>
            <img className='css-star-size' src={star}></img>
            <img className='css-star-size' src={star}></img>
            <img className='css-star-size' src={star}></img>
            <img className='css-star-size' src={star}></img>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reviews